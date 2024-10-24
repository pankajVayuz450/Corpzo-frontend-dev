import { useMaterialTailwindController } from "@/context";
import {
  ChevronDownIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid";
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
import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import { menuConfig } from "./sideNavConfig";

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
        <ul>
          {menuConfig.map(({ key, path, label, icon: Icon, subMenu }) => (
            <li key={key}>
              {subMenu ? (
                <Accordion
                  open={open === key}
                  icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === key ? "rotate-180" : ""}`} />}
                >
                  <ListItem className="p-0" selected={open === key}>
                    <AccordionHeader onClick={() => handleOpen(key)} className="border-b-0 px-4">
                      <ListItemPrefix>
                        <Icon className="w-5 h-5 text-inherit" />
                      </ListItemPrefix>
                      <Typography color="inherit" className="mr-auto font-medium text-sm capitalize">
                        {label}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      {subMenu.map((sub) => (
                        <NavLink key={sub.key} to={sub.path}>
                          <ListItem selected={isActive(sub.path)}>
                            <ListItemPrefix>
                              <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                            </ListItemPrefix>
                            {sub.label}
                          </ListItem>
                        </NavLink>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              ) : (
                <NavLink to={path}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={isActive ? sidenavColor : sidenavType === "dark" ? "white" : "blue-gray"}
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      <Icon className="w-5 h-5 text-inherit" />
                      <Typography color="inherit" className="font-medium text-sm capitalize">
                        {label}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              )}
            </li>
          ))}
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
