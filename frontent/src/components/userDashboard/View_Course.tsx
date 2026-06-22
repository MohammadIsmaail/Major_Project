import { toast } from "react-toastify";
import { viewCourseService } from "../../services/API";
import "../../styles/View_Course.css";

const View_Course = () => {
  const handleViewCourse = async () => {
    try {
      const res = await viewCourseService();

      if (res.success) {
        toast.success(
          "Course Access Granted. Credit Deducted."
        );
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="view-course-page">
      <div className="course-card">
        <h2>Premium Course Access</h2>

        <p>
          1 Credit will be deducted to access
          course content.
        </p>

        <button
          className="btn btn-success"
          onClick={handleViewCourse}
        >
          View Course
        </button>
      </div>
    </div>
  );
};

export default View_Course;