import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './BmiCalculator.module.css';

export default function BmiCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBmi = (e) => {
    e.preventDefault();
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue >= 18.5 && bmiValue <= 24.9) setCategory('Normal');
      else if (bmiValue >= 25 && bmiValue <= 29.9) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  const getRotation = () => {
    if (!bmi) return -90;
    const minBmi = 15;
    const maxBmi = 40;
    const boundedBmi = Math.max(minBmi, Math.min(bmi, maxBmi));
    const percentage = (boundedBmi - minBmi) / (maxBmi - minBmi);
    return -90 + (percentage * 180);
  };

  return (
    <section className={styles.bmiSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.formContent}>
            <h2 className={styles.title}>Calculate Your <span className={styles.highlight}>BMI</span></h2>
            <p className={styles.desc}>Determine your current fitness status to get a customized workout plan.</p>
            
            <form onSubmit={calculateBmi} className={styles.form}>
              <div className={styles.inputGroup}>
                <input 
                  type="number" 
                  placeholder="Height / cm" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <input 
                  type="number" 
                  placeholder="Weight / kg" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className={`btn btn-primary ${styles.calcBtn}`}>Calculate</button>
            </form>
          </div>

          <div className={styles.resultContent}>
            <div className={styles.gaugeContainer}>
              <div className={styles.gauge}>
                <div className={styles.gaugeColors}>
                  <div className={styles.colorSegment} style={{ backgroundColor: '#3498db' }} />
                  <div className={styles.colorSegment} style={{ backgroundColor: '#2ecc71' }} />
                  <div className={styles.colorSegment} style={{ backgroundColor: '#f1c40f' }} />
                  <div className={styles.colorSegment} style={{ backgroundColor: '#e74c3c' }} />
                </div>
                <div className={styles.gaugeCenter}>
                  <span className={styles.bmiValue}>{bmi || '--'}</span>
                  <span className={styles.bmiLabel}>BMI</span>
                </div>
                <motion.div 
                  className={styles.gaugeNeedle}
                  animate={{ rotate: getRotation() }}
                  transition={{ type: "spring", stiffness: 50, damping: 15 }}
                />
              </div>
            </div>
            
            {bmi && (
              <div className={styles.resultText}>
                Your category is <span className={styles.category}>{category}</span>.
                <br />
                <a href="#contact" className={styles.planLink}>Get a Free Personalized Plan</a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
