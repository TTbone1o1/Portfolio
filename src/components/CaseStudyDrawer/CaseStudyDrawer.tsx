import { useEffect, type ReactNode } from 'react'
import type { Project } from '../../content/portfolio'
import ProjectActionButton from '../ProjectActionButton/ProjectActionButton'
import TechPill from '../TechPill/TechPill'

type CaseStudyDrawerProps = {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onWatchDemo: () => void
}

type DrawerSectionProps = {
  label: string
  children: ReactNode
}

function DrawerSection({ label, children }: DrawerSectionProps) {
  return (
    <section className="grid gap-2">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8b7e6b]">
        {label}
      </p>
      <div className="text-sm leading-7 text-[#50473d]">{children}</div>
    </section>
  )
}

function CaseStudyDrawer({
  project,
  isOpen,
  onClose,
  onWatchDemo,
}: CaseStudyDrawerProps) {
  useEffect(() => {
    if (!project || !isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, project])

  if (!project) {
    return null
  }

  return (
    <div
      className={[
        'fixed inset-0 z-40 flex justify-end bg-[#171411]/45 backdrop-blur-sm transition duration-300',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className={[
          'flex h-full w-full max-w-[40rem] flex-col overflow-y-auto border-l border-white/50 bg-[#f7f2ea] px-5 pb-8 pt-5 shadow-[0_30px_90px_rgba(23,20,17,0.24)] transition duration-300 sm:px-7',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8b7e6b]">
              Case Study {project.number}
            </p>
            <h3
              id="case-study-title"
              className="text-[clamp(2rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.04em] [font-family:var(--display)] text-[#171411]"
            >
              {project.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${project.name} case study`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9d1c5] bg-white/80 text-sm font-semibold text-[#171411] transition duration-200 hover:-translate-y-0.5 hover:border-[#c7bbaa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2323ff]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1ea]"
          >
            X
          </button>
        </div>

        <div className="grid gap-7">
          <DrawerSection label="Problem">{project.caseStudy.problem}</DrawerSection>

          <DrawerSection label="Solution">{project.caseStudy.solution}</DrawerSection>

          <DrawerSection label="My Role">{project.caseStudy.role}</DrawerSection>

          <DrawerSection label="Tech Stack">
            <div className="flex flex-wrap gap-2">
              {project.caseStudy.techStack.map((item) => (
                <TechPill key={item}>{item}</TechPill>
              ))}
            </div>
          </DrawerSection>

          <DrawerSection label="What I Learned">{project.caseStudy.learned}</DrawerSection>

          <DrawerSection label="Links">
            <div className="flex flex-wrap gap-3">
              {project.caseStudy.links.map((link) =>
                link.href ? (
                  <ProjectActionButton
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </ProjectActionButton>
                ) : (
                  <ProjectActionButton key={link.label} disabled>
                    {link.label}
                  </ProjectActionButton>
                ),
              )}

              <ProjectActionButton variant="primary" onClick={onWatchDemo}>
                Watch demo
              </ProjectActionButton>
            </div>
          </DrawerSection>
        </div>
      </aside>
    </div>
  )
}

export default CaseStudyDrawer
