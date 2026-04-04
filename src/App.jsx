import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import './App.css';
import Cursor from './components/Cursor';
import Landing from './pages/Landing';
import Works from './pages/Works';
import Links from './pages/Links';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Cursor />
      
      <nav className="global-nav">
        <Link to="/" className="nav-link">HOME</Link>
        <Link to="/works" className="nav-link">WORKS</Link>
        <Link to="/links" className="nav-link">LINKS</Link>
        <Link to="/contact" className="nav-link">CONNECT</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/works" element={<Works />} />
        <Route path="/links" element={<Links />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
