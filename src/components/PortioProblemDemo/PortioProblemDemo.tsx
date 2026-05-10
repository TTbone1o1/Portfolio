import { useCallback, useEffect, useRef, useState } from 'react'
import type { ProblemDemoProps } from '../ProjectShowcase/ProjectShowcase'

type DemoPhase = 'problem' | 'transitioning' | 'solved'

const macros = [
  { label: 'Calories', value: '540 kcal' },
  { label: 'Protein', value: '32 g' },
  { label: 'Carbs', value: '48 g' },
  { label: 'Fat', value: '19 g' },
]

function PortioProblemDemo({ project, watchToken }: ProblemDemoProps) {
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
          <p className="text-sm text-[#5e5448]">{project.name} turns a photo into a log.</p>
        </div>
        <div className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.18em] text-[#7c705f] uppercase">
          {project.name}
        </div>
      </div>

      <div className="relative mx-auto flex h-[15rem] w-full max-w-[34rem] items-center justify-center">
        <div
          className={[
            'absolute inset-y-2 left-1/2 flex w-full max-w-[20rem] -translate-x-1/2 flex-col overflow-hidden rounded-[1.75rem] border border-white/75 bg-white/88 shadow-[0_20px_52px_rgba(23,20,17,0.1)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            phase === 'solved'
              ? 'opacity-0 scale-95 -translate-y-6'
              : 'opacity-100 scale-100 translate-y-0',
          ].join(' ')}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#171411]">
            <span>Lunch capture</span>
            <span className="rounded-full bg-[#2323ff]/8 px-2 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#2323ff]">
              camera
            </span>
          </div>

          <div className="mx-4 mb-3 flex-1 rounded-[1.4rem] bg-[linear-gradient(145deg,#f2c286,#d86f51_48%,#75674e)] p-4">
            <div className="flex h-full items-end justify-between rounded-[1.2rem] border border-white/30 bg-black/10 p-4">
              <div>
                <p className="text-sm font-semibold text-white">Chicken bowl</p>
                <p className="text-xs text-white/75">Rice, avocado, greens</p>
              </div>
              <div className="rounded-full bg-white/20 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-white">
                tap to log
              </div>
            </div>
          </div>

          <div className="px-4 pb-4 text-left text-xs text-[#746958]">
            Photo captured. Ready for quick nutrition estimation.
          </div>
        </div>

        <div
          className={[
            'absolute inset-y-0 left-1/2 flex w-full max-w-[21rem] -translate-x-1/2 flex-col rounded-[1.75rem] border border-[#d7d0c4] bg-[#171411] p-5 text-[#f7f0e6] shadow-[0_24px_60px_rgba(23,20,17,0.24)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            phase === 'solved'
              ? 'opacity-100 scale-100 translate-y-0'
              : 'pointer-events-none opacity-0 scale-90 translate-y-6',
          ].join(' ')}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Nutrition result</p>
              <p className="text-xs text-[#d6c6ac]">Estimated from the photo</p>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#d7c7ae]">
              ready
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {macros.map((macro) => (
              <div key={macro.label} className="rounded-[1.3rem] bg-white/8 p-4">
                <p className="mb-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#cbb99f]">
                  {macro.label}
                </p>
                <p className="text-lg font-semibold tracking-[-0.02em]">{macro.value}</p>
              </div>
            ))}
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
          Built to make food logging faster with photo-based tracking.
        </p>

        <button
          type="button"
          onClick={activateDemo}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d9d1c5] bg-white/88 px-4 py-2.5 text-sm font-semibold tracking-[-0.02em] text-[#171411] shadow-[0_10px_24px_rgba(23,20,17,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c7bbaa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2323ff]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f3ec]"
        >
          {phase === 'solved' ? 'Try it again' : 'Log this meal'}
        </button>
      </div>
    </div>
  )
}

export default PortioProblemDemo
