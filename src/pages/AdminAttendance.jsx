import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const AdminAttendance = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const { data } = await api.get("/admin/attendance/today");
        setRecords(data);
      } catch (err) {
        toast.error("Access denied");
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Today's Attendance</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec._id}>
              <td className="border p-2">{rec.user.name}</td>
              <td className="border p-2">{rec.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAttendance;
