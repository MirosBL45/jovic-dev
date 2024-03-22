'use client';

// react/next stuff
import { useState } from 'react';
import Image from 'next/image';

// components
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';

// data
// this is for arrayNames
import * as allData from '@/utils/allData/homePortfolio';
// this is for partOfProject
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
            <div className={styles.imageContainer}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={part.image}
                alt={`${part.title} Jovic Miroslav Frontend Developer`}
              />
            </div>
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
      <LinkButton
        openInNewTab={false}
        title={`See all Jovic Miroslav's ${project}`}
        text={`See all ${project}`}
        url={`/portfolio/${project}`}
        buttonStyle={'flat'}
      />
    </section>
  );
}

export default Projects;
