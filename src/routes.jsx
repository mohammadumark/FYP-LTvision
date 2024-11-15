import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon, // Import for Patients
  ChatBubbleBottomCenterTextIcon, // Import for Chats
  ArrowUpTrayIcon, // Import for Upload CT Scan
} from "@heroicons/react/24/solid";
import { Home, Profile, Appointments, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Patients from "./pages/dashboard/Patients";
import Chats from "./pages/dashboard/Chats";
import UploadCTScan from "./pages/dashboard/UploadCTScan"; // Import Upload CT Scan component
import UploadCtScans from "./pages/dashboard/UploadCtScans";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Appointments",
        path: "/Appointments",
        element: <Appointments />,
      },
      {
        icon: <UserGroupIcon {...icon} />, // Updated icon for Patients
        name: "Patients",
        path: "/Patients",
        element: <Patients />,
      },
      {
        icon: <ArrowUpTrayIcon {...icon} />, // Icon for Upload CT Scan
        name: "Upload CT Scan",
        path: "/upload-ct-scan",
        element: <UploadCtScans />, // Corresponding component
      },
      {
        icon: <ChatBubbleBottomCenterTextIcon {...icon} />, // Updated icon for Chats
        name: "Chats",
        path: "/Chats",
        element: <Chats />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
