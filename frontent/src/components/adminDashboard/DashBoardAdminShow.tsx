import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FiUsers,
  FiBook,
  FiLayout,
  FiActivity,
} from "react-icons/fi";
import { getDashboardStats } from "../../services/API";
import "../../styles/dashboardadminshow.css";

const DashBoardAdminShow = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        if (res?.success) {
          setStats(res.result);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid py-5 text-center">
        <h4>Loading Dashboard...</h4>
      </div>
    );
  }

  const dashboardCards = [
    {
      title: "Total Users",
      value: stats?.users?.total || 0,
      icon: <FiUsers />,
      color: "linear-gradient(135deg, #00b09b, #96c93d)",
    },
    {
      title: "Active Users",
      value: stats?.users?.active || 0,
      icon: <FiActivity />,
      color: "linear-gradient(135deg, #8e2de2, #4a00e0)",
    },
    {
      title: "Total Plans",
      value: stats?.plans?.total || 0,
      icon: <FiLayout />,
      color: "linear-gradient(135deg, #00c6ff, #0072ff)",
    },
    {
      title: "Active Plans",
      value: stats?.plans?.active || 0,
      icon: <FiActivity />,
      color: "linear-gradient(135deg, #f953c6, #b91d73)",
    },
    {
      title: "Total Courses",
      value: stats?.courses?.total || 0,
      icon: <FiBook />,
      color: "linear-gradient(135deg, #f12711, #f5af19)",
    },
    {
      title: "Active Courses",
      value: stats?.courses?.active || 0,
      icon: <FiActivity />,
      color: "linear-gradient(135deg, #11998e, #38ef7d)",
    },
  ];

  return (
    <div className="container-fluid py-4 px-4 dashboard-v2">
      {/* KPI Cards */}
      <div className="row g-4 mb-5">
        {dashboardCards.map((item, index) => (
          <div className="col-lg-4 col-md-6" key={index}>
            <div
              className="dashboard-kpi-card h-100"
              style={{ background: item.color }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="kpi-title mb-1 text-white opacity-75">
                    {item.title}
                  </p>

                  <h3 className="kpi-value text-white fw-bold m-0">
                    <CountUp end={item.value} duration={2} />
                  </h3>
                </div>

                <div className="kpi-icon-wrapper">{item.icon}</div>
              </div>

              <div className="mt-3 text-white opacity-50 small">
                {item.title.includes("Active")
                  ? "Real-time activity"
                  : "Total registered"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graph */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="form-section-card h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="m-0">Growth & Adoption Trends</h5>
            </div>

            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <AreaChart data={stats?.graphData || []}>
                  <defs>
                    <linearGradient
                      id="colorUsers"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#8884d8"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#8884d8"
                        stopOpacity={0}
                      />
                    </linearGradient>

                    <linearGradient
                      id="colorCourses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#82ca9d"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#82ca9d"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2a2a2a"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#666"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    stroke="#666"
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />

                  <Area
                    type="monotone"
                    dataKey="courses"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCourses)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-section-card h-100 p-4">
            <h5 className="mb-4">Activity Insights</h5>

            <div className="stats-summary-item mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span>User Activation Rate</span>

                <span>
                  {stats?.users?.total
                    ? Math.round(
                        (stats.users.active / stats.users.total) * 100
                      )
                    : 0}
                  %
                </span>
              </div>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${
                      stats?.users?.total
                        ? (stats.users.active / stats.users.total) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="stats-summary-item mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span>Course Availability</span>

                <span>
                  {stats?.courses?.total
                    ? Math.round(
                        (stats.courses.active /
                          stats.courses.total) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${
                      stats?.courses?.total
                        ? (stats.courses.active /
                            stats.courses.total) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="activity-placeholder p-4 text-center">
              <FiActivity size={40} />
              <p className="small mt-2">
                More insights coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdminShow;

