import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import HeroCanvas from './HeroCanvas';
import styles from './Hero.module.css';
const headline = "IronCore Fitness".split('');

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className={styles.hero} id="home">
      <div className={styles.background}>
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop" 
          alt="Dark Gym Background" 
          className={styles.bgImage} 
        />
        <div className={styles.overlay} />
      </div>

      {!prefersReducedMotion && (
        <div className={styles.canvasContainer}>
          <HeroCanvas />
        </div>
      )}

      <div className={styles.content}>
        <h1 className={styles.headline}>
          {headline.map((char, index) => (
            <motion.span
              key={index}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.05 + 2.5, // wait for page loader
                ease: "easeOut"
              }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
        
        <motion.h2 
          className={styles.tagline}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 3.2, ease: "easeOut" }}
        >
          Transform Your Body. Transform Your Life.
        </motion.h2>
        
        <motion.p 
          className={styles.description}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.6 }}
        >
          Join our premium fitness community with expert trainers, modern equipment, and personalized workout programs designed to help you achieve your goals.
        </motion.p>
        
        <motion.div 
          className={styles.actions}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.0 }}
        >
          <button className={`btn btn-primary ${styles.magneticBtn}`}>Join Now</button>
          <button className={`btn btn-outline`}>View Membership Plans</button>
        </motion.div>

        <motion.div 
          className={styles.stats}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.statItem}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Active Members</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Expert Trainers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Workout Programs</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>5 Years</span>
            <span className={styles.statLabel}>Experience</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </motion.div>
    </section>
  );
}
