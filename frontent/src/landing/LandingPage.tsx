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

const features = [
  {
    title: "Expert courses",
    desc: "Structured content from mentors who work in the industry.",
    dot: "dot-sand",
  },
  {
    title: "Certification",
    desc: "Earn a certificate the moment you finish a course.",
    dot: "dot-coral",
  },
  {
    title: "Career support",
    desc: "Resume reviews, mock interviews and placement help.",
    dot: "dot-sage",
  },
];

const whyUs = [
  { title: "Live projects", desc: "Ship work you can put in a portfolio, not just watch videos." },
  { title: "Lifetime access", desc: "Come back to any course whenever you need a refresher." },
  { title: "Placement assistance", desc: "Interview prep and referrals once you're job-ready." },
  { title: "Responsive dashboard", desc: "Track progress on your phone, tablet, or laptop." },
];

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-blob" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker">Cohort enrolling now</p>

            <h1 className="hero-title">
              Learn skills that build your <span>future career</span>
            </h1>

            <p className="hero-text">
              Practical courses, real-world projects, quizzes and
              certificates — taught by people who ship code for a living.
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary">Explore courses</button>
              <button className="btn btn-link">Watch demo →</button>
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
                <h3>98%</h3>
                <p>Success rate</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="avatar">RS</div>
                <div>
                  <p className="hero-card-name">Rohit Sharma</p>
                  <p className="hero-card-role">MERN Stack · Week 8 of 12</p>
                </div>
              </div>
              <div className="hero-card-progress">
                <span style={{ width: "68%" }} />
              </div>
              <p className="hero-card-label">68% complete</p>
            </div>
            <div className="hero-card hero-card-behind" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section features">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker kicker-center">Why LMS Portal</p>
            <h2>Built for people who learn by doing</h2>
          </div>

          <div className="grid-3">
            {features.map((f) => (
              <div className="feature-card" key={f.title}>
                <span className={`dot ${f.dot}`} />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section className="section courses">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker kicker-center">Catalog</p>
            <h2>Popular courses</h2>
          </div>

          <div className="grid-3">
            {courses.map((course) => (
              <div className="course-card" key={course.name}>
                <div className="course-card-top">
                  <span className="course-tag">{course.tag}</span>
                  <span className="course-weeks">{course.weeks} weeks</span>
                </div>
                <h4>{course.name}</h4>
                <p>From beginner to job-ready, with real projects.</p>
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
          <div className="why-copy">
            <p className="kicker">Why choose us</p>
            <h2>A dashboard that keeps you moving</h2>
            <p className="why-lead">
              Every course tracks your progress automatically, so picking up
              where you left off never takes more than one click.
            </p>
          </div>

          <ul className="why-list">
            {whyUs.map((item) => (
              <li key={item.title}>
                <span className="why-index" />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <div className="wrap cta-inner">
          <h2>Ready to start learning?</h2>
          <p>Join thousands of students already learning on LMS Portal.</p>
          <button className="btn btn-cream">Get Started</button>
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