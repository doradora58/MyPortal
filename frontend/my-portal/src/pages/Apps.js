import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Apps() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to the Apps</h1>

      {/* 外部リンク付きアイコン */}
      <a
        href="https://ganttchart.doradora58.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: '2rem', color: '#007bff', textDecoration: 'none' }}
      >
        <FaExternalLinkAlt title="Go to Example.com" />
      </a>
    </div>
  );
}
