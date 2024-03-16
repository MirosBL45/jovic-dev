// data
import {
  technologiesText,
  technologiesTextBig,
} from '@/utils/allData/technologies';

// components
import Line from './Line';

// style
import styles from './technologies.module.css';

function Technologies() {
  return (
    <section className={styles.gridSection}>
      {technologiesTextBig.map((tech) => (
        <div key={tech.id} className={styles.technology}>
          <span>{tech.icon}</span>
          <h3>
            <Line />
            {tech.title}
          </h3>
          <p>{tech.text}</p>
        </div>
      ))}
    </section>
  );
}

export default Technologies;
