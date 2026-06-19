import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { programs } from '../../data/programs';
import { ArrowRight } from 'lucide-react';
import styles from './Programs.module.css';

export default function Programs() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className={styles.programs} id="programs">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Workout <span className={styles.highlight}>Programs</span></h2>
          <p className={styles.subtitle}>Explore our targeted fitness programs designed for specific goals.</p>
        </motion.div>

        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            {programs.map((program, index) => (
              <motion.div 
                key={program.id} 
                className={styles.programCard}
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={program.image} alt={program.title} className={styles.programImg} loading="lazy" />
                <div className={styles.overlay}>
                  <div className={styles.duration}>{program.duration}</div>
                  <h3 className={styles.programTitle}>{program.title}</h3>
                  <p className={styles.programDesc}>{program.description}</p>
                  <button className={styles.viewBtn}>
                    View Program <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
