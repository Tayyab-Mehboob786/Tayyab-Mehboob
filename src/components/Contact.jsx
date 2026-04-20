import React, { useState } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { send } from '@emailjs/browser';

// Small helper to check for a full name (basic: contains at least two words)
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

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT; // e.g. https://formspree.io/f/xxxxx
  const useServerless = import.meta.env.VITE_USE_SERVERLESS === 'true';

  const validate = () => {
    if (!isFullName(fullName)) return 'Please enter your full name (first & last name).';
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Please enter a valid email.';
    if (!message || message.trim().length < 10) return 'Message should be at least 10 characters.';
    return '';
  };

  const handleSend = async (e) => {
    e && e.preventDefault();
    setStatus(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');
    setLoading(true);

    // If EmailJS env vars are set, try sending via EmailJS
    if (serviceId && templateId && publicKey) {
      try {
        const templateParams = {
          from_name: fullName,
          from_email: email,
          message: message,
        };
        await send(serviceId, templateId, templateParams, publicKey);
        setStatus('success');
        setFullName('');
        setEmail('');
        setMessage('');
      } catch (err) {
        console.error('EmailJS error', err);
        setStatus('error');
        setError('Sending failed — please try again or use the fallback link.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // If Formspree endpoint is provided, POST to it
    if (formspreeEndpoint) {
      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: fullName,
            email,
            message,
            from_name: fullName,
            from_email: email
          })
        });

        if (res.ok) {
          setStatus('success');
          setFullName('');
          setEmail('');
          setMessage('');
        } else {
          const data = await res.json().catch(() => ({}));
          setStatus('error');
          setError(data.error || 'Formspree returned an error');
        }
      } catch (err) {
        console.error('Formspree error', err);
        setStatus('error');
        setError('Sending via Formspree failed.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // If serverless usage flagged, POST to relative API endpoint (/api/send-email)
    if (useServerless) {
      try {
        const apiUrl = import.meta.env.VITE_SERVERLESS_ENDPOINT || '/api/send-email';
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ from_name: fullName, from_email: email, message })
        });

        if (res.ok) {
          setStatus('success');
          setFullName('');
          setEmail('');
          setMessage('');
        } else {
          const d = await res.json().catch(() => ({}));
          setStatus('error');
          setError(d.error || 'Serverless endpoint returned an error');
        }
      } catch (err) {
        console.error('Serverless error', err);
        setStatus('error');
        setError('Sending via serverless endpoint failed.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Fallback: open user's email client with prefilled subject/body (mailto)
    try {
      const subject = encodeURIComponent(`Portfolio message from ${fullName}`);
      const body = encodeURIComponent(`Name: ${fullName}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:tayyabmehboob2003@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError('Could not open mail client.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="contact-box"
        >
          <h2>Let's Build Something Amazing</h2>
          <p className="section-subtitle" style={{ margin: '1rem auto' }}>
           Actively seeking internship and full-time opportunities to contribute to dynamic software engineering teams.
          </p>

          <form className="contact-form" onSubmit={handleSend}>
            <label>
              Full name
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name (first and last)"
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

            {error && <div className="form-error" style={{ color: '#e03e2d' }}>{error}</div>}

            <div className="contact-actions">
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                className="btn btn-primary"
                type="submit"
                disabled={loading}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="form-success"
              style={{ color: '#198754', marginTop: '1rem' }}
            >
              Message sent! Thank you — I'll respond as soon as I can.
            </motion.div>
          )}

          {status === 'error' && (
            <div className="form-error" style={{ color: '#e03e2d', marginTop: '1rem' }}>
              Oops — something went wrong. Please try again or use the email link above.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;