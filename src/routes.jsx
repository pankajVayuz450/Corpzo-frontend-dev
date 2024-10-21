// routes.js
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { lazy } from "react";
import { Home, Profile, MasterSettings } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import SignOut from "@/pages/auth/admin/sign-out";
const Form = lazy(()=>import('./pages/dashboard/admin/form'))
import AddQuestionsPage from "./pages/dashboard/admin/addquestionpage";
import FormCreationPage from "./pages/dashboard/admin/formCreationPage";
import DropDownDetailPage from "./pages/dashboard/admin/MastersSettings/dropdowndetailpage";
import EditModal from "./components/admin/EditModal";
import CreateItemPage from "./pages/dashboard/admin/createitempage";
import DynamicForm from "./pages/dashboard/admin/dynamicForm";
import DeleteFormPage from "./components/admin/DeleteForm";
import CreateFormPage from "./pages/dashboard/admin/demo-page";
import PreviewFormPage from "./pages/dashboard/admin/previewFormPage";
import { Dashboard } from "@/layouts/dashboard";
import { Navigate } from "react-router-dom";
import SignUp from "./pages/auth/sign-up";
import ProtectedRoute from "./wrappers/ProtectedRoute";
import SubAdminManagement from "./pages/dashboard/admin/SubAdminManagement/subadminmanagement";
import SubadminPage from "./pages/dashboard/admin/SubAdminManagement/createSubAdmin";
import { element } from "prop-types";
import CouponForm from "./pages/dashboard/admin/CouponManagement/CreateCoupon";
import CouponList from "./pages/dashboard/admin/CouponManagement/coupounManagement";
import UserManagement from "./pages/dashboard/admin/UserManagement/index";
import CreateUser from "./pages/dashboard/admin/UserManagement/CreateUser";
import ElementsPage from "./pages/dashboard/admin/MastersSettings/Elements/index";
import AttributesPage from "./pages/dashboard/admin/MastersSettings/Attributes";
import ValidFormElementAttributesPage from "./pages/dashboard/admin/MastersSettings/Valid Form Attributes";
import RegexElements from "./pages/dashboard/admin/MastersSettings/Regex";
import CreateRegex from "./pages/dashboard/admin/MastersSettings/Regex/createRegex";
import Category from "./pages/dashboard/admin/MastersSettings/Category";
import AddCategory from "./pages/dashboard/admin/MastersSettings/Category/AddCategory";
import SubCategory from "./pages/dashboard/admin/MastersSettings/SubCategory"
import AddSubCategory from "./pages/dashboard/admin/MastersSettings/SubCategory/AddSubCategory";
import Cms from "./pages/dashboard/admin/CMS";
import AddContent from "./pages/dashboard/admin/CMS/AddContent";
import Department from "./pages/dashboard/admin/MastersSettings/Department";
import AddDepartment from "./pages/dashboard/admin/MastersSettings/Department/AddDepartment";
import ViewUser from "./pages/dashboard/admin/UserManagement/ViewUser";
import ViewAllBusiness from "./pages/dashboard/admin/UserManagement/ViewAllBusiness";
import InvestorManagement from "./pages/dashboard/admin/InvestorManagement";
import ViewInvestor from "./pages/dashboard/admin/InvestorManagement/ViewInvestor";
import Offer from "./pages/dashboard/admin/Offer";
import CreateOffer from "./pages/dashboard/admin/Offer/CreateOffer";
import BannerManagement from "./pages/dashboard/admin/BannerManagement";
import CreateBanner from "./pages/dashboard/admin/BannerManagement/CreateBanner";
import ApplicationManagement from "./pages/dashboard/admin/ApplicationManagement";
import CreateApplication from "./pages/dashboard/admin/ApplicationManagement/CreateApplication";
import TeamNote from "./pages/dashboard/admin/ApplicationManagement/TeamNote";
import AddTeamNote from "./pages/dashboard/admin/ApplicationManagement/AddTeamNote";
import Faq from "./pages/dashboard/admin/FAQ";
import CreateFaq from "./pages/dashboard/admin/FAQ/CreateFaq";
import DocumentManagement from "./pages/dashboard/admin/DocumentManagement";
import ParntnerShipReistration from "./pages/dashboard/admin/DocumentManagement/PartnershipRegistration";
import CreateInvestor from "./pages/dashboard/admin/InvestorManagement/CreateInvestor";
import RedirectToDashboard from "./components/RoutingComponent/RedirectToDashboard";
import NoNetwork from "./pages/NoNetwork/NoNetwork";
import ViewFaq from "./pages/dashboard/admin/FAQ/ViewFaq";
import ServiceSteps from "./pages/dashboard/admin/StepManagement";
import CreateSteps from "./pages/dashboard/admin/StepManagement/CreateSteps";
import Subscriptions from "./pages/dashboard/admin/Subscriptions";
import AddSubscriptions from "./pages/dashboard/admin/Subscriptions/AddSubscriptions"
import Service from "./pages/dashboard/admin/Services";
import ServiceForm from "./pages/dashboard/admin/Services/ServiceForm";
import ServiceFaqs from "./pages/dashboard/admin/FAQ/ServiceFAQs";
import ValidFormElementPage from "./pages/dashboard/admin/MastersSettings/Valid Form Elements";
import AddElement from "./pages/dashboard/admin/MastersSettings/Valid Form Elements/AddElement";
import Add from "./pages/dashboard/admin/MastersSettings/Valid Form Attributes/Add";
import AddFormElement from "./pages/dashboard/admin/MastersSettings/Elements/AddFormElement";
import AddAttribute from "./pages/dashboard/admin/MastersSettings/Attributes/AddAttribute";
import VideoIntro from "./pages/dashboard/admin/VideoIntro";
import UpdateVideo from "./pages/dashboard/admin/VideoIntro/UpdateVideo";
import ViewDocument from "./pages/dashboard/admin/DocumentManagement/ViewDocument";
import AddNote from "./pages/dashboard/admin/ApplicationManagement/AddNote";

