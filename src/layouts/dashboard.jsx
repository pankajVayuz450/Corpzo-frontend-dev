// Dashboard.jsx
import { Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Sidenav, DashboardNavbar, Configurator, Footer } from "@/widgets/layout";
import dashboardRoutes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { toast } from "react-toastify";
import { handleOtp, handleSignOut, resenOtp } from "@/redux/admin/slices/adminSlice";
import { useDispatch } from "react-redux";
import { Spinner } from "@material-tailwind/react";
import { Suspense } from "react";
import TopBarProgress from "react-topbar-progress-indicator"
export function Dashboard() {
  
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const dispatchRedux = useDispatch()
  const dashboardsRoutes = dashboardRoutes.find(route => route.path === "/dashboard").children;
  const filteredRoutes = dashboardsRoutes.filter(route => route.showInSidebar);

  const SignOut = () => { 
    dispatchRedux(handleOtp(false))
    dispatchRedux(resenOtp())

    navigate("/auth/sign-in");
     toast.success('You have been logged out.');
  };

  TopBarProgress.config({
    barColors: {
      "0": "#2294B1",
      "1.0": "#2294B1"
    },
    shadowBlur: 5
  });

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={filteredRoutes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-6 xl:ml-80">
        <DashboardNavbar onSignOut={SignOut} />
        <Suspense fallback={<TopBarProgress/>}>
        <Outlet /> 
        </Suspense>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
