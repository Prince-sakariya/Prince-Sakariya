import React from 'react';
import { contactData } from '../data/portfolioData';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact get-in-touch-dark">
      <div className="get-in-touch-content">
        <div className="get-in-touch-headline">
          <span className="section-title get-in-touch-title">Get In Touch</span>
        </div>
        <hr className="get-in-touch-divider" />
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's work together</h3>
            <p>I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!</p>
            <div className="contact-methods contact-methods-horizontal">
              {contactData.map(method => (
                <a href={method.url} className="contact-method" key={method.id} target="_blank" rel="noopener noreferrer">
                  <div className="contact-method-inner">
                    <span className="contact-icon"><i className={method.icon}></i></span>
                    <div className="contact-method-details">
                      <h4>{method.title}</h4>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="get-in-touch-bottom">
          <span className="get-in-touch-copyright">&copy; 2025 Prince Sakariya.</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
