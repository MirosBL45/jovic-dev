// react/next stuff
import Image from 'next/image';

// style
import styles from './cards.module.css';

function ProjectsCards({ projects }) {
  return (
    <div className={styles.projects}>
      {projects.map((project) => (
        <article key={project.id}>
          <div className={styles.imageContainer}>
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={project.image}
              alt={`${project.title} Jovic Miroslav Frontend Developer`}
            />
          </div>
          {project.techs && (
            <p className={styles.technologies}>
              {project.techs.map((tech, index) => (
                <span key={index}>
                  {tech}
                  {index !== project.techs.length - 1 && ' · '}
                </span>
              ))}
            </p>
          )}
          <h3>{project.title}</h3>
          <p className={styles.description}>{project.desc}</p>
          <div className={styles.linksOfProjects}></div>
        </article>
      ))}
    </div>
  );
}

export default ProjectsCards;
