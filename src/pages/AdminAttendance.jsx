import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const AdminAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const { data } = await api.get("/admin/attendance/today");
        setRecords(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Access denied");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Today's Attendance
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              List of employees who marked attendance today
            </p>
          </div>

          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
            {records.length} Present
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading attendance...
            </div>
          ) : records.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-500 text-lg">
                No attendance marked today.
              </p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {records.map((rec) => (
                  <tr
                    key={rec._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {rec.user?.name}
                    </td>
                    <td className="p-4 text-gray-600">{rec.user?.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
