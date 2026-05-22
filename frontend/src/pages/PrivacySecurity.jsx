import React from 'react';

const PrivacySecurity = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h1 className="display-5 mb-4">Privacy & Security</h1>
          
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-light">
              <h3 className="h5 mb-0">Data Protection</h3>
            </div>
            <div className="card-body">
              <p>
                All student data is encrypted using AES-256 and stored securely in MongoDB. 
                We comply with Indian IT Act, 2000.
              </p>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-light">
              <h3 className="h5 mb-0">Anti-Cheating Measures</h3>
            </div>
            <div className="card-body">
              <ul>
                <li>Tab switching detection</li>
                <li>Full-screen exam mode</li>
                <li>AI-based activity monitoring (future)</li>
              </ul>
            </div>
          </div>

          <div className="alert alert-info">
            <i className="bi bi-shield-lock me-2" style={{color: 'red'}}></i>
            <strong>Note:</strong> No third-party tools are allowed during exams.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurity;