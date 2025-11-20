import { FaExternalLinkAlt, FaComments, FaProjectDiagram, FaGithub } from 'react-icons/fa';
import React from 'react';
import Card from '../components/Card';
import '../App.css';
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
    <div style={{ padding: '20px' }}>
      <h1 className="apps-header">My Apps</h1>  
      
      <div className="card-grid">
        {apps.map((app, index) => (
          <Card 
            key={index}
            className="app-link-card"
          >
            {/* カード全体をリンクとして機能させるため、中身をaタグで囲む */}
            <a
              href={app.url}
              target={app.url.startsWith('/') ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="app-link-content"
            >
              <div className="icon-wrapper">{app.icon}</div>
              <h2>{app.title}</h2>
              <p>{app.description}</p>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}