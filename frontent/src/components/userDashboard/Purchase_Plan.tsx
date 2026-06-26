import { useEffect, useState } from "react";
import "../../styles/Purchase_Plan.css";
import { getUserPlans, purchasePlanService } from "../../services/API";
import { toast, Bounce } from "react-toastify";

const Purchase_Plan = () => {
  const [purchase_Plan, setPurchase_Plan] = useState<any[]>([]);

  const loadPlans = async () => {
    const result = await getUserPlans();
    setPurchase_Plan(result.result); // ya result.data, API response ke hisab se
  };

  useEffect(() => {
    loadPlans();
  }, []);


  const purchase_Data = async (planId: number) => {
    const result = await purchasePlanService(planId);
    if (result.success) {
      toast.success(`${result.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

    } else {
      toast.error(`${result.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
    console.log(result);
  };
  return (
    <div className="purchase-plan-page">
      <h2 className="purchase-plan-heading">Purchase Plan</h2>
      <div className="plans-grid">
        {purchase_Plan.map((plan) => (
          <div key={plan.id} className={`plan-card ${plan.recommended ? "featured" : ""}`}>
            {plan.recommended && <div className="recommended-badge">Recommended</div>}
            <div className="plan-price">{plan.price}</div>
            <div className="plan-name">{plan.name}</div>
            <div className="plan-discount">{plan.discount}</div>
            <button
              className="purchase-btn"
              onClick={() => purchase_Data(plan.id)}
            >
              Purchase Plan
            </button>
            <ul className="features-list">
              <li><span className="check-icon">✓</span><span><strong>{plan.credits} Credits</strong></span></li>
              <li><span className="check-icon">✓</span><span>{plan.perCredit}</span></li>
              <li><span className="check-icon">✓</span><span>Valid for <strong>{plan.validity}</strong></span></li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase_Plan;