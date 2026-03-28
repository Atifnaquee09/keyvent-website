import React from 'react';
import './About.css';

const About = ({ teamImage = '/images/team-photo.jpg' }) => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <div className="team-photo">
              <img src={teamImage} alt="KeyVent Team" className="team-image" />
            </div>
          </div>
          <div className="about-text">
            <div className="about-section">
              <h2 className="section-title">ABOUT US</h2>
              <p className="about-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Founded and operated by a team of passionate event specialists, we bring years of expertise and attention to every aspect of our client events.
              </p>
              <button className="learn-more-btn">LEARN MORE</button>
            </div>
            <div className="mission-section">
              <h2 className="section-title">OUR MISSION</h2>
              <p className="mission-description">
                To be leaders in the global luxury event industry, recognized for innovation and excellence. We strive to create unforgettable experiences that exceed our clients' expectations through meticulous attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="about-decorations">
        <div className="decoration-star star-1">⭐</div>
        <div className="decoration-star star-2">✨</div>
        <div className="decoration-star star-3">🌟</div>
      </div>
    </section>
  );
};

export default About;