// src/pages/About.jsx
import christann from "../assets/christanngroves.jpg";

function About() {
  return (
    <div className="page about">
      <h2>Christann Groves</h2>
      <img src={christann} alt="Christann Groves" className="profile-pic" />
      <p>
        I am a Jamaican international student with a diverse background in education and technology. I began my career as an English Language teacher, but my curiosity and passion for technology drew me towards software development. 
      </p>
      <p>
        I am particularly fascinated by designing user interfaces that prioritize accessibility, ensuring that all people can engage with technology effectively. Currently, I am pursuing a Software Engineering degree at Centennial College, maintaining a 4.0 GPA. 
      </p>
      <p>
        In my spare time, I develop project ideas and actively work towards becoming a skilled Frontend Developer, combining creativity, innovation, and technical expertise.
      </p>
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        Click to view my Resume
      </a>
    </div>
  );
}

export default About;