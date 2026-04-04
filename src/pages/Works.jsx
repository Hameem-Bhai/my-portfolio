import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import worksData from '../data/works.json';
import './Works.css';

const WorkCard = ({ item, setSelectedImage }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          window.dispatchEvent(new CustomEvent('update-bg', { detail: item.imageUrl }));
        }
      },
      { threshold: 0.51 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [item.imageUrl]);

  return (
    <motion.div 
      ref={ref}
      className="work-card-container"
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="work-card-content glass-panel">
        <h2 className="work-headline">{item.title}</h2>
        <h4 className="work-category">{item.category}</h4>
        
        {/* Lightbox triggers when image is clicked */}
        <div className="work-card-image-wrap" onClick={() => setSelectedImage(item.imageUrl)}>
          <img src={item.imageUrl} alt={item.title} className="work-card-image" />
          <div className="image-hover-overlay">Click to Enlarge</div>
        </div>
        
        <p className="work-bio">{item.description}</p>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null); // Lightbox State
  
  const categories = ["All", ...new Set(worksData.map(item => item.category))];

  const filteredWorks = activeCategory === "All" 
    ? worksData 
    : worksData.filter(work => work.category === activeCategory);

  const [bgImage, setBgImage] = useState(filteredWorks[0]?.imageUrl || '');

  useEffect(() => {
    const handleBgUpdate = (e) => setBgImage(e.detail);
    window.addEventListener('update-bg', handleBgUpdate);
    return () => window.removeEventListener('update-bg', handleBgUpdate);
  }, []);

  useEffect(() => {
    if (filteredWorks.length > 0) {
      setBgImage(filteredWorks[0].imageUrl);
    } else {
      setBgImage('');
    }
  }, [activeCategory]);

  return (
    <div className="works-wrapper">
      <AnimatePresence>
        <motion.div 
          key={bgImage}
          className="works-bg-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </AnimatePresence>
      <div className="works-bg-overlay"></div>

      <div className="works-content">
        <motion.div 
          className="works-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="title-text" style={{ fontSize: '3.5rem' }}>Visual Journey</h1>
          
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="works-scroll-list">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((item) => (
              <WorkCard key={`${item.id}-${activeCategory}`} item={item} setSelectedImage={setSelectedImage} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img 
              src={selectedImage} 
              className="lightbox-image"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} /* Prevents closing if clicking the image itself */
            />
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Works;
