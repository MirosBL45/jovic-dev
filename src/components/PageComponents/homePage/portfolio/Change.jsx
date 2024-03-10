'use client';

// react/next stuff
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// components
import FlatLink from '@/components/CustomInputs/Buttons/FlatLink';

// data
import * as allData from '@/utils/allData/homePortfolio';
import { apps, websites, games } from '@/utils/allData/homePortfolio';

// style
import styles from './portfolio.module.css';

function Change() {
  const arrayKeys = Object.keys(allData).filter((key) =>
    Array.isArray(allData[key])
  );

  const [project, setProject] = useState('apps');
  const partOfProject =
    project === 'apps' ? apps : project === 'websites' ? websites : games;

  return (
    <section className={styles.portfolioPart}>
      &bull;
      <div className={styles.buttons}>
        {arrayKeys.map((arrayKey, index) => (
          <button
            key={index}
            title={`See Jovic Miroslav's ${arrayKey}`}
            onClick={() => {
              setProject(arrayKey);
            }}
            className={
              project === arrayKey ? `${styles.button}` : `${styles.flatButton}`
            }
          >
            {arrayKey}
          </button>
        ))}
      </div>
      <div className={styles.projects}>
        {partOfProject.map((part) => (
          <article key={part.id}>
            <p>{part.title}</p>
            <p>{part.desc}</p>
          </article>
        ))}
      </div>
      <FlatLink
        openInNewTab={false}
        title={`See all ${project}`}
        text={`See all ${project}`}
        url={`/portfolio/${project}`}
      />
    </section>
  );
}

export default Change;
