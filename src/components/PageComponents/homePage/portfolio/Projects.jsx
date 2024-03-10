'use client';

// react/next stuff
import { useState } from 'react';
import Image from 'next/image';

// components
import FlatLink from '@/components/CustomInputs/Buttons/FlatLink';

// data
import * as allData from '@/utils/allData/homePortfolio';
import { apps, websites, games } from '@/utils/allData/homePortfolio';

// style
import styles from './portfolio.module.css';

function Projects() {
  const arrayNames = Object.keys(allData).filter((key) =>
    Array.isArray(allData[key])
  );

  const [project, setProject] = useState('apps');
  const partOfProject =
    project === 'apps' ? apps : project === 'websites' ? websites : games;

  return (
    <section className={styles.portfolioPart}>
      <div className={styles.buttons}>
        {arrayNames.map((oneName, index) => (
          <button
            key={index}
            title={`See Jovic Miroslav's ${oneName}`}
            onClick={() => {
              setProject(oneName);
            }}
            className={
              project === oneName ? `${styles.button}` : `${styles.flatButton}`
            }
          >
            {oneName}
          </button>
        ))}
      </div>
      <div className={styles.projects}>
        {partOfProject.map((part) => (
          <article key={part.id}>
            <Image
              width={363}
              height={210}
              src={part.image}
              alt={`${part.title} Jovic Miroslav Frontend Developer`}
            />
            <p className={styles.technologies}>
              {part.techs.map((oneTech, index) => (
                <span key={index}>
                  {oneTech}
                  {index !== part.techs.length - 1 && ' · '}
                </span>
              ))}
            </p>
            <h3>{part.title}</h3>
            <p className={styles.description}>{part.desc}</p>
            <div className={styles.linksOfProjects}></div>
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

export default Projects;
