import React from "react";
import Navbar from "./Navbar";
import "../styles/LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <span className="hero-tag">
                🚀 Welcome To LMS Portal
              </span>

              <h1 className="hero-title">
                Learn Skills That Build Your
                <span> Future Career</span>
              </h1>

              <p className="hero-text">
                Learn from industry experts with practical courses,
                real-world projects, quizzes and certificates.
                Start your learning journey today.
              </p>

              <div className="hero-buttons">

                <button className="btn btn-primary btn-lg">
                  Explore Courses
                </button>

                <button className="btn btn-outline-light btn-lg">
                  Watch Demo
                </button>

              </div>

              <div className="hero-rating">

                <div>
                  <h3>15K+</h3>
                  <p>Students</p>
                </div>

                <div>
                  <h3>350+</h3>
                  <p>Courses</p>
                </div>

                <div>
                  <h3>120+</h3>
                  <p>Mentors</p>
                </div>

              </div>

            </div>

            <div className="col-lg-6 text-center">

              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                className="img-fluid hero-image"
                alt="hero"
              />

            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="features section-space">

        <div className="container">

          <div className="text-center mb-5">
            <h2>Why Students Choose Us</h2>
            <p>
              Learn with confidence using our modern learning platform.
            </p>
          </div>

          <div className="row">

            <div className="col-md-4">

              <div className="feature-card">

                <h3>📚 Expert Courses</h3>

                <p>
                  Learn from experienced mentors with structured content.
                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="feature-card">

                <h3>🎓 Certification</h3>

                <p>
                  Earn certificates after completing every course.
                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="feature-card">

                <h3>💼 Career Support</h3>

                <p>
                  Resume building, interview preparation and placement support.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= COURSES ================= */}

      <section className="courses section-space">

        <div className="container">

          <div className="text-center mb-5">

            <h2>Popular Courses</h2>

            <p>Choose the right course to achieve your career goals.</p>

          </div>

          <div className="row">

            {[
              "MERN Stack",
              "React.js",
              "Node.js",
              "TypeScript",
              "Python",
              "Data Structures",
            ].map((course, index) => (

              <div className="col-lg-4 col-md-6 mb-4" key={index}>

                <div className="course-card">

                  <img
                    src="https://picsum.photos/400/250"
                    alt={course}
                    className="img-fluid"
                  />

                  <div className="p-4">

                    <h4>{course}</h4>

                    <p>
                      Learn {course} from beginner to advanced with projects.
                    </p>

                    <button className="btn btn-primary">
                      Enroll Now
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="stats">

        <div className="container">

          <div className="row text-center">

            <div className="col-md-3">
              <h2>15K+</h2>
              <p>Students</p>
            </div>

            <div className="col-md-3">
              <h2>350+</h2>
              <p>Courses</p>
            </div>

            <div className="col-md-3">
              <h2>120+</h2>
              <p>Mentors</p>
            </div>

            <div className="col-md-3">
              <h2>98%</h2>
              <p>Success Rate</p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= WHY US ================= */}

      <section className="section-space">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                className="img-fluid rounded"
                alt=""
              />

            </div>

            <div className="col-lg-6">

              <h2>Why Choose Our LMS?</h2>

              <p>
                Our LMS provides interactive learning, assignments,
                quizzes, certificates and instructor guidance to help
                students become job ready.
              </p>

              <ul>

                <li>✔ Live Projects</li>
                <li>✔ Lifetime Access</li>
                <li>✔ Placement Assistance</li>
                <li>✔ Responsive Learning Dashboard</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="cta">

        <div className="container text-center">

          <h2>Ready To Start Learning?</h2>

          <p>
            Join thousands of students already learning on LMS Portal.
          </p>

          <button className="btn btn-warning btn-lg">
            Get Started
          </button>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="container">

          <div className="row">

            <div className="col-lg-4">

              <h3>LMS Portal</h3>

              <p>
                Modern online learning platform for students,
                professionals and educators.
              </p>

            </div>

            <div className="col-lg-4">

              <h5>Quick Links</h5>

              <ul>

                <li>Home</li>
                <li>Courses</li>
                <li>About</li>
                <li>Contact</li>

              </ul>

            </div>

            <div className="col-lg-4">

              <h5>Contact</h5>

              <p>Email : support@lms.com</p>

              <p>Phone : +91 9876543210</p>

            </div>

          </div>

          <hr />

          <p className="text-center">
            © 2026 LMS Portal. All Rights Reserved.
          </p>

        </div>

      </footer>

    </>
  );
};

export default LandingPage;