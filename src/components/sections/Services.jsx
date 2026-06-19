import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { services } from '../../data/services';
import styles from './Services.module.css';

export default function Services() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50, rotateX: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Our Core <span className={styles.highlight}>Services</span></h2>
          <p className={styles.subtitle}>Pushing your limits with scientifically proven methods and expert guidance.</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className={styles.cardWrapper}>
              <Tilt 
                tiltMaxAngleX={15} 
                tiltMaxAngleY={15} 
                perspective={1000} 
                scale={1.05} 
                transitionSpeed={2000}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#ff3c1f"
                glarePosition="all"
                tiltEnable={!prefersReducedMotion}
                className={styles.tiltCard}
              >
                <div className={styles.cardContent}>
                  <div className={styles.iconContainer}>
                    <service.icon size={36} color="#ff3c1f" strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDescription}>{service.description}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
