import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { trainers } from '../../data/trainers';
import styles from './Trainers.module.css';
// No lucide-react brand icons imported

export default function Trainers() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className={styles.trainers} id="trainers">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Meet Our <span className={styles.highlight}>Experts</span></h2>
          <p className={styles.subtitle}>Learn from the best in the industry to achieve your ultimate fitness goals.</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {trainers.map((trainer) => (
            <motion.div key={trainer.id} variants={itemVariants} className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                
                {/* Front Face */}
                <div className={styles.flipCardFront}>
                  <img src={trainer.image} alt={trainer.name} className={styles.trainerImage} loading="lazy" />
                  <div className={styles.frontOverlay}>
                    <h3 className={styles.trainerName}>{trainer.name}</h3>
                    <p className={styles.trainerSpec}>{trainer.specialization}</p>
                    <div className={styles.badge}>{trainer.experience} Exp.</div>
                  </div>
                </div>
                
                {/* Back Face */}
                <div className={styles.flipCardBack}>
                  <h3 className={styles.trainerNameBack}>{trainer.name}</h3>
                  <p className={styles.trainerBio}>{trainer.bio}</p>
                  
                  <div className={styles.certifications}>
                    {trainer.certifications.map((cert, i) => (
                      <span key={i} className={styles.certBadge}>{cert}</span>
                    ))}
                  </div>

                  <div className={styles.socials}>
                    <a href="#" aria-label="Instagram">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                  </div>

                  <button className={`btn btn-primary ${styles.bookBtn}`}>Book Session</button>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
