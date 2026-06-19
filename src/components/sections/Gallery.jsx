import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { galleryItems } from '../../data/gallery';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const filters = ['All', 'Equipment', 'Classes', 'Transformations'];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === activeFilter);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Our <span className={styles.highlight}>Gallery</span></h2>
          <p className={styles.subtitle}>Take a look inside our premium facilities and community.</p>
          
          <div className={styles.filters}>
            {filters.map(filter => (
              <button 
                key={filter}
                className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.grid}
          layout
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={styles.gridItem}
                onClick={() => openLightbox(index)}
              >
                <img src={item.image} alt={item.type} loading="lazy" />
                <div className={styles.itemOverlay}>
                  <span>{item.type}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.lightboxBackdrop} onClick={closeLightbox} />
            <button className={styles.closeBtn} onClick={closeLightbox}>
              <X size={32} />
            </button>
            
            <button className={styles.navBtn} onClick={prevImage} style={{ left: '2rem' }}>
              <ChevronLeft size={48} />
            </button>

            <motion.img 
              key={currentImageIndex}
              src={filteredItems[currentImageIndex].image}
              alt="Gallery Preview"
              className={styles.lightboxImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            <button className={styles.navBtn} onClick={nextImage} style={{ right: '2rem' }}>
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
