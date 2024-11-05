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
import SubAdminManagement from "./pages/dashboard/admin/SubAdminManagement/subadminmanagement";
import SubadminPage from "./pages/dashboard/admin/SubAdminManagement/createSubAdmin";
import FolderDocuments from "./pages/dashboard/admin/DocumentManagement/DocumentFolders";
import ViewService from "./pages/dashboard/admin/Services/ViewService";
import ProtectedRoute from "./wrappers/ProtectedRoute";
import ViewTransactionDocument from "./pages/dashboard/admin/UserManagement/ViewTransactionDocument";
const Logo = lazy(()=> import("./pages/dashboard/admin/LogoModule"))
const CouponForm = lazy(() => import('./pages/dashboard/admin/CouponManagement/CreateCoupon'));
const CouponList = lazy(() => import('./pages/dashboard/admin/CouponManagement/coupounManagement'));
const UserManagement = lazy(() => import('./pages/dashboard/admin/UserManagement/index'));
const CreateUser = lazy(() => import('./pages/dashboard/admin/UserManagement/CreateUser'));
const ElementsPage = lazy(() => import('./pages/dashboard/admin/MastersSettings/Elements/index'));
const AttributesPage = lazy(() => import('./pages/dashboard/admin/MastersSettings/Attributes'));
const ValidFormElementAttributesPage = lazy(() => import('./pages/dashboard/admin/MastersSettings/Valid Form Attributes'));
const RegexElements = lazy(() => import('./pages/dashboard/admin/MastersSettings/Regex'));
const CreateRegex = lazy(() => import('./pages/dashboard/admin/MastersSettings/Regex/createRegex'));
const Category = lazy(() => import('./pages/dashboard/admin/MastersSettings/Category'));
const AddCategory = lazy(() => import('./pages/dashboard/admin/MastersSettings/Category/AddCategory'));
const SubCategory = lazy(() => import('./pages/dashboard/admin/MastersSettings/SubCategory'));
const AddSubCategory = lazy(() => import('./pages/dashboard/admin/MastersSettings/SubCategory/AddSubCategory'));
const Cms = lazy(() => import('./pages/dashboard/admin/CMS'));
const AddContent = lazy(() => import('./pages/dashboard/admin/CMS/AddContent'));
const Department = lazy(() => import('./pages/dashboard/admin/MastersSettings/Department'));
const AddDepartment = lazy(() => import('./pages/dashboard/admin/MastersSettings/Department/AddDepartment'));
const ViewUser = lazy(() => import('./pages/dashboard/admin/UserManagement/ViewUser'));
const ViewAllBusiness = lazy(() => import('./pages/dashboard/admin/UserManagement/ViewAllBusiness'));
const InvestorManagement = lazy(() => import('./pages/dashboard/admin/InvestorManagement'));
const ViewInvestor = lazy(() => import('./pages/dashboard/admin/InvestorManagement/ViewInvestor'));
const Offer = lazy(() => import('./pages/dashboard/admin/Offer'));
const CreateOffer = lazy(() => import("./pages/dashboard/admin/Offer/CreateOffer"));
const BannerManagement = lazy(() => import("./pages/dashboard/admin/BannerManagement"));
const CreateBanner = lazy(() => import("./pages/dashboard/admin/BannerManagement/CreateBanner"));
const ApplicationManagement = lazy(() => import("./pages/dashboard/admin/ApplicationManagement"));
const CreateApplication = lazy(() => import("./pages/dashboard/admin/ApplicationManagement/CreateApplication"));
const TeamNote = lazy(() => import("./pages/dashboard/admin/ApplicationManagement/TeamNote"));
const Faq = lazy(() => import("./pages/dashboard/admin/FAQ"));
const CreateFaq = lazy(() => import("./pages/dashboard/admin/FAQ/CreateFaq"));
const DocumentManagement = lazy(() => import("./pages/dashboard/admin/DocumentManagement"));
const ParntnerShipReistration = lazy(() => import("./pages/dashboard/admin/DocumentManagement/PartnershipRegistration"));
const CreateInvestor = lazy(() => import("./pages/dashboard/admin/InvestorManagement/CreateInvestor"));
const NoNetwork = lazy(() => import("./pages/NoNetwork/NoNetwork"));
const ViewFaq = lazy(() => import("./pages/dashboard/admin/FAQ/ViewFaq"));
const ServiceSteps = lazy(() => import("./pages/dashboard/admin/StepManagement"));
const CreateSteps = lazy(() => import("./pages/dashboard/admin/StepManagement/CreateSteps"));
const Subscriptions = lazy(() => import("./pages/dashboard/admin/Subscriptions"));
const AddSubscriptions = lazy(() => import("./pages/dashboard/admin/Subscriptions/AddSubscriptions"));
const Service = lazy(() => import("./pages/dashboard/admin/Services"));
const ServiceForm = lazy(() => import("./pages/dashboard/admin/Services/ServiceForm"));
const ServiceFaqs = lazy(() => import("./pages/dashboard/admin/FAQ/ServiceFAQs"));
const ValidFormElementPage = lazy(() => import("./pages/dashboard/admin/MastersSettings/Valid Form Elements"));
const AddElement = lazy(() => import("./pages/dashboard/admin/MastersSettings/Valid Form Elements/AddElement"));
const Add = lazy(() => import("./pages/dashboard/admin/MastersSettings/Valid Form Attributes/Add"));
const AddFormElement = lazy(() => import("./pages/dashboard/admin/MastersSettings/Elements/AddFormElement"));
const AddAttribute = lazy(() => import("./pages/dashboard/admin/MastersSettings/Attributes/AddAttribute"));
const VideoIntro = lazy(() => import("./pages/dashboard/admin/VideoIntro"));
const UpdateVideo = lazy(() => import("./pages/dashboard/admin/VideoIntro/UpdateVideo"));
const ViewDocument = lazy(() => import("./pages/dashboard/admin/DocumentManagement/ViewDocument"));
const AddNote = lazy(() => import("./pages/dashboard/admin/ApplicationManagement/AddNote"));
const CaseHistory = lazy(() => import("./pages/dashboard/admin/ApplicationManagement/CaseHistory"));
const AddFieldNote = lazy(() => import("./pages/dashboard/admin/ApplicationManagement/AddFieldNote"));
const FieldNote = lazy(() => import("./pages/dashboard/admin/ApplicationManagement/FieldNote"));
// import SubInputs from "./pages/dashboard/admin/MastersSettings/SubInputs";
// import AddSubInput from "./pages/dashboard/admin/MastersSettings/SubInputs/AddSubInput";
// import EditSubInput from "./pages/dashboard/admin/MastersSettings/SubInputs/EditSubInput";
// import AddEditSubInput from "./pages/dashboard/admin/MastersSettings/SubInputs/AddEditSubInput";

