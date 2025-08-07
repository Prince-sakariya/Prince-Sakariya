import React from 'react';
import './Hero.css';
import photo from '../assets/Picture1.jpg';

const Hero: React.FC = () => {
  return (
    <section className="hero hero-minimal" id="hero">
      <div className="hero-container">
        <div className="who-prince-photo">
          <img src={photo} alt="Prince Sakariya" />
        </div>
        <div className="hero-row">
          <span className="hero-big">
            Hey, I'm <strong>Prince Sakariya</strong>. Here, you can check out what I'm working on.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
