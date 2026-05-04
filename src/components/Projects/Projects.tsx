import type { Project } from '../../content/portfolio'
import ProjectSection from '../ProjectSection/ProjectSection'
import './Projects.css'

type ProjectsProps = {
  projects: Project[]
}

function Projects({ projects }: ProjectsProps) {
  return (
    <section className="projects-section" aria-labelledby="projects-heading">
      <div className="section-heading">
        <h2 id="projects-heading">Projects</h2>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <ProjectSection key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
