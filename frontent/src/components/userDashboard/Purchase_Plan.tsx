import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getUserPlans,
  purchasePlanService,
} from "../../services/API";
import "../../styles/Purchase_Plan.css";

const Purchase_Plan = () => {
  const [plans, setPlans] = useState<any[]>([]);

  const fetchPlans = async () => {
    const res = await getUserPlans();
    setPlans(res.result || []);
  };

  const purchasePlan = async (id: number) => {
    try {
      const res = await purchasePlanService(id);

      if (res.success) {
        toast.success("Plan Purchased Successfully");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Purchase Failed");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="purchase-page">
      <div className="purchase-hero">
        <h1>Purchase Credits</h1>
        <p>
          Unlock premium courses and learning
          resources.
        </p>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="pricing-card"
          >
            <div className="plan-name">
              {plan.name}
            </div>

            <div className="price">
              ₹{plan.price}
            </div>

            <div className="credit-box">
              {plan.credit} Credits
            </div>

            <div className="features">
              <div>Duration : {plan.duration} Days</div>
              <div>Offer : {plan.offer}%</div>
            </div>

            <button
              className="purchase-btn"
              onClick={() =>
                purchasePlan(plan.id)
              }
            >
              Purchase Now →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase_Plan;