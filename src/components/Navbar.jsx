import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { logout, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white px-6 py-4">
      <h2 className="text-lg font-semibold">Mini Attendance System</h2>

      <div className="flex items-center gap-4">
        {/* Show Admin Button Only If Admin */}
        {role === "admin" && (
          <Link
            to="/admin"
            className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Admin Panel
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
