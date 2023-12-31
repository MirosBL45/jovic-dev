//components
import LinkButton from '@/components/Buttons/LinkButton';

// style
import styles from './portfolio.module.css';

function Portfolio() {
  return (
    <div className={styles.container}>
      <header>
        <h2>My Work</h2>
        <h3>Take a look at some of my projects</h3>
      </header>
      <LinkButton
        title={'See more projects'}
        text={'See more projects'}
        url={'/portfolio'}
      />
    </div>
  );
}

export default Portfolio;
