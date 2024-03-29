// components
import ImageCard from './ImageCard';
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';

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
          <div className={styles.linksOfProjects}>
            <LinkButton
              openInNewTab={true}
              title={`Look at ${project.title} project of Miroslav Jovic, Frontend Developer`}
              text={'See live'}
              url={project.liveUrl}
              buttonStyle={'buttonTransparent'}
            />
            <LinkButton
              openInNewTab={true}
              title={`Look ${project.title} project of Miroslav Jovic, Frontend Developer on GitHub`}
              text={'See on GitHub'}
              url={project.gitUrl}
              buttonStyle={'flatWhite'}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProjectsCard;
