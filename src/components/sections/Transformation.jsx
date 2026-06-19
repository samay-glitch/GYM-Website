import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { testimonials } from '../../data/testimonials';
import { Star } from 'lucide-react';
import styles from './Transformation.module.css';

export default function Transformation() {
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleDrag = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPos(percent);
  };

  return (
    <section className={styles.transformation} id="transformations">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Real <span className={styles.highlight}>Results</span></h2>
          <p className={styles.subtitle}>See the transformations our community has achieved.</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div 
            className={styles.sliderContainer}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className={styles.beforeAfter} 
              ref={sliderRef}
              onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
              onTouchMove={(e) => handleDrag(e.touches[0])}
              onClick={handleDrag}
            >
              <div className={styles.imageAfter}>
                <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" alt="After" />
                <span className={styles.labelAfter}>AFTER</span>
              </div>
              <div className={styles.imageBefore} style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop" alt="Before" />
                <span className={styles.labelBefore}>BEFORE</span>
              </div>
              <div className={styles.sliderHandle} style={{ left: `${sliderPos}%` }}>
                <div className={styles.sliderLine} />
                <div className={styles.sliderButton}>&lt;&gt;</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.testimonials}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.carousel}>
              {testimonials.map((test, index) => (
                <div key={test.id} className={styles.testCard}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < test.rating ? "var(--accent-color)" : "transparent"} color="var(--accent-color)" />
                    ))}
                  </div>
                  <p className={styles.testText}>"{test.text}"</p>
                  <p className={styles.testName}>- {test.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
