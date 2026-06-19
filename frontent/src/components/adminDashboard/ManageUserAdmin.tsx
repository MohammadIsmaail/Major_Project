import "../../styles/ManageUserAdmin.css";

interface ManageUserAdminProps {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
  credit: string;
  status: number;
  profile: string;
  createdAt: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, status: number) => void;
}

const ManageUserAdmin = ({
  id,
  name,
  email,
  mobile,
  address,
  credit,
  status,
  profile,
  createdAt,
  onEdit,
  onDelete,
  onToggleStatus,
}: ManageUserAdminProps) => {
  return (
    <div className="user-card">
      <div className="user-header">
        <img src={profile} alt={name} className="user-avatar" />

        <div className="user-basic">
          <h3>{name}</h3>
          <p>{email}</p>

          <span
            className={
              status === 1 ? "active-badge" : "inactive-badge"
            }
          >
            {status === 1 ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="user-details">
        <div className="detail-box">
          <strong>📱 Mobile</strong>
          <span>{mobile}</span>
        </div>

        <div className="detail-box">
          <strong>💰 Credits</strong>
          <span>{credit}</span>
        </div>

        <div className="detail-box">
          <strong>📍 Address</strong>
          <span>{address}</span>
        </div>

        <div className="detail-box">
          <strong>📅 Joined</strong>
          <span>{createdAt}</span>
        </div>
      </div>

      <div className="user-actions">
        <button
          type="button"
          className="edit-btn"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>

        <button
          type="button"
          className="status-btn"
          onClick={() => onToggleStatus(id, status)}
        >
          {status === 1 ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
};

export default ManageUserAdmin;