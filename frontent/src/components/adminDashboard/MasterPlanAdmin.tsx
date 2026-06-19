import { useEffect, useState } from "react";
import { deleteMasterPlan, getMasterPlan } from "../../services/API";
import "../../styles/masterplanshow.css";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MasterPlanAdmin = () => {
  const [planData, setPlanData] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res: any = await getMasterPlan();
      setPlanData(res.result || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch master plans", {
        position: "bottom-right",
      });
    }
  };

  const updateMasterPlan = (id: number) => {
    navigate(`/CreateMasterPlanAdmin?id=${id}`);
  };

  const deleteHandle = async (id: number) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    html: `
      <p>This action will permanently delete the master plan.</p>
      <b>This cannot be undone.</b>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete Plan",
    cancelButtonText: "Keep Plan",
    confirmButtonColor: "#e63946",
    cancelButtonColor: "#457b9d",
    backdrop: true,
    allowOutsideClick: false,
  });

  if (!result.isConfirmed) return;

  try {
    setLoadingId(id);

    const res: any = await deleteMasterPlan(id);

    if (res.success) {
      await Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        text: res.message,
        timer: 2000,
        showConfirmButton: false,
      });
    }
     fetchData();
  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text:
        err?.response?.data?.message ||
        "Something went wrong!",
    });
  } finally {
    setLoadingId(null);
  }
};

  return (
    <div className="container-fluid master-plan-page">
      <div className="premium-header">
        <div>
          <h1>Master Plans</h1>
          <p>Manage LMS Subscription Plans</p>
        </div>

        <button
          className="create-btn"
          onClick={() =>
            navigate("/CreateMasterPlanAdmin")
          }
        >
          + Create Plan
        </button>
      </div>

      {planData.length === 0 ? (
        <div className="text-center py-5">
          <h4>No Master Plans Found</h4>
          <p className="text-muted">
            Create your first plan.
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {planData.map((plan: any) => {
            const isRecommended =
              Number(plan.is_res) === 1;

            return (
              <div
                key={plan.id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
              >
                <div
                  className={`plan-card ${isRecommended
                      ? "recommended-card"
                      : ""
                    }`}
                >
                  {isRecommended && (
                    <div className="recommended-badge">
                      ⭐ Recommended
                    </div>
                  )}

                  <div className="plan-title">
                    {plan.name}
                  </div>

                  <div className="price-section">
                    <div className="price">
                      ₹{plan.price}
                    </div>

                    <small>
                      {plan.duration} Days Access
                    </small>
                  </div>

                  <p className="plan-desc">
                    {plan.desc}
                  </p>

                  <div className="info-box">
                    <span>Credits</span>
                    <strong>{plan.credit}</strong>
                  </div>

                  <div className="info-box">
                    <span>Offer</span>
                    <strong>
                      {plan.offer}% OFF
                    </strong>
                  </div>

                  <div className="info-box">
                    <span>Status</span>

                    <span
                      className={
                        Number(plan.status) === 1
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {Number(plan.status) === 1
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        updateMasterPlan(
                          plan.id
                        )
                      }
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      disabled={
                        loadingId === plan.id
                      }
                      onClick={() =>
                        deleteHandle(plan.id)
                      }
                    >
                      <FaTrash />
                      {loadingId === plan.id
                        ? " Deleting..."
                        : " Delete"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MasterPlanAdmin;