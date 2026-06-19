import { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { plans } from '../../data/plans';
import { Check } from 'lucide-react';
import styles from './Membership.module.css';

export default function Membership() {
  const [isYearly, setIsYearly] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className={styles.membership} id="plans">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Membership <span className={styles.highlight}>Plans</span></h2>
          <p className={styles.subtitle}>Choose the perfect plan to achieve your fitness goals.</p>
          
          <div className={styles.toggleContainer}>
            <span className={`${styles.toggleLabel} ${!isYearly ? styles.active : ''}`}>Monthly</span>
            <button 
              className={styles.toggleBtn} 
              onClick={() => setIsYearly(!isYearly)}
              aria-label="Toggle billing cycle"
            >
              <motion.div 
                className={styles.togglePill} 
                animate={{ x: isYearly ? 34 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`${styles.toggleLabel} ${isYearly ? styles.active : ''}`}>
              Yearly <span className={styles.discount}>Save 20%</span>
            </span>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={styles.cardWrapper}
            >
              <Tilt
                tiltMaxAngleX={prefersReducedMotion ? 0 : 10}
                tiltMaxAngleY={prefersReducedMotion ? 0 : 10}
                perspective={1000}
                scale={prefersReducedMotion ? 1 : plan.recommended ? 1.05 : 1}
                transitionSpeed={1500}
                className={`${styles.planCard} ${plan.recommended ? styles.recommended : ''}`}
                tiltEnable={!prefersReducedMotion}
              >
                {plan.recommended && (
                  <div className={styles.ribbon}>
                    <span>Most Popular</span>
                  </div>
                )}
                
                <h3 className={styles.planName}>{plan.name}</h3>
                
                <div className={styles.priceContainer}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.price}>
                    {isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className={styles.period}>{isYearly ? '/year' : '/month'}</span>
                </div>
                
                <ul className={styles.features}>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <Check size={20} color="var(--accent-color)" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`btn ${plan.recommended ? 'btn-primary' : 'btn-outline'} ${styles.chooseBtn}`}>
                  Choose Plan
                </button>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
