// src/pages/Projects.jsx
import ListComponent from "../components/ListComponent";
import photo10 from "../assets/photo10.jpg";
import photo11 from "../assets/photo11.jpg";
import photo12 from "../assets/photo12.jpg";

const data = [
  {
    imagePath: photo10,
    title: "Real Estate Demo Website",
    text: "This is a real estate demo website I designed for my Website Development course during my first semester. It features property listings, search functionality, and a clean, intuitive interface aimed at enhancing user experience and demonstrating my frontend development skills."
  },
  {
    imagePath: photo11,
    title: "Canadian Conservation Areas",
    text: "A web page dedicated to conservation in Canada, providing a curated list of conservation areas, parks, and reserves. The project emphasizes accessibility and organized presentation of information, helping users easily find and learn about protected areas."
  },
  {
    imagePath: photo12,
    title: "Boase Accounting Demo Website",
    text: "A professional demo website created for Boase Accounting, showcasing services, team members, and contact options. This project allowed me to apply responsive design principles and design a polished UI that aligns with the firm's professional image."
  },
];

function Projects() {
  return (
    <div className="page projects">
      <h2>My Projects</h2>
      <ListComponent items={data} />
    </div>
  );
}

export default Projects;
