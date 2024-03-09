// data
import { technologiesText } from '@/utils/allData/technologies';

// components
import Line from './Line';

// style
import styles from './technologies.module.css';
import '@/app/globals.css';

function Technologies() {
  return (
    <section className={styles.gridSection}>
      {technologiesText.map((tech) => (
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
