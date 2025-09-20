// src/pages/Services.jsx
import ListComponent from "../components/ListComponent";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";

const services = [
  {
    imagePath: service1,
    title: "Interactive Features & Web Components",
    text: "I design and develop interactive website elements and reusable web components that enhance functionality and engage users effectively. My focus is on creating seamless interactions that improve the user experience."
  },
  {
    imagePath: service2,
    title: "UI/UX Prototyping & Web Redesigns",
    text: "I specialize in crafting user interface prototypes and redesigning websites to improve usability, accessibility, and aesthetics. Each redesign is informed by user-centered design principles to ensure clarity and ease of navigation."
  },
  {
    imagePath: service3,
    title: "Responsive Website Design & Development",
    text: "I build responsive websites that adapt flawlessly across devices and screen sizes. My goal is to deliver visually appealing, fully functional sites that provide a consistent experience for all users."
  },
];

function Services() {
  return (
    <div className="page services">
      <h2>My Services</h2>
      <ListComponent items={services} />
    </div>
  );
}

export default Services;
