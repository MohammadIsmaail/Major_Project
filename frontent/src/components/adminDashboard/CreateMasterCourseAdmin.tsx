import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import "../../styles/CreateMasterCourseAdmin.css";
import {
  createMasterCourse,
  getSingleMasterCourse,
  updateMasterCourse,
} from "../../services/API";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Course Title is required")
    .matches(/\S/, "Only spaces not allowed")
    .min(3, "Minimum 3 characters")
    .max(255, "Maximum 255 characters"),

  desc: yup
    .string()
    .required("Description is required")
    .min(5, "Minimum 5 characters")
    .max(255, "Maximum 255 characters"),

  level: yup.string().required("Level is required"),

  rating: yup.string().required("Rating is required"),

  duration: yup.string().required("Duration is required"),

  type: yup.string().required("Course Type is required"),

  thumbnail: yup.mixed<any>(),

  content: yup.mixed<any>(),

  status: yup.number().oneOf([0, 1]),
});

const CreateMasterCourseAdmin = () => {

  const { id } = useParams()

  console.log("ID => ", id);

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      status: 1,
    },
  });

  useEffect(() => {
    console.log("ID Changed =>", id);
    if (id) {
      getCourseData();
    }
  }, [id]);

  const getCourseData = async () => {
    try {
      const res: any = await getSingleMasterCourse(id);
      console.log("ID Changed =>", id);
      reset({
        title: res.result.title,
        desc: res.result.desc,
        level: res.result.level,
        rating: res.result.rating,
        duration: res.result.duration,
        type: res.result.type,
        status: res.result.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("level", data.level);
      formData.append("rating", data.rating);
      formData.append("duration", data.duration);
      formData.append("type", data.type);
      formData.append("status", String(data.status));

      if (data.thumbnail?.[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      if (data.content?.[0]) {
        formData.append("content", data.content[0]);
      }

      let res: any;

      if (id) {
        res = await updateMasterCourse(id, formData);
      } else {
        res = await createMasterCourse(formData);
      }

      if (res.success) {
        toast.success(res.message, {
          position: "bottom-right",
          transition: Bounce,
        });

        if (!id) {
          reset();
        }
      } else {
        toast.error(res.message, {
          position: "bottom-right",
          transition: Bounce,
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong!"
      );
    }
  };




  return (
    <div className="container-fluid master-course-container">
      <div className="row justify-content-center">
        <div className="col-12">

          <div className="master-course-card">

            <div className="header-section">
              <div>
                <h2 className="page-title">
                  {id ? "Edit Master Course" : "Create Master Course"}
                </h2>

                <p className="page-subtitle">
                  Manage LMS Master Courses
                </p>
              </div>

              <span className="badge bg-primary px-3 py-2">
                LMS Admin
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-2">

                {/* Course Title */}
                <div className="col-md-8">
                  <label className="form-label-premium">
                    Course Title
                  </label>

                  <input
                    type="text"
                    {...register("title")}
                    className="form-control-premium"
                    placeholder="Course Title"
                  />

                  {errors.title && (
                    <small className="text-danger">
                      {String(errors.title.message)}
                    </small>
                  )}
                </div>

                {/* Status */}
                <div className="col-md-4">
                  <label className="form-label-premium">
                    Status
                  </label>

                  <select
                    {...register("status")}
                    className="form-control-premium"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>

                {/* Level */}
                <div className="col-md-3">
                  <label className="form-label-premium">
                    Level
                  </label>

                  <select
                    {...register("level")}
                    className="form-control-premium"
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Rating */}
                <div className="col-md-3">
                  <label className="form-label-premium">
                    Rating
                  </label>

                  <input
                    type="text"
                    {...register("rating")}
                    className="form-control-premium"
                    placeholder="4.8"
                  />
                </div>

                {/* Duration */}
                <div className="col-md-3">
                  <label className="form-label-premium">
                    Duration
                  </label>

                  <input
                    type="text"
                    {...register("duration")}
                    className="form-control-premium"
                    placeholder="20 Hours"
                  />
                </div>

                {/* Type */}
                <div className="col-md-3">
                  <label className="form-label-premium">
                    Course Type
                  </label>

                  <select
                    {...register("type")}
                    className="form-control-premium"
                  >
                    <option value="">Select Type</option>
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>

                {/* Thumbnail */}
                <div className="col-md-6">
                  <label className="form-label-premium">
                    Thumbnail Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    {...register("thumbnail")}
                    className="form-control-premium"
                  />

                  {errors.thumbnail && (
                    <small className="text-danger">
                      {String(errors.thumbnail.message)}
                    </small>
                  )}
                </div>

                {/* Course Material */}
                <div className="col-md-6">
                  <label className="form-label-premium">
                    Course Material
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    {...register("content")}
                    className="form-control-premium"
                  />

                  {errors.content && (
                    <small className="text-danger">
                      {String(errors.content.message)}
                    </small>
                  )}
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label-premium">
                    Description
                  </label>

                  <textarea
                    rows={2}
                    {...register("desc")}
                    className="form-control-premium"
                    placeholder="Course Description"
                  />

                  {errors.desc && (
                    <small className="text-danger">
                      {String(errors.desc.message)}
                    </small>
                  )}
                </div>

                {/* Buttons */}
                <div className="col-12">
                  <div className="button-wrapper">

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => reset()}
                    >
                      <MdRefresh className="me-2" />
                      Reset
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      <FaSave className="me-2" />
                      {id ? "Update Course" : "Create Course"}
                    </button>

                  </div>
                </div>

              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateMasterCourseAdmin;