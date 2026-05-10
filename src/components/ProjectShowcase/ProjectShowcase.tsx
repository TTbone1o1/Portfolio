import { useEffect, useRef, useState, type ComponentType } from 'react'
import type { Project } from '../../content/portfolio'
import ProjectActionButton from '../ProjectActionButton/ProjectActionButton'
import TechPill from '../TechPill/TechPill'

export type ProblemDemoProps = {
  project: Project
  watchToken: number
}

type ProjectShowcaseProps = {
  project: Project
  watchToken: number
  DemoComponent: ComponentType<ProblemDemoProps>
  onWatchDemo: () => void
  onOpenCaseStudy: () => void
}

function ProjectShowcase({
  project,
  watchToken,
  DemoComponent,
  onWatchDemo,
  onOpenCaseStudy,
}: ProjectShowcaseProps) {
  const articleRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = articleRef.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <article
      ref={articleRef}
      className={[
        'group relative overflow-hidden rounded-[2rem] border border-[#e4ddd2] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(247,242,234,0.92))] p-4 shadow-[0_22px_60px_rgba(23,20,17,0.08)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-5 lg:p-6',
        'hover:-translate-y-1 hover:border-[#d0c3b1] hover:shadow-[0_28px_76px_rgba(23,20,17,0.12)]',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
      ].join(' ')}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:items-stretch">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_36%),linear-gradient(160deg,rgba(255,250,244,0.98),rgba(240,232,220,0.88))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_18px_44px_rgba(23,20,17,0.06)] transition duration-500 group-hover:border-white group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_24px_56px_rgba(23,20,17,0.08)] sm:p-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),transparent_45%,rgba(35,35,255,0.06))]" />

          <div className="relative mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8b7e6b]">
                Product Launch Room
              </p>
              <p className="text-sm text-[#5f5548]">{project.tagline}</p>
            </div>

            <ProjectActionButton variant="secondary" onClick={onWatchDemo}>
              Watch demo
            </ProjectActionButton>
          </div>

          <div className="relative transition duration-500 group-hover:scale-[1.015]">
            <DemoComponent project={project} watchToken={watchToken} />
          </div>
        </div>

        <div className="flex h-full flex-col rounded-[1.75rem] border border-white/70 bg-white/84 p-5 shadow-[0_18px_44px_rgba(23,20,17,0.06)] sm:p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex rounded-full border border-[#ddd4c7] bg-[#f7f2ea] px-3 py-1 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#8b7e6b]">
                  {project.number}
                </span>
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#9a8f80]">
                  Showcase
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-[clamp(2rem,3vw,3rem)] leading-[0.95] tracking-[-0.04em] [font-family:var(--display)] text-[#171411]">
                  {project.name}
                </h3>
                <p className="text-base leading-7 text-[#4f473d]">{project.summary}</p>
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.35rem] border border-[#e5ddd1] bg-[#fbf8f3] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#9a8f80]">
                  {stat.label}
                </p>
                <p className="text-sm font-semibold tracking-[-0.01em] text-[#171411]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap gap-2.5">
            {project.techStack.map((item) => (
              <TechPill key={item}>{item}</TechPill>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            {project.viewHref ? (
              <ProjectActionButton
                href={project.viewHref}
                variant="primary"
                target="_blank"
                rel="noreferrer"
              >
                View project
              </ProjectActionButton>
            ) : (
              <ProjectActionButton variant="primary" disabled>
                View project
              </ProjectActionButton>
            )}

            <ProjectActionButton onClick={onWatchDemo}>Watch demo</ProjectActionButton>
            <ProjectActionButton variant="ghost" onClick={onOpenCaseStudy}>
              Case study
            </ProjectActionButton>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProjectShowcase
