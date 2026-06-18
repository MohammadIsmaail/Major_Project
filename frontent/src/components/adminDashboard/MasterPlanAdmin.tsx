
import { useEffect, useState } from "react";
import { deleteMasterPlan, getMasterPlan } from "../../services/API";
import "../../styles/masterplanshow.css";
import { useNavigate } from "react-router-dom";

const MasterPlanAdmin = () => {
  const [planData,setPlanData] = useState([])
  const navigate = useNavigate();

  const EditeDataofMasterPlan = (id:any)=>{
      navigate(`/CreateMasterPlanAdmin?id=${id}`)
  }

  useEffect(()=>{
    fetchData()
  },[])
  
    const fetchData = async () => {
      try {
        const res = await getMasterPlan();
        setPlanData(res.result)

  
      } catch (error) {
        console.log(error);
      }
  
    };

    const deleteHandle =async (id:any)=>{

       const deleta:any= await deleteMasterPlan(id)
       console.log(deleta);
       fetchData()
    }

  return (
    <div className="container-fluid py-4">
      <div className="page-header">
        <h2>LMS Plans</h2>
        <p>Manage Subscription Plans</p>
      </div>

      <div className="row">
        {planData.map((plan:any) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
            key={plan.id}
          >
            <div
              className={`plan-card ${
                plan.is_rec ? "recommended" : ""
              }`}
            >
              {plan.is_res === 1 && (
                <span className="recommended-badge">
                  ⭐ Recommended
                </span>
              )}

              <div className="plan-card-header">
                <h5>{plan.name}</h5>
                <h3>₹{plan.price}</h3>
              </div>

              <div className="plan-card-body">
                <div className="plan-info">
                  <span>Credits</span>
                  <strong>{plan.credit}</strong>
                </div>

                <div className="plan-info">
                  <span>Duration</span>
                  <strong>{plan.duration} Days</strong>
                </div>

                <div className="plan-info">
                  <span>Offer</span>
                  <strong>{plan.offer}% OFF</strong>
                </div>

                <div className="plan-info">
                  <span>Status</span>
                  <span
                    className={`badge ${
                      plan.status === "Active"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {plan.status}
                  </span>
                </div>

                <p className="plan-desc">
                  {plan.desc}
                </p>
              </div>

              <div className="plan-card-footer">
                <button className="btn btn-sm btn-outline-primary" onClick={()=>{EditeDataofMasterPlan(plan.id)}}>
                  Edit
                </button>

                <button className="btn btn-sm btn-outline-danger" onClick={()=>{deleteHandle(plan.id)}}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterPlanAdmin;

