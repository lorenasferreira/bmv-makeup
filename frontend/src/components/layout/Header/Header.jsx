import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand} aria-label="BMV Makeup - Home">
        BMV
        <span>Makeup</span>
      </a>

      <nav className={styles.navigation} aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact" className={styles.booking}>
          Book
        </a>
      </nav>
    </header>
  );
}

export default Header;
