
import { useEffect, useState } from "react";
import { getMasterPlan } from "../../services/API";
import "../../styles/masterplanshow.css";

const MasterPlanAdmin = () => {
  const [planData,setPlanData] = useState([])
  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      credit: 50,
      price: 999,
      offer: 10,
      duration: 30,
      status: "Active",
      desc: "Basic LMS subscription plan",
      is_rec: 0,
    },
    {
      id: 2,
      name: "Premium Plan",
      credit: 200,
      price: 2999,
      offer: 20,
      duration: 90,
      status: "Active",
      desc: "Premium LMS subscription plan",
      is_rec: 1,
    },
    {
      id: 3,
      name: "Pro Plan",
      credit: 500,
      price: 4999,
      offer: 30,
      duration: 180,
      status: "Active",
      desc: "Professional LMS subscription plan",
      is_rec: 0,
    },
    {
      id: 4,
      name: "Enterprise Plan",
      credit: 1000,
      price: 9999,
      offer: 40,
      duration: 365,
      status: "Active",
      desc: "Enterprise LMS subscription plan",
      is_rec: 0,
    },
     {
      id: 4,
      name: "Enterprise Plan",
      credit: 1000,
      price: 9999,
      offer: 40,
      duration: 365,
      status: "Active",
      desc: "Enterprise LMS subscription plan",
      is_rec: 0,
    },
     {
      id: 4,
      name: "Enterprise Plan",
      credit: 1000,
      price: 9999,
      offer: 40,
      duration: 365,
      status: "Active",
      desc: "Enterprise LMS subscription plan",
      is_rec: 0,
    },
     {
      id: 4,
      name: "Enterprise Plan",
      credit: 1000,
      price: 9999,
      offer: 40,
      duration: 365,
      status: "Active",
      desc: "Enterprise LMS subscription plan",
      is_rec: 0,
    },
     {
      id: 4,
      name: "Enterprise Plan",
      credit: 1000,
      price: 9999,
      offer: 40,
      duration: 365,
      status: "Active",
      desc: "Enterprise LMS subscription plan",
      is_rec: 0,
    },
     {
      id: 4,
      name: "Enterprise Plan",
      credit: 1000,
      price: 9999,
      offer: 40,
      duration: 365,
      status: "Active",
      desc: "Enterprise LMS subscription plan",
      is_rec: 0,
    },
  ];

  useEffect(()=>{
    fetchData()
  },[])
  
    const fetchData = async () => {
      try {
        const res = await getMasterPlan();
        setPlanData(res.result)
        console.log("!!!!!!!!!!!!!!!!!!", res)
  
      } catch (error) {
        console.log(error);
      }
  
    };

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
              {plan.is_rec === 1 && (
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
                <button className="btn btn-sm btn-outline-primary">
                  Edit
                </button>

                <button className="btn btn-sm btn-outline-danger">
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

