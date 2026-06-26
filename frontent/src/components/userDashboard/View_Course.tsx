import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { viewCourseService } from "../../services/API";
import "../../styles/View_Course.css";

const View_Course = () => {
  const [courses, setCourses] = useState<any[]>([]);

  const loadCourses = async () => {
    try {
      const res = await viewCourseService();
      console.log(res.result)
      console.log(res)
      if (res.success) {
        setCourses(res.result || []);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="view-course-page">
      <h2 className="view-course-heading">
        Purchase Course
      </h2>

      <div className="view-course-grid">
        {courses.map((course: any) => (
          <div
            className="view-course-card"
            key={course.id}
          >
            <img
              src={course.image}
              alt={course.name}
              className="view-course-image"
            />

            <div className="view-course-body">
              <h3>{course.name}</h3>

              <p className="view-course-desc">
                {course.description}
              </p>

              <div className="view-course-info">
                <span>{course.level}</span>

                <span>⭐ {course.rating}</span>

                <span>🕒 {course.duration}</span>
              </div>

              <div className="view-course-type">
                {course.file_type}
              </div>

              <button
                className="view-content-btn"
                onClick={() =>
                  window.open(
                    course.file_url,
                    "_blank"
                  )
                }
              >
                📄 View Content
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View_Course;