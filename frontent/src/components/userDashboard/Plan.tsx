import { useEffect, useState } from "react";
import "../../styles/Plan.css";
import { purchasedPlanService } from "../../services/API";

const Plan = () => {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    fetchPurchasedPlans();
  }, []);

  const fetchPurchasedPlans = async () => {
    try {
      const res = await purchasedPlanService();

      console.log(res.result);

      setPlans(res.result || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="purchase-plan-page">
      <h2 className="purchase-plan-heading">
        Purchased Plan
      </h2>

      <div className="plans-grid">
        {plans.length > 0 ? (
          plans.map((plan: any) => {
            const finalPrice =
              plan.mp_price -
              (plan.mp_price * plan.mp_offer) / 100;

            return (
              <div
                className={`plan-card ${
                  plan.mp_is_res === 1 ? "featured" : ""
                }`}
                key={plan.plan_id}
              >
                {plan.mp_is_res === 1 && (
                  <div className="recommended-badge">
                    Recommended
                  </div>
                )}

                <div className="plan-price">
                  ₹{plan.mp_price}
                </div>

                <div className="plan-name">
                  {plan.mp_name}
                </div>

                <div className="plan-discount">
                  Total after {plan.mp_offer}% off ₹
                  {finalPrice}
                </div>

                <button
                  className="purchase-btn"
                  disabled
                >
                  Purchased
                </button>

                <ul className="features-list">
                  <li>
                    <span className="check-icon">
                      ✓
                    </span>

                    <span>
                      <strong>
                        {plan.mp_credit} Credits
                      </strong>
                    </span>
                  </li>

                  <li>
                    <span className="check-icon">
                      ✓
                    </span>

                    <span>
                      ₹
                      {Math.round(
                        plan.mp_price /
                          plan.mp_credit
                      )}{" "}
                      per credit
                    </span>
                  </li>

                  <li>
                    <span className="check-icon">
                      ✓
                    </span>

                    <span>
                      Valid for{" "}
                      <strong>
                        {plan.mp_duration} days
                      </strong>
                    </span>
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <div className="no-plan">
            No Purchased Plan Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;