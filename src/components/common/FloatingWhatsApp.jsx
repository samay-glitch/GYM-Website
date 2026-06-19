import { MessageCircle } from 'lucide-react';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/910000000000" 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.whatsappBtn}
      aria-label="Chat on WhatsApp"
    >
      <div className={styles.iconContainer}>
        <MessageCircle size={28} color="#fff" />
      </div>
    </a>
  );
}
