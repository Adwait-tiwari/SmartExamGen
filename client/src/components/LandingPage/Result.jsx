import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import AuthContext from "../../context/AuthContext";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ResultDashboard = () => {
  const { user } = useContext(AuthContext);
  const [scores, setScores] = useState([]);

  useEffect(() => {
     console.log("User in context:", user);
    const fetchScores = async () => {
      try {
        if (!user?._id) return;
        const res = await axios.get(`http://localhost:5000/api/scores/user/${user._id}`);
        console.log("API Response:", res.data);
        const data = res.data;

        // ✅ Ensure data is an array
        if (Array.isArray(data)) {
          setScores(data);
        } else if (Array.isArray(data?.scores)) {
          setScores(data.scores);
        } else {
          setScores([]);
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
        setScores([]);
      }
    };
    fetchScores();
  }, [user]);

  if (!user) return <div className="text-center text-gray-500 py-10">Loading user info...</div>;
  if (!Array.isArray(scores)) return <div className="text-center text-red-500">Invalid scores data</div>;

  const subjects = [...new Set(scores.map((s) => s.subject))];

  const latestScores = subjects.map((subject) => {
    const subjectScores = scores.filter((s) => s.subject === subject);
    return subjectScores[subjectScores.length - 1];
  });

  const barData = {
    labels: subjects,
    datasets: [
      {
        label: "Latest Score",
        data: latestScores.map((s) => s?.score || 0),
        backgroundColor: "rgba(99, 102, 241, 0.7)", // Indigo
        borderRadius: 6,
      },
    ],
  };

  const lineData = {
    labels: scores.map((s) =>
      new Date(s.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    ),
    datasets: subjects.map((subject, idx) => ({
      label: subject,
      data: scores.filter((s) => s.subject === subject).map((s) => s.score),
      borderColor: `hsl(${idx * 60}, 70%, 50%)`,
      backgroundColor: `hsla(${idx * 60}, 70%, 80%, 0.2)`,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        {/* User Header */}
        <div className="flex items-center mb-6">
          {user.picture && (
            <img
              src={user.picture}
              alt="Profile"
              className="w-16 h-16 rounded-full shadow-md object-cover border-2 border-indigo-500"
            />
          )}
          <div className="ml-4">
            <h2 className="text-2xl font-semibold text-indigo-700">{user.username}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        {scores.length === 0 ? (
          <div className="text-center text-gray-500">No scores available yet.</div>
        ) : (
          <>
            {/* Bar Chart */}
            <div className="bg-indigo-50 rounded-xl p-4 shadow mb-6 transition hover:shadow-lg">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                📊 Subject-wise Latest Scores
              </h3>
              <Bar data={barData} />
            </div>

            {/* Line Chart */}
            <div className="bg-emerald-50 rounded-xl p-4 shadow transition hover:shadow-lg">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                📈 Score Progress Over Time
              </h3>
              <Line data={lineData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultDashboard;
