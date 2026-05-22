import React from 'react';

const ContactSupport = () => { 
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6 mx-auto text-center mb-5">
          <h1 className="display-5 mb-3">Contact Support</h1>
          <p className="lead text-muted">
            Have questions? We're here to help!
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h4 mb-4">Send us a message</h3>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email Address" required />
                </div>
                <div className="mb-3">
                  <select className="form-select">
                    <option>Select Department</option>
                    <option>Technical Support</option>
                    <option>Exam Queries</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className="btn btn-dark w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="h4 mb-4">Other Ways to Reach Us</h3>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-envelope me-2 text-primary"></i>
                  <strong>Email:</strong> amiteshkushwaha2020@gmail.com
                  <br />
                  <i className="bi bi-envelope me-2 text-primary"></i>
                  <strong>Email:</strong> himanshuvishwakarma@gmail.com
                </li>
                <li className="mb-3">
                  <i className="bi bi-telephone me-2 text-success"></i>
                  <strong>Phone:</strong> +91 6390584303
                  <br />
                  <i className="bi bi-telephone me-2 text-success"></i>
                  <strong>Phone:</strong> +91 98765 43210
                </li>
                <li className="mb-3">
                  <i className="bi bi-geo-alt me-2 text-danger"></i>
                  <strong>Address:</strong> SOCA, BBD University, Lucknow
                </li>
              </ul>
              <hr />
              <h4 className="h5 mt-4">FAQs</h4>
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      How do I reset my password?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Click "Forgot Password" on the login page and follow the instructions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;