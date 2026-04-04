import React from 'react';
import { motion } from 'framer-motion';
import './Links.css';

const Links = () => {
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/opus.sys/', icon: '📸' },
    { name: 'GitHub',   url: 'https://github.com/Hameem-Bhai', icon: '🐙', external: true },
    { name: 'Email Me', url: '/contact', icon: '✉️', external: false },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hameembasit99/', icon: '💼', external: true },
    { name: 'Spotify',  url: 'https://open.spotify.com/user/26hdg7m66v2zeyo0ehtp3izw3?si=456aac996cf24882', icon: '🎵', external: true },
    { name: 'VSCO',     url: 'https://vsco.co/hameem-bhai/gallery', icon: '📷', external: true }
  ];

  return (
    <>
      <div className="monalisa-bg"></div>
      <div className="links-container">
        <motion.div 
          className="links-box glass-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src="/pixel_avatar.png" alt="Avatar" className="links-avatar" />
          <h2 className="links-title">Hameem Bhai</h2>
          <p className="links-bio">Creative artist & developer.</p>

          <div className="links-list">
            {socialLinks.map((link, i) => (
              <motion.a 
                key={link.name}
                href={link.url}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noreferrer" : ""}
                className="link-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <span role="img" aria-label={link.name} style={{fontSize: '1.5rem'}}>{link.icon}</span>
                <span>{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};
export default Links;
