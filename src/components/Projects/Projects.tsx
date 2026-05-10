import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from 'react'
import type { Project, ProjectId } from '../../content/portfolio'
import CaseStudyDrawer from '../CaseStudyDrawer/CaseStudyDrawer'
import CrosiProblemDemo from '../CrosiProblemDemo/CrosiProblemDemo'
import PortioProblemDemo from '../PortioProblemDemo/PortioProblemDemo'
import ProjectShowcase, {
  type ProblemDemoProps,
} from '../ProjectShowcase/ProjectShowcase'
import TimecappedProblemDemo from '../TimecappedProblemDemo/TimecappedProblemDemo'

type ProjectsProps = {
  projects: Project[]
}

const demoComponentMap: Record<ProjectId, ComponentType<ProblemDemoProps>> = {
  crosi: CrosiProblemDemo,
  portio: PortioProblemDemo,
  timecapped: TimecappedProblemDemo,
}

function Projects({ projects }: ProjectsProps) {
  const [activeProjectId, setActiveProjectId] = useState<ProjectId | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [watchTokens, setWatchTokens] = useState<Record<ProjectId, number>>({
    crosi: 0,
    portio: 0,
    timecapped: 0,
  })
  const closeTimeoutRef = useRef<number | null>(null)

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId, projects],
  )

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const triggerDemo = (projectId: ProjectId) => {
    setWatchTokens((currentTokens) => ({
      ...currentTokens,
      [projectId]: currentTokens[projectId] + 1,
    }))
  }

  const openCaseStudy = (projectId: ProjectId) => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    setActiveProjectId(projectId)
    setIsDrawerOpen(true)
  }

  const closeCaseStudy = () => {
    setIsDrawerOpen(false)

    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveProjectId(null)
      closeTimeoutRef.current = null
    }, 260)
  }

  return (
    <>
      <section
        className="relative pb-4"
        aria-labelledby="projects-heading"
      >
        <div className="mb-8 flex flex-col gap-3 sm:mb-10">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-[#8b7e6b]">
            Selected Work
          </p>
          <h2
            id="projects-heading"
            className="text-[clamp(2.8rem,5vw,4.9rem)] leading-[0.94] tracking-[-0.05em] [font-family:var(--display)] text-[#171411]"
          >
            Projects
          </h2>
          <p className="max-w-[42rem] text-base leading-7 text-[#5f5548] sm:text-lg">
            A product launch room for the problems I wanted to solve, the flows I
            simplified, and the interactions I used to make each idea feel real.
          </p>
        </div>

        <div className="space-y-7 sm:space-y-8">
          {projects.map((project) => {
            const DemoComponent = demoComponentMap[project.id]

            return (
              <ProjectShowcase
                key={project.id}
                project={project}
                watchToken={watchTokens[project.id]}
                DemoComponent={DemoComponent}
                onWatchDemo={() => {
                  triggerDemo(project.id)
                }}
                onOpenCaseStudy={() => {
                  openCaseStudy(project.id)
                }}
              />
            )
          })}
        </div>
      </section>

      <CaseStudyDrawer
        project={activeProject}
        isOpen={isDrawerOpen && activeProject !== null}
        onClose={closeCaseStudy}
        onWatchDemo={() => {
          if (!activeProject) {
            return
          }

          triggerDemo(activeProject.id)
          closeCaseStudy()
        }}
      />
    </>
  )
}

export default Projects
