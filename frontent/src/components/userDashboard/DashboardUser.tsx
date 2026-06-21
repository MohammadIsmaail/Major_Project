import {
  FaBookOpen,
  FaCertificate,
  FaClock,
  FaUserGraduate,
} from "react-icons/fa";
import "../../styles/DashboardUser.css"

const DashboardUser = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: "MERN Stack Development",
      progress: 75,
      duration: "12 Weeks",
    },
    {
      id: 2,
      title: "React & TypeScript",
      progress: 45,
      duration: "8 Weeks",
    },
    {
      id: 3,
      title: "PostgreSQL Mastery",
      progress: 90,
      duration: "6 Weeks",
    },
  ];

  return (
    <div className="container-fluid user-dashboard py-4">
      {/* Welcome Section */}
      <div className="welcome-card mb-4">
        <h2>Welcome Back, Ismaail 👋</h2>
        <p>
          Continue your learning journey and track your progress.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-lg-3 col-md-6">
          <div className="user-stat-card">
            <FaBookOpen className="stat-icon" />
            <h3>12</h3>
            <p>Enrolled Courses</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="user-stat-card">
            <FaClock className="stat-icon" />
            <h3>48h</h3>
            <p>Learning Hours</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="user-stat-card">
            <FaCertificate className="stat-icon" />
            <h3>5</h3>
            <p>Certificates</p>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="user-stat-card">
            <FaUserGraduate className="stat-icon" />
            <h3>78%</h3>
            <p>Overall Progress</p>
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="dashboard-section">
        <div className="section-header">
          <h4>My Courses</h4>
        </div>

        <div className="row g-4">
          {enrolledCourses.map((course) => (
            <div className="col-lg-4 col-md-6" key={course.id}>
              <div className="course-card">
                <h5>{course.title}</h5>

                <small>{course.duration}</small>

                <div className="progress mt-3">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${course.progress}%`,
                    }}
                  >
                    {course.progress}%
                  </div>
                </div>

                <button className="continue-btn mt-3">
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section mt-4">
        <div className="section-header">
          <h4>Recent Activity</h4>
        </div>

        <div className="activity-card">
          <ul>
            <li>✅ Completed React Hooks Module</li>
            <li>📚 Started PostgreSQL Advanced Queries</li>
            <li>🏆 Earned JavaScript Certificate</li>
            <li>🎯 Reached 75% Progress in MERN Stack</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;