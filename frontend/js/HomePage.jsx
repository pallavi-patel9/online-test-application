// File: src/pages/HomePage.jsx
import React from 'react';
import './HomePage.css';
// import Carousel from '../components/Carousel'

const HomePage = () => {
  return (
    <div className="home-container">
     
      
      <nav className="navbar">
        <div className="logo">IBT System</div>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#roles">Roles</a></li>
          <li><a href="#stats">Stats</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">SignUp</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <h1>Revolutionize Online Testing</h1>
          <p>Our Internet-Based Testing platform is secure, scalable, and smart. Perfect for schools, universities, and recruiters.</p>
          <div className="cta-buttons">
            <button className="primary">Get Started</button>
            <button className="secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="../../public/hero-illustration.jpg" alt="Hero Illustration" />
        </div>
      </section>

      <section id="features" className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="card-feature">
            <div className="feature-icon">
              <img src="../../public/secure-icon.jpg" alt="Secure Exams" />
            </div>
            <h3>Secure Exams</h3>
            <p>End-to-end encryption, identity checks, and AI-based proctoring ensure full test integrity.</p>
          </div>

          <div className="card-feature">
            <div className="feature-icon">
              <img src="../../public/offline-icon.jpg" alt="Offline Support" />
            </div>
            <h3>Offline Support</h3>
            <p>Allow students to take exams without internet; data syncs automatically when reconnected.</p>
          </div>

          <div className="card-feature">
            <div className="feature-icon">
              <img src="../../public/analytics-icon.jpg" alt="Detailed Analytics" />
            </div>
            <h3>Detailed Analytics</h3>
            <p>Get real-time insights into test progress, student performance, and system metrics.</p>
          </div>

          <div className="card-feature">
            <div className="feature-icon">
              <img src="../../public/interactive-icon.jpg" alt="Interactive Questions" />
            </div>
            <h3>Interactive Questions</h3>
            <p>Supports MCQs, coding editors, drag-and-drop, and diagram-based assessments.</p>
          </div>

          <div className="card-feature">
            <div className="feature-icon">
              <img src="../../public/realtime-icon.jpg" alt="Real-Time Monitoring" />
            </div>
            <h3>Real-Time Monitoring</h3>
            <p>Live invigilation, test monitoring, and instant updates through WebSocket technology.</p>
          </div>

          <div className="card-feature">
            <div className="feature-icon">
              <img src="../../public/rolebased-icon.jpg" alt="Role-Based Panels" />
            </div>
            <h3>Role-Based Panels</h3>
            <p>Separate dashboards for students, teachers, and admins for streamlined control.</p>
          </div>
        </div>
      </section>

      {/* <section id="roles" className="roles">
         <Carousel/>
      </section> */}

      <section id="stats" className="stats">
        <h2>Platform Stats</h2>
        <div className="stat-cards">
          <div className="card-stats">
            <h3>50K+</h3>
            <p>Tests Conducted</p>
          </div>
          <div className="card-stats">
            <h3>10K+</h3>
            <p>Active Users</p>
          </div>
          <div className="card-stats">
            <h3>99.9%</h3>
            <p>Uptime Guarantee</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
  <h2>Read Our Testimonials</h2>
  <div className="testimonial-scroller">
    <div className="testimonial-card">
      <blockquote>
        <div className="testi-img">
          <img src="../../public/Student.jpg" alt="" />
        </div>
        <div className="Testi-desc">
        "This platform transformed how we conduct online assessments."
        <footer>– Dr. Sharma, University Dean</footer>
        </div>
      </blockquote>
    </div>
    <div className="testimonial-card">
    <blockquote>
        <div className="testi-img">
          <img src="../../public/Student.jpg" alt="" />
        </div>
        <div className="Testi-desc">
        "This platform transformed how we conduct online assessments."
        <footer>– Dr. Sharma, University Dean</footer>
        </div>
      </blockquote>
    </div>
    <div className="testimonial-card">
    <blockquote>
        <div className="testi-img">
          <img src="../../public/Student.jpg" alt="" />
        </div>
        <div className="Testi-desc">
        "This platform transformed how we conduct online assessments."
        <footer>– Dr. Sharma, University Dean</footer>
        </div>
      </blockquote>
    </div>
    <div className="testimonial-card">
    <blockquote>
        <div className="testi-img">
          <img src="../../public/Student.jpg" alt="" />
        </div>
        <div className="Testi-desc">
        "This platform transformed how we conduct online assessments."
        <footer>– Dr. Sharma, University Dean</footer>
        </div>
      </blockquote>
    </div>
  </div>
</section>


      <section className="video-demo">
        <h2>Watch a Demo</h2>
        <video width="100%" height="600" controls>
          <source src="../../public/video-demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* <section className="tech-stack">
        <h2>Tech Stack</h2>
        <div className="tech-icons">
          <span>MongoDB</span>
          <span>Express.js</span>
          <span>React</span>
          <span>Node.js</span>
          <span>Socket.io</span>
        </div>
      </section> */}
      <section className="tech-section">
      <h2 className="tech-heading">🧩 Tech Stack Showcase</h2>
      <p className="tech-subtitle">Powering our Internet-Based Testing System</p>

      <div className="tech-icons">
        <div className="tech-icon">
          <img src="../../public/react.png" alt="React" />
          <span>React</span>
        </div>
        <div className="tech-icon">
          <img src="../../public/node.jpeg" alt="Node.js" />
          <span>Node.js</span>
        </div>
        <div className="tech-icon express">
          <img src="../../public/express.png" alt="Express" />
          <span>Express</span>
        </div>
        <div className="tech-icon">
          <img src="../../public/mongodb.png" alt="MongoDB" />
          <span>MongoDB</span>
        </div>
        <div className="tech-icon">
          <img src="../../public/socket.png" alt="MongoDB" />
          <span>Socket.io</span>
        </div>
        {/* Add more techs if needed */}
      </div>

      <div className="tech-description">
        <p>
          This robust Internet-Based Testing System is built using the powerful MERN stack.
          It offers real-time updates with WebSockets, scalable backend architecture with Node
          and Express, and a responsive frontend built using React and Vite. MongoDB ensures
          efficient data handling for thousands of concurrent exam sessions.
        </p>
      </div>
    </section>

      {/* <section className="faq">
        <h2>FAQs</h2>
        <details>
          <summary>Can exams be conducted without internet?</summary>
          <p>Yes, the system supports offline test-taking with auto-sync when online.</p>
        </details>
        <details>
          <summary>How secure is the exam process?</summary>
          <p>We use end-to-end encryption and various cheat prevention tools.</p>
        </details>
      </section> */}

<section className="faq">
  <h2>📘 FAQs</h2>
  <details>
    <summary>Can exams be conducted without internet?</summary>
    <p>Yes, the system supports offline test-taking with auto-sync when online.</p>
  </details>
  <details>
    <summary>How secure is the exam process?</summary>
    <p>We use end-to-end encryption and various cheat prevention tools.</p>
  </details>
  <details>
    <summary>Is mobile test-taking allowed?</summary>
    <p>Yes, the platform is responsive and works on smartphones and tablets.</p>
  </details>
  <details>
    <summary>Can teachers monitor live exams?</summary>
    <p>Yes, real-time monitoring and alerts are available through the admin panel.</p>
  </details>
  <details>
    <summary>How can students view their performance?</summary>
    <p>Students get instant results and can access past performance analytics.</p>
  </details>
</section>



      {/* <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section> */}
      <section className="contact" id="contact">
  <h2>📩 Contact Us</h2>
  <p>Have questions or need support? We'd love to hear from you!</p>
  
  <form className="contact-form">
    <div className="input-group">
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
    </div>
    <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
    <button type="submit">Send Message</button>
  </form>
</section>


      <footer className="footer">
        <div className="security-badge">🔒 ISO 27001 Certified | GDPR Compliant</div>
        <p>&copy; 2025 IBT System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
