import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "./components";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with bg-primary */}
      <div className="bg-primary">
        <div className="container m mx-auto px-4 py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Tài khoản của tôi
          </h1>
          <p className="text-white/80 text-sm lg:text-base">
            Quản lý thông tin cá nhân và hoạt động của bạn
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
