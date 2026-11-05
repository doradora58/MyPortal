import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Card from '../components/Card';
import apps from '../data/apps';
import '../App.css';

export default function Apps() {
  return (
    <section className="apps-page" aria-labelledby="apps-title">
      <header className="apps-intro">
        <div>
          <p className="apps-eyebrow">MY WORKSPACE</p>
          <h1 className="apps-header" id="apps-title">My Apps</h1>
          <p className="apps-description">
            A quick way to get to the tools and services you use.
          </p>
        </div>
        <p className="apps-count" aria-label={`${apps.length} apps`}>
          <strong>{apps.length}</strong>
          <span> apps</span>
        </p>
      </header>

      <div className="card-grid">
        {apps.map((app) => {
          const isInternal = app.url.startsWith('/');
          return (
            <Card key={app.title} className="app-link-card">
              <a
                href={app.url}
                target={isInternal ? '_self' : '_blank'}
                rel={isInternal ? undefined : 'noopener noreferrer'}
                className="app-link-content"
                aria-label={`${app.title}: ${app.description}${isInternal ? '' : ' (opens in a new tab)'}`}
              >
                <div className="app-card-top">
                  <span className="icon-wrapper" aria-hidden="true">{app.icon}</span>
                  <span className="app-category">{app.category}</span>
                </div>
                <div className="app-card-copy">
                  <h2>{app.title}</h2>
                  <p>{app.description}</p>
                </div>
                <FaExternalLinkAlt className="app-card-link-icon" aria-hidden="true" />
              </a>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
