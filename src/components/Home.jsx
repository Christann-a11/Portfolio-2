// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page home">
      <h1>Welcome to My Portfolio</h1>
       <p className="mission">
        My mission is to bridge the knowledge gap, one line of code at a time, and give back to my community by showing that we can harness technology to create meaningful change. Through education and innovation, I strive to empower others and make technology work for us all.
      </p>
      <Link to="/about" className="read-more">Read more about Christann Groves</Link>
    </div>
  );
}

export default Home;