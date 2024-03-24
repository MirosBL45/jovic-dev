// components
import ImageCard from './ImageCard';

// style
import styles from './cards.module.css';

function ProjectsCard({ projects }) {
  return (
    <div className={styles.projects}>
      {projects.map((project) => (
        <article key={project.id}>
          <ImageCard src={project.image} alt={project.title} />
          <p className={styles.technologies}>
            {project.techs.map((tech, index) => (
              <span key={index}>
                {tech}
                {index !== project.techs.length - 1 && ' · '}
              </span>
            ))}
          </p>
          <h3>{project.title}</h3>
          <p className={styles.description}>{project.desc}</p>
        </article>
      ))}
    </div>
  );
}

export default ProjectsCard;
