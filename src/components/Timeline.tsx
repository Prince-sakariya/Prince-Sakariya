import React from 'react';
import { timelineData } from '../data/portfolioData';
import './Timeline.css';

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="timeline-experience-section">
      <h1 className="section-title">Education & Experience</h1>
      <div className="timeline-experience-blocks">
        {timelineData.map(entry => (
          <div className="timeline-experience-block" key={entry.id}>
            <div className="timeline-experience-details">
              <div className="timeline-experience-date">{entry.date}</div>
              <h2>{entry.title}</h2>
              <div className="timeline-experience-role">{entry.role}</div>
              <div className="timeline-experience-tags">
                {entry.tags.map(tag => (
                  <span className="timeline-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
