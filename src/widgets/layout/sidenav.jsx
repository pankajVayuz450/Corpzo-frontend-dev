import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import {
  HomeIcon,
  TableCellsIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChartBarIcon
} from "@heroicons/react/24/solid";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { FaImages, FaQuestion, FaUsersCog } from "react-icons/fa";
import { IoDocuments, } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdRoomService } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";





import { useState } from "react";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
  };
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  const [open, setOpen] = useState(0);
  // const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } overflow-y-scroll z-[30] no-scrollbar fixed inset-0  my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
     [&::-webkit-scrollbar-track]:bg-gray-100
     [&::-webkit-scrollbar-thumb]:rounded-full
     [&::-webkit-scrollbar-thumb]:bg-gray-300
     dark:[&::-webkit-scrollbar-track]:bg-neutral-700
     dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
      `}
    >
      <div className="relative">
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {"CORPZO | Admin Dashboard"}
          </Typography>
        </Link>
      </div>

      <div className="m-4 ">
        <ul className="mb-4 flex flex-col gap-1">
          <li key={name}>
            <NavLink to={`/dashboard/admin/home`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <ChartBarIcon {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Analytics
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <NavLink to={`/dashboard/admin/roles`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <HomeIcon {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Roles
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <NavLink to={`/dashboard/admin/teams`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <HomeIcon {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Teams
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <li key={name}>
              <NavLink to={`/dashboard/admin/application-management`}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <TableCellsIcon {...icon} />
                    <Typography
                      color="inherit"
                      className="font-medium text-sm capitalize "
                    >
                      Application Management
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
            <NavLink to={`/dashboard/admin/submadminmanagemnt`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <ServerStackIcon {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize"
                  >
                    Sub Admin Management
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <NavLink to={`/dashboard/admin/coupounmanagement`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <RectangleStackIcon {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize"
                  >
                    Coupoun Management
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <NavLink to={`/dashboard/admin/usermanagement`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <FaUsersCog className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    User Management
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <NavLink to={`/dashboard/admin/investor-management`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <FaUserGroup className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Investor Management
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
{/* 
          <li key={name}>
            <NavLink to={`/dashboard/admin/profile`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <UserCircleIcon {...icon} />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Profile
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li> */}
          <li key={name}>
            <NavLink to={`/dashboard/admin/offer`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <BiSolidOffer className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Offer
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          {/* <li key={name}>
            <NavLink to={`/dashboard/admin/banner-management`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <FaImages className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Banner Management
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li> */}
          <li key={name}>
            <NavLink to={`/dashboard/admin/faq`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <FaQuestion className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    FAQ
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <NavLink to={`/dashboard/admin/document-management`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <IoDocuments className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Document Management
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <NavLink to={`/dashboard/admin/service`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <MdRoomService className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Service Management
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <NavLink to={`/dashboard/admin/video-intro`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <FaVideo className="w-5 h-5 text-inherit" />
                  <Typography
                    color="inherit"
                    className="font-medium text-sm capitalize "
                  >
                    Intro Video
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          <li key={name}>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 px-4">
                  <ListItemPrefix>
                    <IoMdSettings className="w-5 h-5 text-inherit" />
                  </ListItemPrefix>
                  <Typography color="inherit" className="mr-auto font-medium text-sm capitalize ">
                    Master Settings
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">

                  <NavLink to={'/dashboard/admin/masterSettings/elements'}>
                    <ListItem selected={isActive('/dashboard/admin/masterSettings/elements')}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Form Elements
                    </ListItem>
                  </NavLink>
                  

                  {/* <NavLink to={'/dashboard/admin/masterSettings/sub-inputs'}>
                    <ListItem selected={isActive('/dashboard/admin/masterSettings/sub-inputs')}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Sub Inputs
                    </ListItem>
                  </NavLink> */}


                  <NavLink to={'/dashboard/admin/masterSettings/attributes'}>
                    <ListItem selected={isActive("dashboard/admin/masterSettings/attributes")}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Form  Attributes
                    </ListItem>
                  </NavLink>

                  <NavLink to={'/dashboard/admin/masterSettings/validFormElement'}>
                    <ListItem selected={isActive('/dashboard/admin/masterSettings/validFormElement')}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Valid Form Element
                    </ListItem>
                  </NavLink>



                  <NavLink to={'/dashboard/admin/masterSettings/validAttributes'}>
                    <ListItem selected={isActive('/dashboard/admin/masterSettings/validAttributes')}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Valid Attributes
                    </ListItem>
                  </NavLink>

                  <NavLink to={'/dashboard/admin/masterSettings/regex'}>
                    <ListItem selected={isActive('/dashboard/admin/masterSettings/regex')}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Regex
                    </ListItem>
                  </NavLink>

                  <NavLink to='/dashboard/admin/masterSettings/Category'>
                    <ListItem selected={isActive('/dashboard/admin/masterSettings/Category')}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Category
                    </ListItem>
                  </NavLink>
                  <NavLink to='/dashboard/admin/masterSettings/Sub-Category'>
                    <ListItem selected={isActive('/dashboard/admin/masterSettings/Sub-Category')}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Sub Category
                    </ListItem>
                  </NavLink>
                  <NavLink to="/dashboard/admin/masterSettings/Department">
                    <ListItem selected={isActive('/dashboard/admin/masterSettings/Department')}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Department
                    </ListItem>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>
          </li>
        </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Corpzo | Admin",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
