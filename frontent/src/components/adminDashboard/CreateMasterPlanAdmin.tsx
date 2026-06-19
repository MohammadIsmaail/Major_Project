// CreateMasterPlanAdmin.tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createMasterPlan, getSingleMasterPlan ,   updateMasterPlan} from "../../services/API";
import { useSearchParams } from "react-router-dom";
import "../../styles/CreateMasterPlanAdmin.css";
import { useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { toast, Bounce } from "react-toastify";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Master Plan Name is required")
    .matches(/\S/, "Only spaces not allowed")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters"),

  desc: yup
    .string()
    .required("Description is required")
    .min(5, "Minimum 5 characters")
    .max(255, "Maximum 255 characters"),

  credit: yup
    .number()
    .typeError("Credit must be a number")
    .required("Credit is required")
    .positive()
    .integer(),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive()
    .integer(),

  offer: yup
    .number()
    .typeError("Offer must be a number")
    .required("Offer is required")
    .positive()
    .integer(),

  duration: yup
    .number()
    .typeError("Duration must be a number")
    .required("Duration is required")
    .positive()
    .integer(),

  is_rec: yup.number().oneOf([0, 1]),

  status: yup.number().oneOf([0, 1]),
});

const CreateMasterPlanAdmin = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      status: 1,
      is_rec: 1,
    },
  });

  useEffect(() => {
    if (id) {
      getPlanData();
    }
  }, [id]);

  const getPlanData = async () => {
    try {
      const res: any = await getSingleMasterPlan(id);

      reset({
        name: res.result.name,
        desc: res.result.desc,
        credit: res.result.credit,
        price: res.result.price,
        offer: res.result.offer,
        duration: res.result.duration,
        is_rec: res.result.is_rec,
        status: res.result.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

const onSubmit = async (data: any) => {
  try {
    let res;

    if (id) {
      res = await updateMasterPlan(id, data);
       if(res.success){
        toast.success(res.message, {
        position: "bottom-right",
        transition: Bounce, 
      });
      }
      else{
        toast.error(res.message, {
        position: "bottom-right",
        transition: Bounce,
      });
      }
    } else {
      res = await createMasterPlan(data);
      if(res.success){
        toast.success(res.message, {
        position: "bottom-right",
        transition: Bounce,
      });
      }
      else{
        toast.error(res.message, {
        position: "bottom-right",
        transition: Bounce,
      });
      }
    }

    if (res.success) {
      if (!id) {
        reset();
      }
    }
  } catch (err: any) {
    toast.error(
      err?.response?.data?.message ||
        "Something went wrong!"
    );
  }
};

  return (<div className="container-fluid master-plan-container"> <div className="row justify-content-center"> <div className="col-12">


    <div className="master-plan-card">

      <div className="header-section">
        <div>
          <h2 className="page-title">
            {id ? "Edit Master Plan" : "Create Master Plan"}
          </h2>

          <p className="page-subtitle">
            Manage LMS Subscription Plans
          </p>
        </div>

        <span className="badge bg-primary px-3 py-2">
          LMS Admin
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3">

          <div className="col-xl-3 col-lg-4 col-md-6">
            <label className="form-label-premium">
              Plan Name
            </label>

            <input
              type="text"
              {...register("name")}
              className="form-control-premium"
              placeholder="Enter plan name"
            />

            {errors.name && (
              <small className="text-danger">
                {String(errors.name.message)}
              </small>
            )}
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <label className="form-label-premium">
              Credits
            </label>

            <input
              type="number"
              {...register("credit")}
              className="form-control-premium"
              placeholder="Credits"
            />

            {errors.credit && (
              <small className="text-danger">
                {String(errors.credit.message)}
              </small>
            )}
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <label className="form-label-premium">
              Price
            </label>

            <input
              type="number"
              {...register("price")}
              className="form-control-premium"
              placeholder="Price"
            />

            {errors.price && (
              <small className="text-danger">
                {String(errors.price.message)}
              </small>
            )}
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <label className="form-label-premium">
              Offer %
            </label>

            <input
              type="number"
              {...register("offer")}
              className="form-control-premium"
              placeholder="Offer"
            />

            {errors.offer && (
              <small className="text-danger">
                {String(errors.offer.message)}
              </small>
            )}
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <label className="form-label-premium">
              Duration
            </label>

            <input
              type="number"
              {...register("duration")}
              className="form-control-premium"
              placeholder="Duration"
            />

            {errors.duration && (
              <small className="text-danger">
                {String(errors.duration.message)}
              </small>
            )}
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <label className="form-label-premium">
              Recommended
            </label>

            <select
              {...register("is_res")}
              className="form-control-premium"
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
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

          <div className="col-12">
            <label className="form-label-premium">
              Description
            </label>

            <textarea
              {...register("desc")}
              className="form-control-premium textarea-premium"
              placeholder="Write plan description..."
            />

            {errors.desc && (
              <small className="text-danger">
                {String(errors.desc.message)}
              </small>
            )}
          </div>

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
                {id ? "Update Plan" : "Create Plan"}
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

export default CreateMasterPlanAdmin;
