import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formElements = e.target;
    // We capture form data automatically via FormData
    const formData = new FormData(formElements);
    
    // IMPORTANT: Swap this string out for the real Web3Forms Access Key!
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        formElements.reset();
      } else {
        console.error("Error", data);
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
    
    // Reset status graphics after a few seconds
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="contact-container">
      <motion.div 
        className="contact-card glass-panel"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="contact-title">Let's Talk</h1>
        <p className="contact-subtitle">Got a project in mind or just want to say hi?</p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="John Doe" className="form-input" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="john@example.com" className="form-input" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" placeholder="Your creative ideas..." rows="5" className="form-input" required />
          </div>

          {/* Success and Error messages overlay */}
          <div style={{ minHeight: '25px', textAlign: 'center', marginBottom: '1rem' }}>
            <AnimatePresence>
              {status === 'success' && <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{color: '#4ade80', fontWeight: 'bold', margin: 0}}>Message Sent Successfully!</motion.p>}
              {status === 'error' && <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{color: '#ff80ab', fontWeight: 'bold', margin: 0}}>Failed to send. Please check your API key.</motion.p>}
            </AnimatePresence>
          </div>

          <motion.button 
            type="submit" 
            className="submit-btn"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
