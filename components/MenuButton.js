import styles from './MenuButton.module.css';

export default function MenuButton({ isOpen, onClick }) {
  return (
    <button 
      className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
      aria-label="メニューを開く"
    >
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </button>
  );
} 