import "../../styles/Purchase_Plan.css";

const plans = [
  {
    id: 1,
    name: "Basic",
    price: 120,
    credits: 10,
    popular: false,
  },
  {
    id: 2,
    name: "Premium",
    price: 160,
    credits: 15,
    popular: true,
  },
  {
    id: 3,
    name: "2X Premium",
    price: 350,
    credits: 20,
    popular: false,
  },
];

const Purchase_Plan = () => {
  return (
    <div className="purchase-page">
      <div className="purchase-hero">
        <h1>Purchase Credits</h1>

        <p>
          Unlock premium courses, certificates and
          exclusive learning resources.
        </p>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`pricing-card ${
              plan.popular ? "featured-card" : ""
            }`}
          >
            {plan.popular && (
              <div className="popular-badge">
                🔥 MOST POPULAR
              </div>
            )}

            <div className="plan-name">
              {plan.name}
            </div>

            <div className="price">
              ₹{plan.price}
            </div>

            <div className="credit-box">
              🔥 {plan.credits} Credits Included
            </div>

            <div className="features">
              <div>✓ Full Course Access</div>
              <div>✓ Certificates</div>
              <div>✓ Premium Resources</div>
              <div>✓ 28 Days Validity</div>
            </div>

            <button className="purchase-btn">
              Purchase Now →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase_Plan;