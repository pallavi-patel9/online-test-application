import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.AOS) {
            window.AOS.init({
                duration: 500,
                easing: 'ease-in-out',
                once: true
            });
        }
    }, []);

    return (
        <div className="home-page">
            {/* Study Mode Selection Section */}
            <section className="study-section">
                <div className="container text-center py-4">
                    <h1 className="mb-4">How do you want to conduct your exams?</h1>
                    <p className="lead mb-4 mx-auto" style={{ maxWidth: "600px" }}>
                        Flexible assessment modes to suit every educational need, from formative quizzes to high-stakes proctored exams.
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        {/* <a href="#" className="btn btn-primary-custom btn-lg px-5">Create</a> */}
                        <Link className="btn btn-primary-custom btn-lg px-5" to="/register">Create</Link>
                        {/* <a href="#" className="btn btn-outline-primary btn-lg px-5 m-1">I'm Teacher</a> */}
                        <Link className="btn btn-outline-primary btn-lg px-5 m-1" to="/register">I'm Teacher</Link>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="hero-gradient">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 hero-content" data-aos="fade-right">
                            <h1 className="hero-title display-4 fw-bold">Secure, Scalable <span className="highlight-text">Exam Platform</span> for Universities</h1>
                            <p className="hero-subtitle">Advanced proctoring, offline capabilities, and real-time analytics in one comprehensive solution designed for higher education.</p>
                            <div className="d-flex flex-wrap gap-3">
                                {/* <a href="#" className="btn btn-primary-custom">Request Demo</a> */}
                                <Link className="btn btn-primary-custom" to="/register">Request Demo</Link>
                                <a href="#" className="btn btn-outline-custom">How It Works <i className="bi bi-arrow-right ms-2"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-left">
                            <img src="../../public/assets/Home1.jpg" alt="IBT Dashboard" className="img-fluid rounded-3 shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="py-5 bg-light">
                <div className="container py-4">
                    <div className="container py-5 text-center ">
                        <p className=" section-title mb-4">TRUSTED BY LEADING UNIVERSITIES WORLDWIDE</p>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-6 col-md-2 text-center mb-4 mb-md-0">
                            <img src="../../public/assets/university1.png" alt="University Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
                        </div>
                        <div className="col-6 col-md-2 text-center mb-4 mb-md-0">
                            <img src="../../public/assets/university2.png" alt="University Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
                        </div>
                        <div className="col-6 col-md-2 text-center mb-4 mb-md-0">
                            <img src="../../public/assets/university3.png" alt="University Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
                        </div>
                        <div className="col-6 col-md-2 text-center mb-4 mb-md-0">
                            <img src="../../public/assets/university4.png" alt="University Logo" className="img-fluid" style={{ maxHeight: '150px' }} />
                        </div>
                        <div className="col-6 col-md-2 text-center">
                            <img src="../../public/assets/university5.png" alt="University Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-5">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Advanced Examination Features</h2>
                        <p className="section-subtitle">Everything you need for secure, reliable online assessments</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                                <h4>AI Proctoring</h4>
                                <p className="text-muted">Advanced monitoring detects suspicious behavior, tab switching, and unauthorized resources during exams.</p>
                                <a href="#" className="text-primary text-decoration-none fw-semibold">Learn more <i className="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="bi bi-wifi-off"></i>
                                </div>
                                <h4>Offline Mode</h4>
                                <p className="text-muted">Students can continue exams during internet outages with automatic sync when connection is restored.</p>
                                <a href="#" className="text-primary text-decoration-none fw-semibold">Learn more <i className="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="bi bi-speedometer2"></i>
                                </div>
                                <h4>Instant Analytics</h4>
                                <p className="text-muted">Get detailed performance reports immediately after exam completion with actionable insights.</p>
                                <a href="#" className="text-primary text-decoration-none fw-semibold">Learn more <i className="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="bi bi-card-checklist"></i>
                                </div>
                                <h4>Diverse Question Types</h4>
                                <p className="text-muted">Support for MCQs, essays, coding challenges, drag-and-drop, and multimedia questions.</p>
                                <a href="#" className="text-primary text-decoration-none fw-semibold">Learn more <i className="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="bi bi-graph-up-arrow"></i>
                                </div>
                                <h4>Adaptive Testing</h4>
                                <p className="text-muted">Dynamic difficulty adjustment based on student performance for precise assessment.</p>
                                <a href="#" className="text-primary text-decoration-none fw-semibold">Learn more <i className="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="bi bi-database"></i>
                                </div>
                                <h4>Centralized Management</h4>
                                <p className="text-muted">Single platform for all exam data, student records, and institutional reporting.</p>
                                <a href="#" className="text-primary text-decoration-none fw-semibold">Learn more <i className="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-5 bg-light">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
                            <img src="../../public/assets/workflow.jpg" alt="IBT Dashboard" className="img-fluid img-fluid-rounded" />
                        </div>
                        <div className="col-lg-6" data-aos="fade-left">
                            <h2 className="section-title">Streamlined Exam <span className="highlight-text">Workflow</span></h2>
                            <p className="text-muted mb-4">Our platform simplifies the entire examination process from creation to evaluation.</p>

                            <div className="process-step">
                                <div className="step-number">1</div>
                                <div>
                                    <h4>Setup & Configuration</h4>
                                    <p className="text-muted">Administrators create exams with flexible parameters, question banks, and security settings tailored to each course.</p>
                                </div>
                            </div>

                            <div className="process-step">
                                <div className="step-number">2</div>
                                <div>
                                    <h4>Secure Exam Delivery</h4>
                                    <p className="text-muted">Students access exams through authenticated portals with proctoring features ensuring exam integrity.</p>
                                </div>
                            </div>

                            <div className="process-step">
                                <div className="step-number">3</div>
                                <div>
                                    <h4>Automated Evaluation</h4>
                                    <p className="text-muted">Instant grading for objective questions with tools for efficient manual grading of subjective responses.</p>
                                </div>
                            </div>

                            <div className="process-step">
                                <div className="step-number">4</div>
                                <div>
                                    <h4>Comprehensive Analytics</h4>
                                    <p className="text-muted">Detailed performance reports at individual, class, and institutional levels with actionable insights.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Features Section */}
            <section className="py-5">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-2 mb-5 mb-lg-0" data-aos="fade-left">
                            <img src="../../public/assets/security.jpg" alt="Security Features" className="img-fluid img-fluid-rounded" />
                        </div>
                        <div className="col-lg-6 order-lg-1" data-aos="fade-right">
                            <h2 className="section-title">Enterprise-Grade <span className="highlight-text">Security</span></h2>
                            <p className="text-muted mb-4">Built with the highest security standards to protect your institutional data and exam integrity.</p>

                            <div className="d-flex mb-4">
                                <div className="me-4">
                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                                        <i className="bi bi-shield-check"></i>
                                    </div>
                                </div>
                                <div>
                                    <h4>End-to-End Encryption</h4>
                                    <p className="text-muted">All data is encrypted in transit and at rest using industry-standard protocols.</p>
                                </div>
                            </div>

                            <div className="d-flex mb-4">
                                <div className="me-4">
                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                                        <i className="bi bi-person-x"></i>
                                    </div>
                                </div>
                                <div>
                                    <h4>Identity Verification</h4>
                                    <p className="text-muted">Multi-factor authentication and facial recognition ensure test-taker identity.</p>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="me-4">
                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                                        <i className="bi bi-activity"></i>
                                    </div>
                                </div>
                                <div>
                                    <h4>Behavioral Analytics</h4>
                                    <p className="text-muted">AI monitors for suspicious patterns and flags potential academic dishonesty.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-5 bg-light">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Trusted by <span className="highlight-text">Leading Institutions</span></h2>
                        <p className="section-subtitle">What our partners say about IBT Exam Platform</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="testimonial-card">
                                <div className="d-flex align-items-center mb-4">
                                    <img src="assets/user1.jpg" alt="Dr. Sharma" className="testimonial-img me-3" />
                                    <div>
                                        <h5 className="mb-0">Dr. Rajesh Sharma</h5>
                                        <small className="text-muted">Dean, School of Computer Science</small>
                                    </div>
                                </div>
                                <div className="mb-3 text-warning">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p className="text-muted">"The adaptive testing capabilities have revolutionized how we assess students, providing much more accurate measurements of their true capabilities compared to traditional exams."</p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="testimonial-card">
                                <div className="d-flex align-items-center mb-4">
                                    <img src="assets/user2.jpg" alt="Priya Singh" className="testimonial-img me-3" />
                                    <div>
                                        <h5 className="mb-0">Priya Singh</h5>
                                        <small className="text-muted">Examination Controller</small>
                                    </div>
                                </div>
                                <div className="mb-3 text-warning">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p className="text-muted">"The centralized system has reduced our administrative workload by 40% while completely eliminating the data redundancy issues we faced with our previous solution."</p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="testimonial-card">
                                <div className="d-flex align-items-center mb-4">
                                    <img src="assets/user3.jpg" alt="Admin Team" className="testimonial-img me-3" />
                                    <div>
                                        <h5 className="mb-0">Michael Johnson</h5>
                                        <small className="text-muted">Director of Online Learning</small>
                                    </div>
                                </div>
                                <div className="mb-3 text-warning">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-half"></i>
                                </div>
                                <p className="text-muted">"The offline exam capability was a game-changer for our distance learning programs in areas with unreliable internet connectivity. Students no longer fear connectivity issues during critical exams."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Study Modes Section */}
            <section className="py-5">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="section-title">Flexible <span className="highlight-text">Assessment Modes</span></h2>
                        <p className="section-subtitle">Supporting diverse pedagogical approaches</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="feature-card">
                                <div className="feature-icon bg-primary">
                                    <i className="bi bi-cpu"></i>
                                </div>
                                <h4>Adaptive Testing</h4>
                                <p className="text-muted">Dynamic difficulty adjustment provides personalized assessment paths for each student based on their performance.</p>
                                <ul className="text-muted ps-3">
                                    <li className="mb-2">Personalized question selection</li>
                                    <li className="mb-2">Precise competency measurement</li>
                                    <li>Reduced test anxiety</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="feature-card">
                                <div className="feature-icon bg-success">
                                    <i className="bi bi-card-text"></i>
                                </div>
                                <h4>Formative Assessments</h4>
                                <p className="text-muted">Low-stakes quizzes with instant feedback help students identify knowledge gaps throughout the course.</p>
                                <ul className="text-muted ps-3">
                                    <li className="mb-2">Flashcard integration</li>
                                    <li className="mb-2">Practice test banks</li>
                                    <li>Self-paced learning</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="feature-card">
                                <div className="feature-icon bg-danger">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                                <h4>Secure Summative Exams</h4>
                                <p className="text-muted">High-stakes testing with comprehensive proctoring features to maintain academic integrity.</p>
                                <ul className="text-muted ps-3">
                                    <li className="mb-2">AI proctoring</li>
                                    <li className="mb-2">Browser lockdown</li>
                                    <li>Plagiarism detection</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center cta-content" data-aos="zoom-in">
                            <h2 className="fw-bold mb-4 display-5">Ready to transform your examination process?</h2>
                            <p className="lead mb-5">Join over 120 institutions using IBT Exam Platform to deliver secure, scalable assessments.</p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <a href="#" className="btn btn-primary-custom btn-lg px-5 py-3">Schedule a Demo</a>
                                <a href="#" className="btn btn-outline-light btn-lg px-5 py-3">Contact Sales</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;