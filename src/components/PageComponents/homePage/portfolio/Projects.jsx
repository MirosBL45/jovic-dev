'use client';

// react/next stuff
import { useState } from 'react';

// components
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';
import ProjectsCard from '@/components/UIComponents/Cards/ProjectsCard';

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
      <ProjectsCard projects={partOfProject} />
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
