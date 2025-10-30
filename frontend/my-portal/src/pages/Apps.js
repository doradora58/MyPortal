import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

export default function Apps() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My Web Apps</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
        {/* Gantt Chart */}
        <a
          href="https://ganttchart.doradora58.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '2rem', color: '#007bff' }}
        >
          Gantt Chart
          <FaExternalLinkAlt title="Gantt Chart" />
        </a>
        {/* BBS */}
        <a
          href="https://ganttchart.doradora58.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '2rem', color: '#007bff' }}
        >
          BBS
          <FaExternalLinkAlt title="BBS" />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/doradora58"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '2rem', color: '#333' }}
        >
          GitHub
          <FaGithub title="GitHub Profile" />
        </a>
      </div>
    </div>
  );
}
