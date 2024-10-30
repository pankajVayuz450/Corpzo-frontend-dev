import {
  HomeIcon,
  TableCellsIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChartBarIcon
} from "@heroicons/react/24/solid";
import { IoIosImage } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { FaImages, FaQuestion, FaUsersCog, FaWrench, FaWpforms } from "react-icons/fa";
import { IoDocuments, } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdRoomService } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
export const menuConfig = [
  {
    key: 'analytics',
    path: '/dashboard/admin/home',
    label: 'Analytics',
    icon: ChartBarIcon,
  },
  // {
  //   key: 'roles',
  //   path: '/dashboard/admin/roles',
  //   label: 'Roles',
  //   icon: HomeIcon,
  // },
  // {
  //   key: 'teams',
  //   path: '/dashboard/admin/teams',
  //   label: 'Teams',
  //   icon: HomeIcon,
  // },
  {
    key: 'applicationManagement',
    path: '/dashboard/admin/application-management',
    label: 'Application Management',
    icon: TableCellsIcon,
  },
  // {
  //   key: 'subAdminManagement',
  //   path: '/dashboard/admin/submadminmanagemnt',
  //   label: 'Sub Admin Management',
  //   icon: ServerStackIcon,
  // },
  {
    key: 'couponManagement',
    path: '/dashboard/admin/coupounmanagement',
    label: 'Coupon Management',
    icon: RectangleStackIcon,
  },
  {
    key: 'userManagement',
    path: '/dashboard/admin/usermanagement',
    label: 'User Management',
    icon: FaUsersCog,
  },
  // {
  //   key: 'investorManagement',
  //   path: '/dashboard/admin/investor-management',
  //   label: 'Investor Management',
  //   icon: FaUserGroup,
  // },
  {
    key: 'offer',
    path: '/dashboard/admin/offer',
    label: 'Offer',
    icon: BiSolidOffer,
  },
  {
    key: 'faq',
    path: '/dashboard/admin/faq',
    label: 'FAQ',
    icon: FaQuestion,
  },
  {
    key: 'documentManagement',
    path: '/dashboard/admin/document-management',
    label: 'Document Management',
    icon: IoDocuments,
  },
  {
    key: 'serviceManagement',
    path: '/dashboard/admin/service',
    label: 'Service Management',
    icon: FaWrench,
  },
    {
      key: 'Form Management',
      path: '/dashboard/admin/form',
      label: 'Form Management',
      icon: FaWpforms,
    },
  {
    key: 'videoIntro',
    path: '/dashboard/admin/video-intro',
    label: 'Intro Video',
    icon: FaVideo,
  },
  // {
  //   key: 'bannerManagement',
  //   path: '/dashboard/admin/banner-management',
  //   label: 'Banner Management',
  //   icon: FaImages,
  // },
  {
    key: 'logoManagement',
    path: '/dashboard/admin/logo-management',
    label: 'Logo Management',
    icon: IoIosImage,
  },
  {
    key: 'masterSettings',
    path: '/dashboard/admin/masterSettings',
    label: 'Master Settings',
    icon: IoMdSettings,
    subMenu: [
      // { key: 'elements', path: '/dashboard/admin/masterSettings/elements', label: 'Form Elements' },
      // { key: 'attributes', path: '/dashboard/admin/masterSettings/attributes', label: 'Form Attributes' },
      // { key: 'validFormElement', path: '/dashboard/admin/masterSettings/validFormElement', label: 'Valid Form Element' },
      // { key: 'validAttributes', path: '/dashboard/admin/masterSettings/validAttributes', label: 'Valid Attributes' },
      // { key: 'regex', path: '/dashboard/admin/masterSettings/regex', label: 'Regex' },
      { key: 'roles', path: '/dashboard/admin/roles', label: 'Roles' },
      { key: 'teams', path: '/dashboard/admin/teams', label: 'Teams' },
      { key: 'category', path: '/dashboard/admin/masterSettings/Category', label: 'Category' },
      { key: 'subCategory', path: '/dashboard/admin/masterSettings/Sub-Category', label: 'Sub Category' },
      { key: 'department', path: '/dashboard/admin/masterSettings/Department', label: 'Department' },
    ],
  },

  // Commented routes for later use
  // {
  //   key: 'profile',
  //   path: '/dashboard/admin/profile',
  //   label: 'Profile',
  //   icon: UserCircleIcon,
  // },

];
