import { useCallback, useEffect, useRef, useState } from 'react'
import type { ProblemDemoProps } from '../ProjectShowcase/ProjectShowcase'

type DemoPhase = 'problem' | 'transitioning' | 'solved'

function TimecappedProblemDemo({ project, watchToken }: ProblemDemoProps) {
  const [phase, setPhase] = useState<DemoPhase>('problem')
  const timeoutRef = useRef<number | null>(null)
  const previousTokenRef = useRef(watchToken)

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const activateDemo = useCallback(() => {
    clearTimer()
    setPhase('transitioning')

    timeoutRef.current = window.setTimeout(() => {
      setPhase('solved')
      timeoutRef.current = null
    }, 760)
  }, [clearTimer])

  useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [clearTimer])

  useEffect(() => {
    if (watchToken > previousTokenRef.current) {
      activateDemo()
    }

    previousTokenRef.current = watchToken
  }, [activateDemo, watchToken])

  return (
    <div className="flex min-h-[22rem] flex-col justify-between gap-5">
      <div className="flex items-center justify-between gap-3 text-left">
        <div>
          <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8d806d]">
            Try The Problem
          </p>
          <p className="text-sm text-[#5e5448]">{project.name} keeps journaling lightweight.</p>
        </div>
        <div className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.18em] text-[#7c705f] uppercase">
          {project.name}
        </div>
      </div>

      <div className="relative mx-auto flex h-[15rem] w-full max-w-[34rem] items-center justify-center">
        <div
          className={[
            'absolute inset-y-3 left-1/2 flex w-full max-w-[21rem] -translate-x-1/2 flex-col rounded-[1.8rem] border border-white/80 bg-white/88 p-5 shadow-[0_18px_48px_rgba(23,20,17,0.08)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            phase === 'solved'
              ? 'opacity-0 scale-95 rotate-[-2deg] -translate-y-5'
              : 'opacity-100 scale-100 rotate-0 translate-y-0',
          ].join(' ')}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#171411]">Blank page</span>
            <span className="rounded-full bg-[#171411]/5 px-2 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#746958]">
              today
            </span>
          </div>

          <div className="flex-1 rounded-[1.45rem] border border-dashed border-[#d8d0c4] bg-[#faf6f0] p-4">
            <p className="mb-4 text-sm text-[#746958]">What do you want to remember?</p>
            <div className="space-y-3">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="h-2 rounded-full bg-[#e3dbcf]" />
              ))}
            </div>
          </div>
        </div>

        <div
          className={[
            'absolute inset-y-1 left-1/2 flex w-full max-w-[21rem] -translate-x-1/2 rotate-[-2deg] flex-col rounded-[1.8rem] border border-[#d7d0c4] bg-[#171411] p-5 text-[#f7f0e6] shadow-[0_24px_60px_rgba(23,20,17,0.22)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            phase === 'solved'
              ? 'opacity-100 scale-100 translate-y-0'
              : 'pointer-events-none opacity-0 scale-90 translate-y-6',
          ].join(' ')}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#ccb89d]">
                May 05
              </p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.02em]">
                A small memory saved
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#d7c7ae]">
              captured
            </span>
          </div>

          <div className="flex-1 rounded-[1.45rem] bg-white/8 p-4 text-sm leading-6 text-[#f4e9d9]">
            I wanted something lighter than journaling, so I saved one clear moment
            instead of trying to write a full page.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p
          className={[
            'max-w-[27rem] text-sm leading-6 text-[#5e5448] transition duration-500',
            phase === 'solved' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
          ].join(' ')}
        >
          Built around one simple habit: save one moment per day.
        </p>

        <button
          type="button"
          onClick={activateDemo}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d9d1c5] bg-white/88 px-4 py-2.5 text-sm font-semibold tracking-[-0.02em] text-[#171411] shadow-[0_10px_24px_rgba(23,20,17,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c7bbaa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2323ff]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f3ec]"
        >
          {phase === 'solved' ? 'Try it again' : 'Capture today'}
        </button>
      </div>
    </div>
  )
}

export default TimecappedProblemDemo
