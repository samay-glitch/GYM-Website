import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Target, Trophy } from 'lucide-react';
import styles from './AboutUs.module.css';

export default function AboutUs() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={styles.title}>About <span className={styles.highlight}>IronCore</span></h2>
            <p className={styles.description}>
              IronCore Fitness is a premium fitness center dedicated to helping you unlock your full potential. 
              With world-class trainers, state-of-the-art equipment, and personalized workout programs, 
              we provide the ultimate environment for your fitness journey.
            </p>

            <div className={styles.cards}>
              <motion.div 
                className={styles.card}
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
              >
                <div className={styles.cardIcon}><Target color="#ff3c1f" /></div>
                <h3>Our Mission</h3>
                <p>To empower individuals to achieve their physical and mental best through scientifically-backed fitness programming.</p>
              </motion.div>

              <motion.div 
                className={styles.card}
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
              >
                <div className={styles.cardIcon}><Trophy color="#ff3c1f" /></div>
                <h3>Our Vision</h3>
                <p>To become the leading community-driven fitness destination recognized for transforming lives.</p>
              </motion.div>
            </div>
            
            <a href="#trainers" className={styles.meetTeamLink}>Meet Our Expert Trainers &rarr;</a>
          </motion.div>

          <motion.div 
            className={styles.imageContent}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageGrid}>
              <motion.img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop" 
                alt="Gym Interior 1" 
                className={styles.img1}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.5 }}
                loading="lazy"
              />
              <motion.img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop" 
                alt="Gym Interior 2" 
                className={styles.img2}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.5 }}
                loading="lazy"
              />
              <div className={styles.experienceBadge}>
                <span className={styles.years}>5+</span>
                <span className={styles.text}>Years of<br/>Excellence</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
