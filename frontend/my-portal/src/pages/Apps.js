import { FaExternalLinkAlt, FaComments, FaProjectDiagram, FaGithub } from 'react-icons/fa';

const apps = [
  {
    title: 'My Portal',
    description: 'This is portal site',
    url:'/',
    icon:<FaExternalLinkAlt/>,
  },
  {
    title: 'Gantt Chart',
    description: 'This is Gantt Chart site. You can schedule',
    url:'https://ganttchart.doradora58.com',
    icon:<FaProjectDiagram />,
  },
  {
    title: 'BBS',
    description: 'Talk about your favorite together',
    url:'/bbs/',
    icon:<FaComments />,
  },  
  {
    title: 'GitHub',
    description: 'My Git Hub page',
    url:'https://github.com/doradora58',
    icon:<FaGithub />,
  },

]


export default function Apps() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My Web Apps</h1>  
      <div className="card-grid">
        {apps.map((app, index) => (
          <a
            key={index}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="app-card"
          >
            <div className="icon">{app.icon}</div>
            <h2>{app.title}</h2>
            <p>{app.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
