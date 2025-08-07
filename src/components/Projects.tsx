import React from 'react';
import { projectsData } from '../data/portfolioData';
import './Projects.css';

const Projects: React.FC = () => {
  return (
    <section className="practical-experience-section" id="projects">
      <h1 className="section-title">Practical Experience</h1>
      <div className="practical-experience-projects">
        {projectsData.map(project => (
          <div className="practical-experience-project" key={project.id}>
            <div className="practical-experience-grid">
              <div className="practical-experience-details">
                <h2>{project.title}</h2>
                <div className="practical-experience-awards">
                  <div><strong>Awards</strong></div>
                  <div>{project.awards.title}<br />- {project.awards.description}</div>
                </div>
                <div className="practical-experience-services">
                  <div><strong>Services</strong></div>
                  <div>{project.services.join(', ')}</div>
                </div>
                <div className="practical-experience-about">
                  <div><strong>About</strong></div>
                  <div>{project.about}</div>
                </div>
              </div>
              <div className="practical-experience-media">
                <img src={project.media.mainImage} alt={project.title} />
                <div className="practical-experience-media-caption">{project.media.mainImageCaption}</div>
              </div>
              <div className="practical-experience-media practical-experience-media-video">
                <video src={project.media.video} controls poster={project.media.videoPoster}></video>
              </div>
              <div className="practical-experience-media practical-experience-media-grid">
                {project.media.gridImages.map((img, idx) => (
                  <img src={img} alt={`Grid ${idx + 1}`} key={img} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
