import React, { useState, useEffect, useRef } from 'react';
import ExamResult from './ExamResult';
import examService from "../../services/examService";
import { getMe } from '../../services/authService';
import { toast } from 'react-toastify';
import snapshotService from '../../services/snapshotService'; // Adjust the import path as necessary

const ExamPlayer = ({ exam, onReturnToExams }) => {
  const totalQuestions = exam.questions.length;
  const totalTime = exam.totalTime * 60;
  const examContainerRef = useRef(null);
  const videoRef = useRef(null);
  const captureIntervalRef = useRef(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState(Array(totalQuestions).fill(null));
  const [score, setScore] = useState(0);
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [attempts, setAttempts] = useState(Array(totalQuestions).fill(false));
  const [showResults, setShowResults] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [isNormalExit, setIsNormalExit] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  const currentQuestion = exam.questions[currentQuestionIndex];
  const hasAttempted = attempts[currentQuestionIndex];

  const enterFullscreen = () => {
    const element = examContainerRef.current;
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  // Function to start the camera and begin capturing screenshots
  const startCamera = async () => {
    try {
      // Request access to the user's webcam and microphone
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      // Assign the video stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Start capturing screenshots every 3 seconds
      captureIntervalRef.current = setInterval(() => {
        captureScreenshot(exam._id); // Capture and upload a screenshot
      }, 3000);
    } catch (err) {
      // Handle errors if webcam or microphone access is denied
      console.error("Webcam/Mic access error:", err);
      setCameraError(true); // Set camera error state
      handleExamTermination('Camera access denied'); // Terminate the exam
    }
  };


  // Function to stop the camera and clear the screenshot interval
  const stopCamera = () => {
    // Stop all media tracks from the video stream
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    // Clear the interval for capturing screenshots
    clearInterval(captureIntervalRef.current);
  };

  // Function to capture a screenshot from the video feed and upload it
  const captureScreenshot = async (examId) => {
    const canvas = document.createElement("canvas"); // Create a canvas element
    const video = videoRef.current; // Reference to the video element
    if (!video) return; // Exit if the video element is not available

    // Set the canvas dimensions to match the video feed
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    canvas.getContext("2d").drawImage(video, 0, 0);

    // Convert the canvas content to a Base64-encoded image
    const imageBase64 = canvas.toDataURL("image/jpeg");

    try {
      // Upload the captured screenshot to the server
      await snapshotService.uploadSnapshot(examId, imageBase64);
    } catch (err) {
      // Handle errors during the screenshot upload
      console.error("Error saving screenshot:", err);
    }
  };

  const handleStartExam = () => {
    setShowInstructions(false);
    enterFullscreen();
    startCamera();
  };

  const handleFullscreenChange = () => {
    const isFullscreenNow = document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
    setIsFullscreen(!!isFullscreenNow);
 
    if (!isFullscreenNow && !examCompleted && !isNormalExit) {
      setExamCompleted(true);
      setIsNormalExit(true);
      handleExamCompletion(savedAnswers, attempts, 0, 'failed', 'Fullscreen mode exited');
    }
  };

  const handleVisibilityChange = () => {
    const isVisible = !document.hidden;
    setIsTabActive(isVisible);

    if (!isVisible && !examCompleted && !isNormalExit) {
      setExamCompleted(true);
      setIsNormalExit(true);
      handleExamCompletion(savedAnswers, attempts, 0, 'failed', 'Tab switched');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const fullscreenExitKeys = [27, 122];
      const blockedKeys = [9, 91, 17, 18, 87, 82, 116];

      if (fullscreenExitKeys.includes(e.keyCode)) {
        e.preventDefault();
        e.stopPropagation();
        setExamCompleted(true);
        setIsNormalExit(true);
        handleExamCompletion(savedAnswers, attempts, 0, 'failed', 'Attempted to exit fullscreen using keyboard');
      }
      else if (blockedKeys.includes(e.keyCode)) {
        e.preventDefault();
        setExamCompleted(true);
        setIsNormalExit(true);
        handleExamCompletion(savedAnswers, attempts, 0, 'failed', 'Keyboard shortcut detected');
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [examCompleted]);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setExamCompleted(true);
      setIsNormalExit(true);
      handleExamCompletion(savedAnswers, attempts, 0, 'failed', 'Right-click detected');
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    enterFullscreen();

    const timeoutId = setTimeout(() => {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }, 1000);

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !examCompleted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !examCompleted) {
      handleExamCompletion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, examCompleted]);

  useEffect(() => {
    setSelectedAnswer(savedAnswers[currentQuestionIndex]);
  }, [currentQuestionIndex, savedAnswers]);

  const handleAnswerSelect = (choice) => {
    setSelectedAnswer(choice);
  };

  const handleSaveAndNext = () => {
    const newSavedAnswers = [...savedAnswers];
    const newAttempts = [...attempts];
    let newScore = score;

    newSavedAnswers[currentQuestionIndex] = selectedAnswer;

    if (!hasAttempted && selectedAnswer !== null) {
      newAttempts[currentQuestionIndex] = true;
      if (selectedAnswer === currentQuestion.correct) {
        newScore += 1;
      }
    }

    setSavedAnswers(newSavedAnswers);
    setAttempts(newAttempts);
    setScore(newScore);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsNormalExit(true);
      handleExamCompletion(newSavedAnswers, newAttempts, newScore, 'completed', null);
    }
  };

  const handleExamTermination = (reason) => {
    const newSavedAnswers = [...savedAnswers];
    const newAttempts = [...attempts];

    if (newSavedAnswers[currentQuestionIndex] === null) {
      newSavedAnswers[currentQuestionIndex] = selectedAnswer;
    }

    if (!attempts[currentQuestionIndex] && selectedAnswer !== null) {
      newAttempts[currentQuestionIndex] = true;
    }

    setExamCompleted(true);
    setIsNormalExit(true);
    handleExamCompletion(newSavedAnswers, newAttempts, 0, 'failed', reason);
  };

  const handleExamCompletion = async (
    finalAnswers = savedAnswers,
    finalAttempts = attempts,
    finalScore = score,
    status = 'completed',
    terminationReason = null
  ) => {
    setExamCompleted(true);
    setIsNormalExit(true);
    setIsSaving(true);
    stopCamera(); // Stop the camera when the exam is completed

    try {
      const loggedInUser = await getMe();

      if (loggedInUser.role !== 'student') {
        setIsSaving(false);
        return;
      }

      const resultData = {
        examId: exam._id,
        score: finalScore,
        totalQuestions,
        answers: finalAnswers,
        attempts: finalAttempts,
        timeSpent: totalTime - timeLeft,
        status: terminationReason ? 'failed' : 'completed',
        totalTime,
        terminationReason: terminationReason || 'Exam completed normally',
        isNormalCompletion: !terminationReason,
      };

      await examService.saveExamResult(resultData);
      setExamResult({ ...resultData, exam });

      if (terminationReason) {
        toast.error(`Exam terminated: ${terminationReason}`);
      } else {
        toast.success('Exam completed successfully!');
      }
    } catch (error) {
      console.error('Error saving exam results:', error);
      toast.error('Failed to save exam results. Please try again.');
    } finally {
      setIsSaving(false);
      setShowResults(true);
    }
  };

  const handleExitExam = () => {
    exitFullscreen();
    onReturnToExams();
  };

  const handleExamQuit = () => {
    if (window.confirm('Are you sure you want to quit the exam? Your progress will NOT be saved.')) {
      setIsNormalExit(true);
      setExamCompleted(true);
      exitFullscreen();
      onReturnToExams();
    }
  };

  const handleRestartExam = () => {
    if (window.confirm('Are you sure you want to restart the exam? This will erase your current progress.')) {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setSavedAnswers(Array(totalQuestions).fill(null));
      setScore(0);
      setExamCompleted(false);
      setTimeLeft(totalTime);
      setAttempts(Array(totalQuestions).fill(false));
      setShowResults(false);
      setExamResult(null);
      enterFullscreen();
    }
  };

  const handleShowInstructionsFullscreen = () => {
    enterFullscreen();
  };

  const handleExitInstructions = () => {
    exitFullscreen();
    onReturnToExams();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCameraError = (error) => {
    setCameraError(true);
    handleExamTermination('Camera access denied');
  };

  useEffect(() => {
    if (!examCompleted && !cameraError) {
      enterFullscreen();
    }
  }, [examCompleted, cameraError]);

  useEffect(() => {
    return () => {
      stopCamera(); // Stop the camera when the component unmounts
    };
  }, []);

  if (showResults && examResult) {
    return (
      <div className="card exam-player-container fullscreen" ref={examContainerRef}>
        <div className={`card-header ${examResult.status === 'failed' ? 'bg-danger' : 'bg-primary'} text-white`}>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h4 mb-0">Exam Results: {exam.name}</h2>
          </div>
        </div>
        <div className="card-body">
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-md-8">
                {isSaving ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Saving your results...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    {examResult.status === 'failed' && (
                      <div className="alert alert-danger mb-4">
                        <h4 className="alert-heading">Exam Terminated</h4>
                        <p className="mb-0">
                          {examResult.terminationReason === 'Tab switched' &&
                            'Your exam was terminated because you switched to another tab or window.'}
                          {examResult.terminationReason === 'Fullscreen mode exited' &&
                            'Your exam was terminated because you exited fullscreen mode.'}
                          {examResult.terminationReason === 'Right-click detected' &&
                            'Your exam was terminated because you attempted to use right-click.'}
                          {examResult.terminationReason === 'Keyboard shortcut detected' &&
                            'Your exam was terminated because you attempted to use restricted keyboard shortcuts.'}
                          {!['Tab switched', 'Fullscreen mode exited', 'Right-click detected', 'Keyboard shortcut detected']
                            .includes(examResult.terminationReason) && examResult.terminationReason}
                        </p>
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="display-4 mb-3">
                        {examResult.score} / {examResult.totalQuestions}
                      </h3>
                      <h4 className={`${examResult.status === 'failed' ? 'text-danger' : 'text-muted'}`}>
                        Score: {Math.round((examResult.score / examResult.totalQuestions) * 100)}%
                      </h4>
                    </div>

                    <div className="row mb-4">
                      <div className="col-md-3">
                        <div className="card bg-light">
                          <div className="card-body">
                            <h5>Time Spent</h5>
                            <p className="mb-0">{formatTime(examResult.timeSpent)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card bg-light">
                          <div className="card-body">
                            <h5>Questions</h5>
                            <p className="mb-0">{examResult.totalQuestions}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card bg-light">
                          <div className="card-body">
                            <h5>Attempted</h5>
                            <p className="mb-0">
                              {examResult.attempts.filter(attempt => attempt).length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card bg-light">
                          <div className="card-body">
                            <h5>Status</h5>
                            <p className={`mb-0 ${examResult.status === 'failed' ? 'text-danger' : 'text-success'}`}>
                              {examResult.status.charAt(0).toUpperCase() + examResult.status.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                      <button
                        className={`btn ${examResult.status === 'failed' ? 'btn-danger' : 'btn-primary'} btn-lg`}
                        onClick={handleExitExam}
                      >
                        Exit Exam
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showInstructions) {
    return (
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center"
        ref={examContainerRef}
        style={{ height: '100vh', backgroundColor: '#f8f9fa' }}
      >
        <div className="card w-75">
          <div className="card-header bg-primary text-white">
            <h2>Exam Instructions</h2>
          </div>
          <div className="card-body">
            <ul>
              <li>Do not switch tabs or exit fullscreen mode during the exam, otherwise you will marked as fail.</li>
              <li>Ensure you have a stable internet connection.</li>
              <li>Answer all questions to the best of your ability.</li>
              <li>Once the exam starts, the timer will not stop.</li>
              <li>Total questions: {totalQuestions}</li>
              <li>Total time: {totalTime/60}</li>
              <li>Click "Start Exam" to begin.</li>
            </ul>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-secondary" onClick={handleExitInstructions}>
                Back
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  handleShowInstructionsFullscreen();
                  handleStartExam();
                }}
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div> 
    );
  }

  return (
    <div className="card exam-player-container" ref={examContainerRef} style={{border: '0px solid black'}}>
      <div className="card-header" style={{ backgroundColor: '', padding: '1rem' }}>
        <div className="d-flex justify-content-between align-items-center">
          <h1 style={{ fontSize: '1.25rem', margin: 0, textAlign: 'center' }}>
            Don't try to Switch Tab or Exit Fullscreen, Otherwise your Exam will be terminated and you will be marked as Failed!
          </h1>
          {!examCompleted && (
            <div className="camera-container" style={{ maxWidth: '320px' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '320px', height: '240px' }}
              />
            </div>
          )}
        </div>
      </div>

      <br /><br />

      <div className="card-header bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">{exam.name}</h2>
          <div className="d-flex align-items-center gap-3">
            <div className="timer-circle">
              <span className="h5 mb-0">Time Remaining: {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {!examCompleted ? (
          <div>
            <div className="d-flex justify-content-between mb-3">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>Score: {score}</span>
            </div>

            <h4 className="mb-4">{currentQuestion.question}</h4>

            <div className="list-group mb-4">
              {currentQuestion.choices.map((choice, index) => (
                <button
                  key={index}
                  className={`list-group-item list-group-item-action ${selectedAnswer === choice ? 'active' : ''}`}
                  onClick={() => handleAnswerSelect(choice)}
                >
                  {String.fromCharCode(65 + index)}. {choice}
                </button>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-danger" onClick={handleExamQuit}>
                Quit Exam
              </button>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() => {
                    if (currentQuestionIndex < totalQuestions - 1) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                    }
                  }}
                  disabled={currentQuestionIndex === totalQuestions - 1}
                >
                  Skip
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleSaveAndNext}
                  disabled={selectedAnswer === null}
                >
                  Save & Next
                </button>

                {currentQuestionIndex === totalQuestions - 1 && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setExamCompleted(true);
                      setIsNormalExit(true);
                      handleExamCompletion(savedAnswers, attempts, score, 'completed', null);
                    }}
                    disabled={selectedAnswer === null}
                  >
                    Finish Exam
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="mb-4">Exam Completed!</h3>
            {isSaving ? (
              <>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Saving your results...</p>
              </>
            ) : (
              <>
                <p className="h5 mb-4">
                  Your score: {score} out of {totalQuestions} (
                  {Math.round((score / totalQuestions) * 100)}%)
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-secondary"
                    onClick={onReturnToExams}
                  >
                    Back to Exams
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPlayer;