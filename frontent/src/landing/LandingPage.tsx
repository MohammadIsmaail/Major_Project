import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/LandingPage.css";

const CODE_LINES = [
  { text: "const developer = you;", color: "plain" },
  { text: "developer.learn('MERN');", color: "call" },
  { text: "developer.ship(project);", color: "call" },
  { text: "// career.status = 'ready' ✓", color: "comment" },
];

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
  },
  {
    title: "Certification",
    desc: "Earn a certificate the moment you finish a course.",
  },
  {
    title: "Career support",
    desc: "Resume reviews, mock interviews and placement help.",
  },
];

const whyUs = [
  { title: "Live projects", desc: "Ship work you can put in a portfolio, not just watch videos." },
  { title: "Lifetime access", desc: "Come back to any course whenever you need a refresher." },
  { title: "Placement assistance", desc: "Interview prep and referrals once you're job-ready." },
  { title: "Responsive dashboard", desc: "Track progress on your phone, tablet, or laptop." },
];

const LandingPage: React.FC = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setLineIndex(CODE_LINES.length);
      return;
    }

    if (lineIndex >= CODE_LINES.length) return;

    const current = CODE_LINES[lineIndex].text;

    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 35);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 450);
    return () => clearTimeout(t);
  }, [charIndex, lineIndex]);

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light">// enrolling now</span>

            <h1 className="hero-title">
              Learn skills that build your
              <span> future career</span>
            </h1>

            <p className="hero-text">
              Practical courses, real-world projects, quizzes and
              certificates — taught by people who ship code for a living.
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary">Explore courses</button>
              <button className="btn btn-ghost">Watch demo</button>
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
            <div className="editor-window">
              <div className="editor-titlebar">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
                <span className="editor-filename">career.js</span>
              </div>
              <div className="editor-body">
                {CODE_LINES.map((line, i) => {
                  const isDone = i < lineIndex;
                  const isTyping = i === lineIndex;
                  const shown = isDone
                    ? line.text
                    : isTyping
                    ? line.text.slice(0, charIndex)
                    : "";
                  if (!isDone && !isTyping) return null;
                  return (
                    <div className={`code-line code-${line.color}`} key={i}>
                      <span className="line-no">{i + 1}</span>
                      <span>{shown}</span>
                      {isTyping && <span className="cursor" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section features">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">// why lms portal</span>
            <h2>Built for people who learn by doing</h2>
          </div>

          <div className="grid-3">
            {features.map((f) => (
              <div className="feature-card" key={f.title}>
                <span className="feature-glyph">{"{ }"}</span>
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
            <span className="eyebrow">// catalog</span>
            <h2>Popular courses</h2>
          </div>

          <div className="grid-3">
            {courses.map((course) => (
              <div className="ticket-card" key={course.name}>
                <div className="ticket-top">
                  <span className="ticket-tag">{course.tag}</span>
                  <span className="ticket-weeks">{course.weeks}wks</span>
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
          <div className="terminal-list">
            <div className="terminal-titlebar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <ul>
              {whyUs.map((item) => (
                <li key={item.title}>
                  <span className="prompt">&gt;</span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="why-copy">
            <span className="eyebrow">// why choose us</span>
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
          <span className="eyebrow eyebrow-light">// ready?</span>
          <h2>Start learning today</h2>
          <p>Join thousands of students already learning on LMS Portal.</p>
          <button className="btn btn-accent">Get started</button>
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