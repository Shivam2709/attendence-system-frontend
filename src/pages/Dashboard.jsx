import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useCallback } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // FETCH TASKS

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.log(err.response?.data);
    }
  }, []);

  // MARK ATTENDANCE

  const markAttendance = async () => {
    try {
      const { data } = await api.post("/attendance");
      alert(data.message);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  // CREATE TASK

  const createTask = async () => {
    if (!title) return;

    try {
      await api.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // START EDIT

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditingTitle(task.title);
  };

  // SAVE EDIT

  const saveEdit = async (taskId) => {
    try {
      await api.put(`/tasks/${taskId}`, {
        title: editingTitle,
      });

      setEditingId(null);
      setEditingTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // TOGGLE STATUS
  const toggleStatus = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";

    try {
      await api.put(`/tasks/${task._id}`, {
        status: newStatus,
      });

      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // LOAD ON START
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-2xl mx-auto">
        {/* Header + Attendance */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>

          <button
            onClick={markAttendance}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Mark Attendance
          </button>
        </div>

        {/* Create Task */}
        <h3 className="font-semibold mb-4">Create Task</h3>

        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 flex-1 rounded"
            placeholder="Task title"
          />
          <button
            onClick={createTask}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <h3 className="font-semibold mb-2">Your Tasks</h3>

        {tasks.length === 0 && <p className="text-gray-500">No tasks yet.</p>}

        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center border p-3 mb-2 rounded"
          >
            <div className="flex-1">
              {editingId === task._id ? (
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="border p-1 rounded w-full"
                />
              ) : (
                <span>
                  {task.title} -{" "}
                  <span
                    className={
                      task.status === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {task.status}
                  </span>
                </span>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              {/* Toggle */}
              <button
                onClick={() => toggleStatus(task)}
                className="bg-gray-800 text-white px-3 py-1 rounded"
              >
                Toggle
              </button>

              {/* Edit */}
              {editingId === task._id ? (
                <button
                  onClick={() => saveEdit(task._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(task)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}

              {/* Delete */}
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
