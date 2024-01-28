import { FaBook } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import { FaCog, FaHome, FaList, FaGavel, FaHistory, FaComments } from "react-icons/fa";


const icon = (name) => {
  switch (name) {
    case 'ic_home':
      return <FaHome />;
    case 'ic_list':
      return <FaList />;
    case 'ic_bid':
      return <FaGavel />;
    case 'ic_order':
      return <FaHistory />;
    case 'ic_analytics':
      return <SiGoogleanalytics />;
    case 'ic_chat':
      return <FaComments />;
    case 'ic_resources':
      return <FaBook />;
    case 'ic_settings':
      return <FaCog />;
    default:
      return null;
  }
};

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic_home'),
  },
  {
    title: 'Listings',
    path: '/listings',
    icon: icon('ic_list'),
  },
  {
    title: 'Biddings',
    path: '/biddings',
    icon: icon('ic_bid'),
  },
  {
    title: 'Auctions',
    path: '/auctions',
    icon: icon('ic_bid'),
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: icon('ic_order'),
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: icon('ic_chat'),
  },
  {
    title: 'Resources',
    path: '/resources',
    icon: icon('ic_resources'),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: icon('ic_settings'),
  },
];

export default navConfig;