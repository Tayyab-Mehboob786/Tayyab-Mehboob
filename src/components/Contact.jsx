import React, { useState } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper to check for a full name (at least two words)
const isFullName = (name) => {
  if (!name) return false;
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2 && parts.every(p => p.length > 1);
};

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [error, setError] = useState('');

  const validate = () => {
    if (!isFullName(fullName)) return 'Please enter your full name (first & last name).';
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Please enter a valid email.';
    if (!message || message.trim().length < 10) return 'Message should be at least 10 characters.';
    return '';
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus(null);
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Direct call to your Vercel Serverless Function
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          from_name: fullName, 
          from_email: email, 
          message: message 
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFullName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setError(data.error || 'Server error. Please try again later.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setError('Connection failed. Please check your internet or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="contact-box"
        >
          <h2 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Let's Build Something Amazing</h2>
          <p className="section-subtitle" style={{ margin: '1.5rem auto' }}>
            Actively seeking internship and full-time opportunities to contribute to dynamic software engineering teams.
          </p>

          <form className="contact-form" onSubmit={handleSend}>
            <label>
              Full name
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your first and last name"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project or question"
                required
                rows={5}
              />
            </label>

            {error && <div className="form-error" style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</div>}

            <div className="contact-actions">
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                className="btn btn-primary"
                type="submit"
                disabled={loading}
                style={{ minWidth: '160px' }}
              >
                {loading ? 'Sending...' : 'Send Message'} <Mail size={16} />
              </motion.button>

              <div className="social-links">
                <a target="_blank" rel="noreferrer" href="https://github.com/Tayyab-Mehboob786" className="social-icon">
                  <Github size={24} />
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/tayyab-mehboob-32aa4a2b1/" className="social-icon">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </form>

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="form-success"
              style={{ color: '#22c55e', marginTop: '1.5rem', fontWeight: 600 }}
            >
              🎉 Message sent! I'll get back to you at your email soon.
            </motion.div>
          )}

          {status === 'error' && !error && (
            <div className="form-error" style={{ color: '#ef4444', marginTop: '1.5rem' }}>
              Oops — something went wrong. Please check the console or try again.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;