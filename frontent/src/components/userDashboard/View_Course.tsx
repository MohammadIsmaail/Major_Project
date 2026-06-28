import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {getMasterCourse,viewCourseService,} from "../../services/API";
import "../../styles/View_Course.css";

const View_Course = () => {
  const [courses, setCourses] = useState<any[]>([]);

  // Load All Courses
  const loadCourses = async () => {
    try {
      const res = await getMasterCourse();

      if (res.success) {
        setCourses(res.result || []);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // View Content
  const handleViewContent = async (course: any) => {
    try {
      const res = await viewCourseService();

      if (res.success) {
        toast.success("1 Credit Deducted Successfully");

        window.open(course.content, "_blank");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="view-course-page">
      <h2 className="view-course-heading">
        View Course
      </h2>

      <div className="view-course-grid">
        {courses.map((course: any) => (
          <div
            className="view-course-card"
            key={course.id}
          >
            <img
              src={`http://localhost:3000/thumbnail_images/${course.thumbnail}`}
              alt={course.title}
              className="view-course-image"
            />

            <div className="view-course-body">
              <h3>{course.title}</h3>

              <p className="view-course-desc">
                {course.desc}
              </p>

              <div className="view-course-info">
                <span>{course.level}</span>

                <span>⭐ {course.rating}</span>

                <span>🕒 {course.duration}</span>
              </div>

              <div className="view-course-type">
                {course.type}
              </div>
              
              <div className="view-content-btn" onClick={()=>handleViewContent(course)}>
                { `http://localhost:4000/thumbnail_images/${course.content}`}
               📄 View Content
              </div>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View_Course;