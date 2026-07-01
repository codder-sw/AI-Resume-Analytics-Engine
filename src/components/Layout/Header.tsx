import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Header.module.css';

interface Props {
  onBack?: () => void;
}

export default function Header({ onBack }: Props) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {onBack && (
          <button className={styles.backBtn} onClick={onBack}>
            <ArrowLeft size={14} /> Home
          </button>
        )}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>AI</div>
          <span>Resume Analytics</span>
        </div>
      </div>
      <button className={styles.themeBtn} onClick={toggleTheme} title="Toggle theme">
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}