const Roles = lazy(() => import("./pages/dashboard/admin/Roles"));
const AddRole = lazy(() => import("./pages/dashboard/admin/Roles/AddRoles"));
const EditRole = lazy(() => import("./pages/dashboard/admin/Roles/EditRoles"));
const Teams = lazy(() => import("./pages/dashboard/admin/Teams"));
const AddTeam = lazy(() => import("./pages/dashboard/admin/Teams/AddTeams"));
const EditTeam = lazy(() => import("./pages/dashboard/admin/Teams/EditTeams"));
const FormBhuilder2 = lazy(() => import("./pages/dashboard/admin/FormManagement/FormBhuilder2"));
const ViewFom = lazy(() => import("./pages/dashboard/admin/FormManagement/ViewFom"));


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
    path: "admin/form",
    element: <Form />,
    name: "Forms",
    showInSidebar: true,
    icon: <TableCellsIcon {...icon} />,
  },
  {
    path: "admin/form/create-form",
    element: <FormCreationPage />,
    showInSidebar: false,
  },
  {
    path: "admin/form/edit-form/:id",
    element: <FormCreationPage />,
    showInSidebar: false,
  },
  {
    path: "admin/formbuilder/create-form/:id",
    element: <FormBhuilder2 />,
    showInSidebar: false,
  },
  {
    path: "admin/formbuilder/view-form/:id",
    element: <ViewFom />,
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
  // {
  //   path: "admin/masterSettings/sub-inputs",
  //   element: <SubInputs />
  // },
  // {
  //   path: "admin/masterSettings/sub-input/create",
  //   element: <AddSubInput />
  // },
  // {
  //   path: "admin/masterSettings/sub-input/edit/:id",
  //   element: <EditSubInput />
  // },
  {
    path: "admin/roles",
    element: <Roles />
  },
  {
    path: "admin/role/create",
    element: <AddRole />
  },
  {
    path: "admin/roles/edit/:roleId",
    element: <EditRole />
  },
  {
    path: "admin/teams",
    element: <Teams />
  },
  {
    path: "admin/team/create",
    element: <AddTeam />
  },
  {
    path: "admin/teams/edit/:teamId",
    element: <EditTeam />
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
    path:"admin/field-history",
    element:<FieldNote/>
  },
  {
    path:"admin/case-history",
    element:<CaseHistory/>
  },
  {
    path:"admin/team-note/create-note",
    element:<AddNote/>
  },
  {
    path:"admin/team-note/create-field-note",
    element:<AddFieldNote/>
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
    path:"admin/services/view-service/:serviceId",
    element : <ViewService/>
  },
  {
    path:"admin/video-intro",
    element:<VideoIntro/>
  },
  {
    path:"admin/logo-management",
    element:<Logo/>
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
  },
  {
    path: "admin/usermanagement/view-business-document/:transactionId",
    name: "View All Business",
    element: <ViewTransactionDocument/>,
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
    path : "admin/document-management/documents/:folderId", 
    element : <FolderDocuments />
  },
  {
    path : "admin/document-management/view-document/:folderId/:docId", 
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
    element: <Navigate to="/dashboard/admin/home" />,    // element: <Dashboard/>,
  }
  ,
  {
    path: "/dashboard",
    element:<ProtectedRoute><Dashboard /></ProtectedRoute> ,
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
 