const icon = {
  className: "w-5 h-5 text-inherit",
};

  const role = localStorage.getItem('userRole');
 
  

const adminRoutes = [
  {
    path: "admin/home",
    name: "Home",
    element: <Home />,
    showInSidebar: true,
    icon: <HomeIcon {...icon} />,
  },
  {
    path: "admin/formManagement",
    element: <Form />,
    name: "Forms",
    showInSidebar: true,
    icon: <TableCellsIcon {...icon} />,
  },
  {
    path: "admin/formManagement/create-form",
    element: <FormCreationPage />,
    showInSidebar: false,
  },
  {
    path: "admin/formManagement/edit-form",
    element: <FormCreationPage />,
    showInSidebar: false,
  },
  {
    path: "admin/formManagement/delete-form",
    element: <DeleteFormPage />,
    showInSidebar: false,
  },
  {
    path: "admin/formManagement/create-page-2",
    element: <CreateFormPage />,
    showInSidebar: false,
  },
  {
    path: "admin/preview-form/:id",
    element: <PreviewFormPage />,
    showInSidebar: false,
  },
  {
    path: "admin/formManagement/edit-fields/:id",
    element: <CreateFormPage />,
    showInSidebar: false,
  },
  {
    path: "admin/formManagement/dynamic-form",
    element: <DynamicForm />,
    showInSidebar: false,
  },

  {
    path: "admin/masterSettings/dropdowndetailpage/createItem",
    element: <CreateItemPage />,
    showInSidebar: false,
  },
  {
    path: "admin/masterSettings/dropdowndetailpage/editItem",
    element: <EditModal />,
    showInSidebar: false,
  },
  {
    path: "admin/formManagement/add-questions",
    element: <AddQuestionsPage />,
    showInSidebar: false,
  },
  
  {
    path: "admin/masterSettings/dropdowndetailpage",
    element: <DropDownDetailPage />,
    showInSidebar: false,
  },
  {
    path: "admin/masterSettings/elements",
    element: <ElementsPage/>
  },
  {
    path: "admin/masterSettings/formElement/create",
    element: <AddFormElement/>
  },
  {
    path:"admin/masterSettings/attributes",
    element:<AttributesPage/>
  },
  {
    path:"admin/masterSettings/attributes/create",
    element:<AddAttribute/>
  },
  {
    path:"admin/masterSettings/attributes/edit/:id",
    element:<AddAttribute isEdit={true}/>
  }
  ,
  {
    path:"admin/masterSettings/validFormElement",
    element:<ValidFormElementPage/>
  },
  {
    path:"admin/masterSettings/validFormElement/create",
    element:<AddElement/>
  },
  {
    path:"admin/masterSettings/validAttributes",
    element:<ValidFormElementAttributesPage/>
  },
  {
    path:"admin/masterSettings/ValidAttributes/create",
    element:<Add/>
  },
  {
    path:"admin/masterSettings/ValidAttributes/edit/:id",
    element:<Add isEdit={true}/>
  },
  {
    path:"admin/masterSettings/regex",
    element:<RegexElements/>
  },
  {
    path:"admin/masterSettings/regex/create",
    element:<CreateRegex/>

  },
  {
    path:"admin/masterSettings/regex/edit/:id",
    element:<CreateRegex isEdit={true}/>
  },
  {
    path:"admin/masterSettings/Category",
    element:<Category/>
  },
  {
    path:"admin/masterSettings/Category/add-category",
    element:<AddCategory/>
  },
  {
    path:"admin/masterSettings/Category/edit-category/:id",
    element:<AddCategory/>
  },
  {
    path:"admin/masterSettings/Sub-Category",
    element:<SubCategory/>
  },
  {
    path:"admin/masterSettings/Sub-Category/add-sub-category",
    element:<AddSubCategory/>
  },
  {
    path:"admin/masterSettings/Sub-Category/edit-sub-category/:id",
    element:<AddSubCategory/>
  },
  {
    path:"admin/masterSettings/Department",
    element:<Department/>
  },
  {
    path:"admin/masterSettings/Department/add-department",
    element:<AddDepartment/>
  },
  {
    path:"admin/masterSettings/Department/edit-department/:id",
    element:<AddDepartment/>
  },
  {
    path:"admin/offer",
    element:<Offer/>
  },
  {
    path:"admin/add-offer",
    element:<CreateOffer/>
  },
  {
    path:"admin/edit-offer/:id",
    element:<CreateOffer/>
  },
  {
    path:"admin/banner-management",
    element:<BannerManagement/>
  },
  {
    path:"admin/add-banner",
    element:<CreateBanner/>
  },
  {
    path:"admin/edit-banner/:id",
    element:<CreateBanner/>
  },
  {
    path:"admin/application-management",
    element:<ApplicationManagement/>
  },
  {
    path:"admin/add-application",
    element:<CreateApplication/>
  },
  {
    path:"admin/edit-application/:id",
    element:<CreateApplication/>
  },
  {
    path:"admin/team-history",
    element:<TeamNote/>
  },
  {
    path:"admin/team-note/create-note",
    element:<AddNote/>
  },
  {
    path:"admin/FAQ/",
    element:<Faq/>
  },
  {
    path:"admin/Service-FAQs/:serviceId",
    element:<ServiceFaqs/>
  },
  {
    path:"admin/FAQ/create-faq",
    element:<CreateFaq/>
  },
  {
    path:"admin/FAQ/edit-faq/:id",
    element:<CreateFaq/>
  },
  {
    path:"admin/FAQ/view-faq/:id",
    element:<ViewFaq/>
  },
  {
    path:"admin/steps/:serviceId",
    element : <ServiceSteps/>
  },
  {
    path:"admin/steps/create-steps/:serviceId",
    element : <CreateSteps/>
  },
  {
    path:"admin/steps/edit-step/:serviceId/:id",
    element : <CreateSteps/>
  },
  {
    path:"admin/subscriptions/:serviceId",
    element : <Subscriptions/>
  },
  {
    path:"admin/subscriptions/create-subscription/:serviceId",
    element : <AddSubscriptions/>
  },
  {
    path:"admin/subscriptions/edit-subscription/:serviceId/:id",
    element : <AddSubscriptions/>
  },
  {
    path:"admin/service",
    element : <Service/>
  },
  {
    path:"admin/services/create-service",
    element : <ServiceForm/>
  },
  {
    path:"admin/services/update-service/:id",
    element : <ServiceForm/>
  },
  {
    path:"admin/services/edit-service/:id",
    element : <AddSubscriptions/>
  },
  {
    path:"admin/video-intro",
    element:<VideoIntro/>
  },
  {
    path:"admin/VideoIntro/update-video/:id",
    element:<UpdateVideo/>
  },
  {
    icon: <ServerStackIcon {...icon} />,
    path:"admin/submadminmanagemnt",
    name:"Sub Admin Management",
    element:<SubAdminManagement/>,
    showInSidebar:true,
  },
  {
    path:"admin/submadminmanagemnt/create-subadmin",
    name:"Create Sub Admin",
    element:<SubadminPage/>,
    showInSidebar:false,

  },
  {
    path:"admin/submadminmanagemnt/edit-subadmin/:id",
    name:"Create Sub Admin",
    element:<SubadminPage/>,
    showInSidebar:false,

  },
 
  {
    icon: <RectangleStackIcon {...icon} />,
    path:"admin/coupounmanagement",
    name:"Coupoun Management",
    element:<CouponList/>,
    showInSidebar:true,
  }
  ,{
    path: "admin/couponmanagement/create-coupon",
    name: "Create Coupon",
    element: <CouponForm/>,

  }
  ,{
    path: "admin/couponmanagement/edit-coupon/:id",
    name: "Edit Coupon",
    element: <CouponForm/>,
  }
  ,{
    path: "admin/usermanagement",
    name: "User Management",
    element: <UserManagement />,
    showInSidebar: true,
    icon: <InformationCircleIcon {...icon} />,
  }
  ,
  {
    path: "admin/usermanagement/create-user",
    name: "Create User",
    element: <CreateUser />,
    showInSidebar: false,
  }
  ,
  {
    path: "admin/usermanagement/edit-user/:id",
    name: "Edit User",
    element: <CreateUser />,
    showInSidebar: false,
  },
  {
    path: "admin/usermanagement/view-user/:id",
    name: "View User",
    element: <ViewUser />,
    showInSidebar: false,
  },
  {
    path: "admin/usermanagement/view-all-business",
    name: "View All Business",
    element: <ViewAllBusiness />,
    showInSidebar: false,
  }
  ,{
    path: "admin/profile",
    element: <Profile />,
    name: "Profile",  
    showInSidebar: true,
    icon: <UserCircleIcon {...icon} />,
  },
  {
    path: "admin/masterSettings",
    name: "Master Settings",
    element: <MasterSettings />,
    showInSidebar: true,
    icon: <Cog6ToothIcon {...icon} />,
  },
  {
    path: "admin/CMS",
    name: "CMS",
    element: <Cms />,
    showInSidebar: true,
    icon: <Cog6ToothIcon {...icon} />,
  },
  {
    path:"admin/CMS/add-content",
    element:<AddContent/>
  }, 
  {
    path: "admin/investor-management", 
    element:<InvestorManagement/>
  },
  {
    path: "admin/investor-management/view/:id", 
    element:<ViewInvestor/>
  }, 
  {
    path: "admin/investor-management/add-investor", 
    element:<CreateInvestor/>
  }, 
  {
    path : "admin/document-management", 
    element : <DocumentManagement/>
  },
  {
    path : "admin/document-management/view-document", 
    element : <ViewDocument/>
  },
  {
    path : "admin/document-management/partnership-firm-registration", 
    element : <ParntnerShipReistration/>
  }
];

const userRoutes = [
  {
    path: "user/home",
    name: "Home",
    element: <Home />,
    showInSidebar: true,
    icon: <HomeIcon {...icon} />,
  },
  {
    path: "user/forms",
    name: "Forms",
    element: <div>Forms</div>,
    showInSidebar: true,
    icon: <TableCellsIcon {...icon} />,
  },
  {
    path: "user/profile",
    name: "Profile",
    element: <Profile />,
    showInSidebar: true,
    icon: <UserCircleIcon {...icon} />,
  },
];

const authRoutes = [
  {
    path: "/sign-out",
    element: <SignOut />,
    showInSidebar:true,
    name: "Sign Out",
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  }
];


const routes = [
  {
    path: "/",
    element: <Dashboard />,
    // element: <Dashboard/>,
    children: adminRoutes,
  }
  ,
  {
    path: "/dashboard",
    element: <Dashboard />,
    // element: <Dashboard/>,
    children: adminRoutes,
  },
  ...authRoutes,
  {
    path: "/not-authorized",
    element: <div>Not Authorized</div>,
  },
  {
    path : "/no-network",
    element : <NoNetwork/>
  }
];


export default routes;
 