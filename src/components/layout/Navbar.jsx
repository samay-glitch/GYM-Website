import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Plans', href: '#plans' },
  { name: 'Programs', href: '#programs' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <a href="#home" className={styles.logo}>
            IRON<span className={styles.accent}>CORE</span>
          </a>

          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={styles.navLink}>
                {link.name}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a href="#contact" className={`btn btn-primary ${styles.joinBtn}`}>
              Join Now
            </a>
            <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            <nav className={styles.mobileNav}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className={`btn btn-primary ${styles.mobileJoinBtn}`}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
              >
                Join Now
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
