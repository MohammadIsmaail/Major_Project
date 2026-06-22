import { useEffect, useState } from "react";
import { getUserPlans } from "../../services/API";
import "../../styles/Plan.css";

const Plan = () => {
  const [plans, setPlans] = useState<any[]>([]);

  const fetchPlans = async () => {
    try {
      const res = await getUserPlans();
      setPlans(res.result || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="plan-page">
      <div className="page-title">
        <h2>Available Plans</h2>
        <p>Select a plan and boost your credits</p>
      </div>

      <div className="row">
        {plans.map((plan) => (
          <div className="col-lg-4 mb-4" key={plan.id}>
            <div className="plan-card">
              <h3>{plan.name}</h3>

              <div className="plan-credit">
                {plan.credit} Credits
              </div>

              <div className="plan-price">
                ₹{plan.price}
              </div>

              <div className="plan-duration">
                {plan.duration} Days
              </div>

              <button className="btn btn-primary w-100 mt-3">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;