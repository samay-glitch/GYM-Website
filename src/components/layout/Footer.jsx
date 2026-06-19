import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <a href="#home" className={styles.logo}>
              IRON<span className={styles.accent}>CORE</span>
            </a>
            <p className={styles.desc}>
              Premium fitness center dedicated to helping you achieve your physical and mental best.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
          
          <div className={styles.linksCol}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#trainers">Trainers</a></li>
            </ul>
          </div>
          
          <div className={styles.linksCol}>
            <h3>Programs</h3>
            <ul>
              <li><a href="#programs">Strength Training</a></li>
              <li><a href="#programs">Weight Loss</a></li>
              <li><a href="#programs">Yoga & Mobility</a></li>
              <li><a href="#plans">Membership Plans</a></li>
            </ul>
          </div>
          
          <div className={styles.newsletterCol}>
            <h3>Newsletter</h3>
            <p>Subscribe for fitness tips and exclusive offers.</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">&rarr;</button>
            </form>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} IronCore Fitness. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <button className={styles.backToTop} onClick={scrollToTop} aria-label="Back to top">
        <svg viewBox="0 0 36 36" className={styles.progressRing}>
          <path
            className={styles.progressRingBg}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            className={styles.progressRingPath}
            strokeDasharray="100, 100"
            style={{ strokeDashoffset }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <ArrowUp className={styles.upIcon} size={20} />
      </button>
    </footer>
  );
}
