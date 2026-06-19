import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    goal: '',
    plan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({ name: '', phone: '', email: '', age: '', goal: '', plan: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Start Your <span className={styles.highlight}>Journey</span></h2>
          <p className={styles.subtitle}>Join us today and transform your life.</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <input type="text" name="name" value={formState.name} onChange={handleChange} required placeholder=" " />
                  <label>Full Name</label>
                </div>
                <div className={styles.inputGroup}>
                  <input type="tel" name="phone" value={formState.phone} onChange={handleChange} required placeholder=" " />
                  <label>Phone Number</label>
                </div>
                <div className={styles.inputGroup}>
                  <input type="email" name="email" value={formState.email} onChange={handleChange} required placeholder=" " />
                  <label>Email Address</label>
                </div>
                <div className={styles.inputGroup}>
                  <input type="number" name="age" value={formState.age} onChange={handleChange} required placeholder=" " min="16" max="100" />
                  <label>Age</label>
                </div>
                <div className={styles.inputGroup}>
                  <select name="goal" value={formState.goal} onChange={handleChange} required>
                    <option value="" disabled>Select Fitness Goal</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="strength">Strength & Power</option>
                    <option value="general">General Fitness</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <select name="plan" value={formState.plan} onChange={handleChange} required>
                    <option value="" disabled>Preferred Plan</option>
                    <option value="basic">Basic Plan</option>
                    <option value="premium">Premium Plan</option>
                    <option value="elite">Elite Plan</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit" 
                className={`btn btn-primary ${styles.submitBtn} ${isSuccess ? styles.success : ''}`}
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? <span className={styles.spinner} /> : isSuccess ? 'Application Sent!' : 'Start Your Fitness Journey'}
              </button>
            </form>
          </motion.div>

          <motion.div 
            className={styles.infoContainer}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <MapPin className={styles.infoIcon} />
                <div>
                  <h3>Location</h3>
                  <p>123 Fitness Street, Your City</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <Phone className={styles.infoIcon} />
                <div>
                  <h3>Phone</h3>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <Mail className={styles.infoIcon} />
                <div>
                  <h3>Email</h3>
                  <p>contact@ironcorefitness.com</p>
                </div>
              </div>
              <div className={styles.infoCard}>
                <Clock className={styles.infoIcon} />
                <div>
                  <h3>Opening Hours</h3>
                  <p>Mon–Sat: 5:00 AM–11:00 PM<br/>Sun: 6:00 AM–10:00 PM</p>
                </div>
              </div>
            </div>

            <div className={styles.mapContainer}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531615!3d-37.816279442021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1628153401562!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                allowFullScreen="" 
                loading="lazy"
                title="Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
