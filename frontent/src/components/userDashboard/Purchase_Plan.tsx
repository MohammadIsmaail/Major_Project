import "../../styles/Purchase_Plan.css";

const plans = [
  {
    id: 1,
    price: "₹120",
    name: "Basic",
    discount: "Total after 20% off ₹96",
    credits: 10,
    perCredit: "₹12 per credit",
    validity: "28 days",
    recommended: false,
  },
  {
    id: 2,
    price: "₹160",
    name: "Premium",
    discount: "Total after 10% off ₹144",
    credits: 15,
    perCredit: "₹11 per credit",
    validity: "28 days",
    recommended: true,
  },
  {
    id: 3,
    price: "₹350",
    name: "2 X Premium",
    discount: "Total after 5% off ₹333",
    credits: 20,
    perCredit: "₹18 per credit",
    validity: "28 days",
    recommended: false,
  },
];

const Purchase_Plan = () => {
  return (
    <div className="purchase-plan-page">
      <h2 className="purchase-plan-heading">Purchase Plan</h2>
      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`plan-card ${plan.recommended ? "featured" : ""}`}>
            {plan.recommended && <div className="recommended-badge">Recommended</div>}
            <div className="plan-price">{plan.price}</div>
            <div className="plan-name">{plan.name}</div>
            <div className="plan-discount">{plan.discount}</div>
            <button className="purchase-btn">Purchase Plan</button>
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