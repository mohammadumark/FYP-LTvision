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
import { Home, Profile, Appointment, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Patients from "./pages/dashboard/Patients";
import Chats from "./pages/dashboard/Report";
import CTScanUpload from "./pages/dashboard/CTScanUpload";
import Report from "./pages/dashboard/Report";

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
        element: <Appointment/>,
      },
      {
        icon: <UserGroupIcon {...icon} />, // Updated icon for Patients
        name: "Patients",
        path: "/Patients",
        element: <Patients />,
      },

      {
        icon: <ArrowUpTrayIcon {...icon} />,
        name: "Upload CT Scan",
        path: "/upload-ct-scan",
        element: <CTScanUpload />, // Corresponding component
      },
      
      {
        icon: <ChatBubbleBottomCenterTextIcon {...icon} />, // Updated icon for Chats
        name: "Report",
        path: "/Report",
        element: <Report />,
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
