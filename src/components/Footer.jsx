import React from 'react';
import { PORTFOLIO_DATA } from '../data';

const Footer = () => (
  <footer className="footer">
    <p>
      © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All Rights Reserved.
    </p>
  </footer>
);

export default Footer;