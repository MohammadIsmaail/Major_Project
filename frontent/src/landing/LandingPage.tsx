import React from "react";
import Navbar from "./Navbar";
import "../styles/LandingPage.css";

const courses = [
  { name: "MERN Stack", tag: "Full Stack", weeks: 12 },
  { name: "React.js", tag: "Frontend", weeks: 6 },
  { name: "Node.js", tag: "Backend", weeks: 6 },
  { name: "TypeScript", tag: "Language", weeks: 4 },
  { name: "Python", tag: "Language", weeks: 8 },
  { name: "Data Structures", tag: "Fundamentals", weeks: 10 },
];

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="hero-tag">Cohort enrolling now</span>

            <h1 className="hero-title">
              Learn skills that build your
              <span> future career</span>
            </h1>

            <p className="hero-text">
              Practical courses, real-world projects, quizzes and
              certificates — taught by people who ship code for a living.
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary">Explore Courses</button>
              <button className="btn btn-ghost">Watch Demo</button>
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

          <div className="hero-visual">
            <div className="class-card">
              <div className="class-card-top">
                <span className="live-dot" /> Live now
              </div>
              <h4>Building REST APIs with Node.js</h4>
              <p>Mentor: Aditi Sharma</p>
              <div className="class-card-progress">
                <span style={{ width: "68%" }} />
              </div>
              <p className="class-card-meta">Lesson 8 of 12 · 42 watching</p>
            </div>
            <div className="class-card class-card-behind" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section features">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Why LMS Portal</span>
            <h2>Built for people who learn by doing</h2>
          </div>

          <div className="grid-3">
            <div className="feature-card">
              <h3>Expert Courses</h3>
              <p>Structured content from mentors who work in the industry.</p>
            </div>
            <div className="feature-card">
              <h3>Certification</h3>
              <p>Earn a certificate the moment you finish a course.</p>
            </div>
            <div className="feature-card">
              <h3>Career Support</h3>
              <p>Resume reviews, mock interviews and placement help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section className="section courses">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Catalog</span>
            <h2>Popular courses</h2>
          </div>

          <div className="grid-3">
            {courses.map((course) => (
              <div className="ticket-card" key={course.name}>
                <div className="ticket-top">
                  <span className="ticket-tag">{course.tag}</span>
                  <span className="ticket-weeks">{course.weeks} wks</span>
                </div>
                <h4>{course.name}</h4>
                <p>From beginner to job-ready, with real projects.</p>
                <div className="ticket-perf" aria-hidden="true" />
                <button className="btn btn-primary btn-block">
                  Enroll now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats">
        <div className="wrap grid-4">
          <div>
            <h2>15K+</h2>
            <p>Students</p>
          </div>
          <div>
            <h2>350+</h2>
            <p>Courses</p>
          </div>
          <div>
            <h2>120+</h2>
            <p>Mentors</p>
          </div>
          <div>
            <h2>98%</h2>
            <p>Success rate</p>
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="section why-us">
        <div className="wrap why-grid">
          <ul className="why-list">
            <li>
              <strong>Live projects</strong>
              <span>Ship work you can put in a portfolio, not just watch videos.</span>
            </li>
            <li>
              <strong>Lifetime access</strong>
              <span>Come back to any course whenever you need a refresher.</span>
            </li>
            <li>
              <strong>Placement assistance</strong>
              <span>Interview prep and referrals once you're job-ready.</span>
            </li>
            <li>
              <strong>Responsive dashboard</strong>
              <span>Track progress on your phone, tablet, or laptop.</span>
            </li>
          </ul>

          <div className="why-copy">
            <span className="eyebrow">Why choose us</span>
            <h2>A dashboard that keeps you moving</h2>
            <p>
              Every course tracks your progress automatically, so picking up
              where you left off never takes more than one click.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <div className="wrap cta-inner">
          <h2>Ready to start learning?</h2>
          <p>Join thousands of students already learning on LMS Portal.</p>
          <button className="btn btn-accent">Get Started</button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="wrap grid-3 footer-grid">
          <div>
            <h3>LMS Portal</h3>
            <p>
              Modern online learning platform for students, professionals
              and educators.
            </p>
          </div>

          <div>
            <h5>Quick links</h5>
            <ul>
              <li>Home</li>
              <li>Courses</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <p>support@lms.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>

        <hr />
        <p className="footer-bottom">© 2026 LMS Portal. All rights reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;