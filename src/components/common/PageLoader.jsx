import { motion } from 'framer-motion';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  return (
    <motion.div 
      className={styles.loaderContainer}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <div className={styles.content}>
        <motion.div 
          className={styles.logo}
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          IRONCORE
        </motion.div>
        <div className={styles.progressContainer}>
          <motion.div 
            className={styles.progressBar}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
