import ManageUserAdmin from "./ManageUserAdmin";
import "../../styles/ManageUserAdmin.css";

const users = [
  {
    id: 1,
    name: "Mohammad Ismaail",
    email: "ismaail@gmail.com",
    mobile: "9876543210",
    address: "Lucknow, Uttar Pradesh",
    credit: "120",
    status: 1,
    profile: "https://i.pravatar.cc/300?img=1",
    createdAt: "12 Jun 2026",
  },
  {
    id: 2,
    name: "Aman Singh",
    email: "aman@gmail.com",
    mobile: "9876543211",
    address: "Kanpur, Uttar Pradesh",
    credit: "80",
    status: 0,
    profile: "https://i.pravatar.cc/300?img=2",
    createdAt: "15 Jun 2026",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul@gmail.com",
    mobile: "9876543212",
    address: "Delhi",
    credit: "250",
    status: 1,
    profile: "https://i.pravatar.cc/300?img=3",
    createdAt: "18 Jun 2026",
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    mobile: "9876543213",
    address: "Noida",
    credit: "60",
    status: 1,
    profile: "https://i.pravatar.cc/300?img=4",
    createdAt: "20 Jun 2026",
  },
  {
    id: 5,
    name: "Rohit Kumar",
    email: "rohit@gmail.com",
    mobile: "9876543214",
    address: "Varanasi",
    credit: "190",
    status: 0,
    profile: "https://i.pravatar.cc/300?img=5",
    createdAt: "22 Jun 2026",
  },
  {
    id: 6,
    name: "Anjali Gupta",
    email: "anjali@gmail.com",
    mobile: "9876543215",
    address: "Prayagraj",
    credit: "340",
    status: 1,
    profile: "https://i.pravatar.cc/300?img=6",
    createdAt: "25 Jun 2026",
  },
];

const ManageUsersPage = () => {
  const handleEdit = (id: number) => {
    console.log("Edit User:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete User:", id);
  };

  const handleStatus = (id: number, status: number) => {
    console.log("Status Change:", id, status);
  };

  return (
    <div className="manage-users-page">
      <div className="page-header">
        <h2>Manage Users</h2>
        <p>Total Users: {users.length}</p>
      </div>

      <div className="user-grid">
        {users.map((user, index) => (
          <ManageUserAdmin
            key={user.id}
            {...user}
            index={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageUsersPage;