import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../styles/ManageUserAdmin.css"; // 👈 apna actual CSS path daalo
import {
  getAllUsersService,
  deleteUserService,
  toggleUserStatusService,
} from "../../services/API";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  credit?: number;
  isActive?: boolean;
  created_at?: string;
  avatar?: string;
}

const ManageUserAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsersService();
      setUsers(res.result || []);
    } catch (err) {
      console.error("Failed to load users:", err);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(`Delete user "${name}"? This cannot be undone.`);
    if (!confirmed) return;

    setActionLoadingId(id);
    try {
      await deleteUserService(id);
      toast.success("User deleted successfully.");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error("Failed to delete user.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleStatus = async (id: number) => {
    setActionLoadingId(id);
    try {
      const res = await toggleUserStatusService(id);
      const newStatus = res.result.isActive;
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isActive: newStatus } : u))
      );
      toast.success(`User ${newStatus ? "activated" : "deactivated"} successfully.`);
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update user status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const getInitialsAvatar = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "U")}&background=2563eb&color=fff&bold=true`;

  return (
    <div className="manage-users-page">
      <div className="page-header">
        <h2>Manage Users</h2>
        <p>{loading ? "Loading users..." : `${users.length} registered users`}</p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
          No users found.
        </div>
      ) : (
        <div className="user-grid">
          {users.map((u) => (
            <div className="user-card" key={u.id}>
              <div className="user-header">
                <img
                  src={u.avatar || getInitialsAvatar(u.name)}
                  alt={u.name}
                  className="user-avatar"
                />
                <div className="user-basic">
                  <h3>{u.name}</h3>
                  <p>{u.email}</p>
                  <span className={u.isActive ? "active-badge" : "inactive-badge"}>
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="user-details">
                <div className="detail-box">
                  <strong>Phone</strong>
                  <span>{u.phone || "—"}</span>
                </div>
                <div className="detail-box">
                  <strong>Credits</strong>
                  <span>{u.credit ?? 0}</span>
                </div>
                <div className="detail-box">
                  <strong>Joined</strong>
                  <span>{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</span>
                </div>
                <div className="detail-box">
                  <strong>User ID</strong>
                  <span>#{u.id}</span>
                </div>
              </div>

              <div className="user-actions">
                <button
                  className="status-btn"
                  onClick={() => handleToggleStatus(u.id)}
                  disabled={actionLoadingId === u.id}
                  style={{ background: u.isActive ? "#dc2626" : "#16a34a" }}
                >
                  {actionLoadingId === u.id ? "..." : u.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(u.id, u.name)}
                  disabled={actionLoadingId === u.id}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUserAdmin;