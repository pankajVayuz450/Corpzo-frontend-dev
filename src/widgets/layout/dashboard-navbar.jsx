import { useLocation, Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  Breadcrumbs,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  XMarkIcon,
  Bars3Icon
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "./TopNavigation";

export function DashboardNavbar({ onSignOut }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const [count, setCount] = useState({});
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const categoryCount = useSelector((state) => state.category.totalCount)
  const subCategoryCount = useSelector((state) => state.subCategory.totalCount);
  const departmentCount = useSelector((state) => state.department.totalCount);
  const faqCount = useSelector((state) => state.faq.totalCount);
  const { totalRecords } = useSelector((state) => state.userMgmt)

  const { totalCount } = useSelector((state) => state.service)
  const pathElements = useMemo(() => {
    return pathname.split("/").filter((el) => el !== "");
  }, [pathname]);

  const navigate = useNavigate()
  const getTotalRecords = (path) => {
    switch (true) {
      case path === '/dashboard/admin/masterSettings/Category':
        return {
          totalCount: categoryCount,
          title: "Category"
        };
      case path === '/dashboard/admin/masterSettings/Category/add-category':
        return {
          totalCount: 0,
          title: "Add Category"
        };
      case /^\/dashboard\/admin\/masterSettings\/Category\/edit-category(\/[a-zA-Z0-9-]+)?$/.test(path):
        return {
          totalCount: 0,
          title: "Edit Category"
        };
      case path === '/dashboard/admin/masterSettings/Sub-Category':
        return {
          totalCount: subCategoryCount,
          title: "Sub Category"
        };
      case path === '/dashboard/admin/masterSettings/Sub-Category/add-sub-category':
        return {
          totalCount: 0,
          title: "Add Sub  Category"
        };
      case /^\/dashboard\/admin\/masterSettings\/Sub-Category\/edit-sub-category(\/[a-zA-Z0-9-]+)?$/.test(path):
        return {
          totalCount: 0,
          title: "Edit Sub Category"
        };
      case path === '/dashboard/admin/masterSettings/Department':
        return {
          totalCount: departmentCount,
          title: "Department"
        };
      case path === '/dashboard/admin/masterSettings/Department/add-department':
        return {
          totalCount: 0,
          title: "Add Department"
        };
      case /^\/dashboard\/admin\/masterSettings\/Department\/edit-department(\/[a-zA-Z0-9-]+)?$/.test(path):
        return {
          totalCount: 0,
          title: "Update Department"
        };
      case path === '/dashboard/admin/faq':
        return {
          totalCount: faqCount,
          title: "FAQ"
        };
      case path === '/dashboard/admin/FAQ/create-faq':
        return {
          totalCount: 0,
          title: "Create-FAQ"
        };
      case /^\/dashboard\/admin\/FAQ\/edit-faq(\/[a-zA-Z0-9-]+)?$/.test(path):
        return {
          totalCount: 0,
          title: "Edit FAQ"
        };
      case /^\/dashboard\/admin\/FAQ\/view-faq(\/[a-zA-Z0-9-]+)?$/.test(path):
        return {
          totalCount: 0,
          title: "View FAQ"
        };
      case path === '/dashboard/admin/usermanagement':
        return {
          totalCount: totalRecords,
          title: "User Management"
        };
      case path === '/dashboard/admin/usermanagement/create-user':
        return {
          totalCount: totalRecords,
          title: "Add User"
        };
      case /^\/dashboard\/admin\/usermanagement\/edit-user(\/[a-zA-Z0-9-]+)?$/.test(path):
        return {
          totalCount: 0,
          title: "Edit User"
        };
      case path === '/dashboard/admin/subscriptions':
        return {
          totalCount: totalRecords,
          title: "Subscriptions"
        };
      case path === '/dashboard/admin/subscriptions/create-subscription':
        return {
          totalCount: totalRecords,
          title: "Create Subscription"
        };
      case /^\/dashboard\/admin\/subscriptions\/edit-subscription(\/[a-zA-Z0-9-]+)?$/.test(path):
        return {
          totalCount: 0,
          title: "Edit Subscription"
        };
      case path === '/dashboard/admin/steps/64f5b3a9d82e9b0012c8b9e3':
        return {
          totalCount: totalRecords,
          title: "Steps"
        };
      case path === '/dashboard/admin/steps/create-steps/64f5b3a9d82e9b0012c8b9e3':
        return {
          totalCount: totalRecords,
          title: "Create Step"
        };
      case /^\/dashboard\/admin\/steps\/edit-step(\/[a-zA-Z0-9-]+)?$/.test(path):
        return {
          totalCount: 0,
          title: "Edit Step"
        };
      case path === '/dashboard/admin/service':
        return {
          totalCount: totalCount,
          title: "Service"
        };
      case path === '/dashboard/admin/services/create-service':
        return {
          totalCount: 0,
          title: "Create Service"
        };
      case /^\/dashboard\/admin\/services\/update-service(\/[a-fA-F0-9]{24})?$/.test(path):
        return {
          totalCount: 0,
          title: "Update Service"
        };
      default:
        return {
          totalCount: 0,
          title: "Admin"
        };
    }
  };
  const isObjectId = (path) => {
    // Replace the following line with your specific condition for identifying object IDs
    // Example: if object IDs are 24 characters long hexadecimal strings
    return typeof path === 'string' && /^[a-f0-9]{24}$/.test(path);
  };
  useEffect(() => {

    setCount(getTotalRecords(pathname))
  }, [pathname, categoryCount, subCategoryCount, departmentCount, faqCount, totalCount])
  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          {
            openSidenav ? <><IconButton
              size="sm"
              ripple={false}
              className="fixed z-9999 left-0 top-0 grid rounded-br-none rounded-tl-none md:block xl:hidden"
              onClick={() => setOpenSidenav(dispatch, false)}
            >
              <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
            </IconButton> </> :
              <>
                <IconButton
                  size="sm"
                  ripple={false}
                  className="fixed z-100 left-0 top-0 grid rounded-br-none rounded-tl-none md:block xl:hidden"
                  onClick={() => setOpenSidenav(dispatch, true)}
                >
                  <Bars3Icon strokeWidth={2.5} className="h-5 w-5 text-white" />
                </IconButton>
              </>
          }

          {/* <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            {
              pathElements.length === 5 ? (
                pathElements.slice(2, 4).map((path) => (
                  <Typography
                    key={path} // Add a unique key for each element
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-50"
                  >
                    {path}
                  </Typography>
                ))
              ) : pathElements.length === 4 ? (
                pathElements.slice(2, 4).filter(path => !isObjectId(path)).map((path) => (
                  <Typography
                    key={path} // Add a unique key for each element
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-50"
                  >
                    {path}
                  </Typography>
                ))
              ) : (
                pathElements.slice(3, 5).map((path) => (
                  <Typography
                    key={path} // Add a unique key for each element
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-50"
                  >
                    {path}
                  </Typography>
                ))
              )
            }

          </Breadcrumbs> */}
          <Navigation items={pathElements} />
          <div className="flex flex-row gap-4 items-center">
            <ChevronLeftIcon className="fill-black h-5 w-5 cursor-pointer" onClick={() => navigate(-1)} />
            <Typography variant="h6" color="blue-gray">
              {`${count.title} ${count.totalCount !== (null || 0) ? `(${count.totalCount})` : ''}`}
            </Typography>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            color="red"
            onClick={onSignOut}
            className="hidden md:inline-flex"
          >
            Sign Out
          </Button>
          {/* <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu> */}
          {/* <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton> */}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
