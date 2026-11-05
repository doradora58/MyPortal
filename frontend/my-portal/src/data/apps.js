import {
  FaBookOpen,
  FaCar,
  FaChartLine,
  FaClipboardList,
  FaComments,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaProjectDiagram,
  FaTruck,
} from 'react-icons/fa';

const apps = [
  {
    title: 'My Portal',
    description: 'Your starting point for all available apps.',
    category: 'Portal',
    url: '/',
    icon: <FaExternalLinkAlt />,
  },
  {
    title: 'Gantt Chart',
    description: 'Plan projects and keep track of schedules.',
    category: 'Planning',
    url: 'https://ganttchart.doradora58.com',
    icon: <FaProjectDiagram />,
  },
  {
    title: 'BBS',
    description: 'Talk about your favorite topics together.',
    category: 'Community',
    url: '/bbs/',
    icon: <FaComments />,
  },
  {
    title: 'Sample',
    description: 'Explore a sample web page.',
    category: 'Development',
    url: '/sample/',
    icon: <FaFileAlt />,
  },
  {
    title: 'Blog',
    description: 'Read my latest posts and articles.',
    category: 'Community',
    url: 'https://beyondonestep.com',
    icon: <FaBookOpen />,
  },
  {
    title: 'GitHub',
    description: 'Browse my projects and repositories.',
    category: 'Development',
    url: 'https://github.com/doradora58',
    icon: <FaGithub />,
  },
  {
    title: 'FMS',
    description: 'Manage fleet operations and vehicles.',
    category: 'Fleet Management',
    url: 'https://fms.doradora58.com/',
    icon: <FaTruck />,
  },
  {
    title: 'OrderManagement',
    description: 'Manage and track orders.',
    category: 'Operations',
    url: 'https://order-management.doradora58.com/',
    icon: <FaClipboardList />,
  },
  {
    title: 'AutoVehicleEmulator',
    description: 'Simulate vehicle data and behavior.',
    category: 'Development',
    url: 'https://auto-vehicle-emulator.doradora58.com/',
    icon: <FaCar />,
  },
  {
    title: 'Jaeger',
    description: 'Explore distributed traces.',
    category: 'Observability',
    url: 'https://jaeger.doradora58.com',
    icon: <FaProjectDiagram />,
  },
  {
    title: 'Grafana',
    description: 'Monitor dashboards and metrics.',
    category: 'Observability',
    url: 'https://grafana.doradora58.com/',
    icon: <FaChartLine />,
  },
];

export default apps;
