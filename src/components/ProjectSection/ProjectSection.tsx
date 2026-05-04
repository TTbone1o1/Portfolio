import type { Project } from '../../content/portfolio'
import './ProjectSection.css'

type ProjectSectionProps = {
  project: Project
}

function ProjectSection({ project }: ProjectSectionProps) {
  return (
    <article className={['project-section', project.sectionClassName].filter(Boolean).join(' ')}>
      <div className="project-section__media">
        {project.videoSrc ? (
          <video className="project-section__video" controls preload="metadata" playsInline>
            <source src={project.videoSrc} />
          </video>
        ) : (
          <div className="project-section__placeholder">
            <span>Demo video</span>
            <small>Add video when ready</small>
          </div>
        )}
      </div>

      <div className="project-section__copy">
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
      </div>
    </article>
  )
}

export default ProjectSection
