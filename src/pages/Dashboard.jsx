import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/auth/authSlice";
import DashboardHeader from "@/components/DashboardHeader";
import QuickActions from "@/components/QuickActions";
import RecentProjects from "@/components/RecentProjects";
import Stats from "@/components/Stats";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const recentProjects = [
    {
      id: 1,
      name: "Spanish vlog.mp4",
      status: "completed",
      language: "Spanish → Telugu",
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "AI based Projects Ideas  .mp4",
      status: "processing",
      language: "English → Telugu",
      date: "1 day ago",
    },
    {
      id: 3,
      name: "Presentation.mp4",
      status: "completed",
      language: "English → French",
      date: "3 days ago",
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuickActions />
        <RecentProjects projects={recentProjects} />
        <Stats />
      </div>
    </div>
  );
};

export default Dashboard;
