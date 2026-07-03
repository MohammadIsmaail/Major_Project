import { useEffect, useState } from "react";
import { FaCoins, FaBookOpen, FaLayerGroup, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/DashboardUser.css";
import { getUserDashboardService } from "../../services/API";

interface PurchasedPlan {
  mp_name?: string;
  mp_credit?: number;
  plan_created_at?: string;
  [key: string]: any; // raw query se aane wale extra columns ke liye
}

interface DashboardData {
  userName: string;
  credit: number;
  purchasedPlans: PurchasedPlan[];
  availableCoursesCount: number;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "Still going strong,";
  if (hour < 12) return "Good morning,";
  if (hour < 17) return "Good afternoon,";
  if (hour < 21) return "Good evening,";
  return "Burning the midnight oil,";
};

const DashboardUser = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await getUserDashboardService();
        setData({
          userName: res.result.userName,
          credit: res.result.credit,
          purchasedPlans: res.result.purchasedPlans || [],
          availableCoursesCount: res.result.availableCoursesCount || 0,
        });
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError(true);
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid user-dashboard py-4">
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container-fluid user-dashboard py-4">
        <div className="empty-state">
          <p>Couldn't load your dashboard. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  const { userName, credit, purchasedPlans, availableCoursesCount } = data;

  return (
    <div className="container-fluid user-dashboard py-4">
      {/* Welcome Section */}
      <div className="welcome-card mb-4">
        <div className="welcome-text">
          <p className="greeting-eyebrow">{getGreeting()}</p>
          <h2>{userName} 👋</h2>
          <p className="welcome-sub">Here's what's happening with your account.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid mb-4">
        <div className="user-stat-card">
          <FaCoins className="stat-icon" />
          <h3>{credit}</h3>
          <p>Available Credits</p>
        </div>

        <div className="user-stat-card">
          <FaLayerGroup className="stat-icon" />
          <h3>{purchasedPlans.length}</h3>
          <p>Plans Purchased</p>
        </div>

        <div className="user-stat-card">
          <FaBookOpen className="stat-icon" />
          <h3>{availableCoursesCount}</h3>
          <p>Courses Available</p>
        </div>
      </div>

      {/* Purchased Plans */}
      <div className="dashboard-section">
        <div className="section-header">
          <h4>My Plans</h4>
        </div>

        {purchasedPlans.length === 0 ? (
          <div className="empty-state">
            <p>You haven't purchased any plan yet.</p>
            <button className="continue-btn cta-btn" onClick={() => navigate("/Purchase_Plan")}>
  Browse Plans <FaArrowRight />
</button>
          </div>
        ) : (
          <div className="courses-grid">
            {purchasedPlans.map((p, idx) => (
              <div className="course-card" key={idx}>
                <div>
                  <span className="course-tag">Plan</span>
                  <h5>{p.mp_name || "Plan"}</h5>
                  <small>{p.mp_credit ? `${p.mp_credit} credits included` : ""}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explore Courses CTA */}
      <div className="dashboard-section mt-4">
        <div className="section-header">
          <h4>Explore Courses</h4>
        </div>
        <p style={{ color: "var(--muted)", marginBottom: 16 }}>
          {availableCoursesCount} courses available. Use your credits to unlock and start learning.
        </p>
        <button className="continue-btn" style={{ maxWidth: 220 }} onClick={() => navigate("/View_Course")}>
          Browse Courses <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default DashboardUser;