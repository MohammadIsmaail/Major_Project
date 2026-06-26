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
    <div className="available-plan-page">
      <h2 className="available-plan-heading">
        Purchased Plan
      </h2>

      <div className="available-plans-grid">
        {plans.map((plan: any) => {
          const finalPrice =
            plan.price - (plan.price * plan.offer) / 100;

          return (
            <div
              key={plan.id}
              className={`available-plan-card ${
                plan.is_res === 1 ? "available-featured" : ""
              }`}
            >
              {plan.is_res === 1 && (
                <div className="available-badge">
                  Recommended
                </div>
              )}

              <div className="available-plan-price">
                ₹{plan.price}
              </div>

              <div className="available-plan-name">
                {plan.name}
              </div>

              <div className="available-plan-discount">
                Total after {plan.offer}% off ₹{finalPrice}
              </div>

              <ul className="available-feature-list">
                <li>
                  <span className="tick">✓</span>
                  <span>
                    <strong>{plan.credit}</strong> Credits
                  </span>
                </li>

                <li>
                  <span className="tick">✓</span>
                  <span>
                    ₹{Math.round(plan.price / plan.credit)} per credit
                  </span>
                </li>

                <li>
                  <span className="tick">✓</span>
                  <span>
                    Valid for <strong>{plan.duration}</strong> days
                  </span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plan;