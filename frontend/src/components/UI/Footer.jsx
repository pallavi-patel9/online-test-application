import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <> 
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-white mb-4">IBT Exams</h4>
              <p>
                A comprehensive examination platform developed at Babu Banarasi Das University, designed to meet the evolving needs of higher education institutions.
              </p>
              <div className="d-flex mt-4">
                <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="text-white mb-4">Product</h5>
              <ul className="list-unstyled footer-links">
                <li className="mb-2"><a href="#">Features</a></li>
                <li className="mb-2"><a href="#">Pricing</a></li>
                <li className="mb-2"><a href="#">Security</a></li>
                <li className="mb-2"><a href="#">Integrations</a></li>
                <li><a href="#">Updates</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="text-white mb-4">Solutions</h5>
              <ul className="list-unstyled footer-links">
                <li className="mb-2"><a href="#">Universities</a></li>
                <li className="mb-2"><a href="#">Colleges</a></li>
                <li className="mb-2"><a href="#">Professional Certifications</a></li>
                <li className="mb-2"><a href="#">Distance Learning</a></li>
                <li><a href="#">Government</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="text-white mb-4">Resources</h5>
              <ul className="list-unstyled footer-links">
                <li className="mb-2"><a href="#">Documentation</a></li>
                <li className="mb-2"><a href="#">Case Studies</a></li>
                <li className="mb-2"><a href="#">Webinars</a></li>
                <li className="mb-2"><a href="#">Blog</a></li>
                <li><a href="#">Help Center</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4">
              <h5 className="text-white mb-4">Company</h5>
              <ul className="list-unstyled footer-links">
                <li className="mb-2"><a href="#">About Us</a></li>
                <li className="mb-2"><a href="#">Careers</a></li>
                <li className="mb-2"><a href="#">Partners</a></li>
                <li className="mb-2"><a href="#">Contact</a></li>
                <li><a href="#">Legal</a></li>
              </ul>
            </div>
          </div>

          <hr className="mt-5 mb-4 bg-secondary" />

          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="mb-0">&copy; 2023 IBT Exam Platform. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none">Privacy Policy</a>
                </li>
                <li className="list-inline-item mx-2">·</li>
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none">Terms of Service</a>
                </li>
                <li className="list-inline-item mx-2">·</li>
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
