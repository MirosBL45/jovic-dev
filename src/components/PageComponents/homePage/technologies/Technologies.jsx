'use client';
import { useState } from 'react';

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
  const [isBig, setIsBig] = useState(false);

  const technologies = isBig ? technologiesTextBig : technologiesText;

  return (
    <div className={styles.allTechnologies}>
      <section className={styles.gridSection}>
        {technologies.map((tech) => (
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
      <p
        onClick={() => {
          setIsBig((prev) => !prev);
        }}
        className="flat"
      >
        Show {isBig ? 'less' : 'more'} technologies I use
      </p>
    </div>
  );
}

export default Technologies;
