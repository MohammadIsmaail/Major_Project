import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/MasterCourseAdmin.css";
import {
  deleteMasterCourse,
  getMasterCourse,
} from "../../services/API";

interface Course {
  id: number;
  title: string;
  desc: string;
  thumbnail: string;
  level: string;
  rating: string;
  duration: string;
  type: string;
  status: number;
  content: string;
}


const MasterCourseAdmin = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);


  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await getMasterCourse();

      if (res.success) {
        setCourses(res.result || []);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Load Courses");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteMasterCourse(id);

      if (res.success) {
        toast.success(res.message);

        setCourses((prev) =>
          prev.filter((course) => course.id !== id)
        );
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="container-fluid py-4">

      {/* Header */}

      <div className="page-header d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <div>
          <h2 className="fw-bold mb-1">Master Courses</h2>
          <p className="text-muted mb-0">
            Manage LMS Courses & Learning Materials
          </p>
        </div>

        <Link
          to="/CreateMasterCourseAdmin"
          className="btn btn-primary rounded-pill px-4"
        >
          + Add Course
        </Link>

      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="alert alert-warning text-center">
          No Courses Found
        </div>
      ) : (
        <div className="row g-4">

          {courses.map((course) => (
           <div className="col-12 col-md-6 col-lg-4" key={course.id}>
              <div className="card course-card border-0">

                {/* Image */}

                <div className="image-wrapper">

                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="course-img"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />

                  <div className="image-overlay">
                    <span className="badge bg-dark">
                      ⭐ {course.rating}
                    </span>
                  </div>

                </div>

                {/* Body */}

                <div className="card-body">

                  <div className="d-flex justify-content-between mb-3">

                    <span className="badge bg-primary custom-badge">
                      {course.level}
                    </span>

                    <span
                      className={`badge custom-badge ${
                        Number(course.status) === 1
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {Number(course.status) === 1
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>

                  <h5 className="course-title">
                    {course.title}
                  </h5>

                  <p className="course-desc">
                    {course.desc}
                  </p>

                  {/* Info Grid */}

                  <div className="course-info-grid">

                    <div className="info-box">
                      <span className="label">
                        Duration
                      </span>

                      <span className="value">
                        {course.duration}
                      </span>
                    </div>

                    <div className="info-box">
                      <span className="label">
                        Type
                      </span>

                      <span className="value">
                        {course.type}
                      </span>
                    </div>

                    <div className="info-box">
                      <span className="label">
                        Rating
                      </span>

                      <span className="value">
                        ⭐ {course.rating}
                      </span>
                    </div>

                    <div className="info-box">
                      <span className="label">
                        Material
                      </span>

                      <a
                        href={course.content}
                        target="_blank"
                        rel="noreferrer"
                        className="value text-decoration-none text-primary"
                      >
                        View File
                      </a>
                    </div>

                  </div>

                  {/* Buttons */}

                  <div className="button-group">

                    <Link
                      to={`/CreateMasterCourseAdmin/${course.id}`}
                      className="btn btn-warning course-btn flex-fill"
                    >
                    
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger course-btn flex-fill"
                      onClick={() =>
                        handleDelete(course.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MasterCourseAdmin;
