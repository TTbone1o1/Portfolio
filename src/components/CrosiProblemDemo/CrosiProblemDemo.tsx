import { useCallback, useEffect, useRef, useState } from 'react'
import type { ProblemDemoProps } from '../ProjectShowcase/ProjectShowcase'

type DemoPhase = 'problem' | 'transitioning' | 'solved'

const repeatedLines = ['Caption', 'Thumbnail', 'Upload']

const platformBoxes = [
  { label: 'YouTube', positionClassName: 'left-0 top-8 sm:left-4' },
  { label: 'Instagram', positionClassName: 'left-1/2 top-2 -translate-x-1/2' },
  { label: 'TikTok', positionClassName: 'right-0 top-12 sm:right-4' },
]

function CrosiProblemDemo({ project, watchToken }: ProblemDemoProps) {
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
    }, 720)
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
          <p className="text-sm text-[#5e5448]">{project.name} simplifies repeat uploads.</p>
        </div>
        <div className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.18em] text-[#7c705f] uppercase">
          {project.name}
        </div>
      </div>

      <div className="relative mx-auto h-[15rem] w-full max-w-[34rem]">
        {platformBoxes.map((box, index) => {
          const transitioningClassName =
            phase === 'problem'
              ? 'opacity-100 translate-y-0 scale-100'
              : phase === 'transitioning'
                ? 'opacity-65 translate-y-8 scale-90'
                : 'opacity-0 translate-y-12 scale-75'

          return (
            <div
              key={box.label}
              className={[
                'absolute w-[10.5rem] rounded-[1.5rem] border border-white/70 bg-white/86 p-4 text-left shadow-[0_18px_40px_rgba(23,20,17,0.08)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                box.positionClassName,
                index === 1 ? 'z-10' : '',
                transitioningClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#171411]">{box.label}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#2323ff]/70" />
              </div>

              <div className="space-y-2">
                {repeatedLines.map((line) => (
                  <div
                    key={line}
                    className="flex items-center justify-between rounded-2xl bg-[#f7f2ea] px-3 py-2 text-[0.76rem] text-[#746958]"
                  >
                    <span>{line}</span>
                    <span className="h-2 w-8 rounded-full bg-[#d8d0c4]" />
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div
          className={[
            'absolute inset-x-0 top-1/2 mx-auto w-full max-w-[20rem] -translate-y-1/2 rounded-[1.7rem] border border-white/80 bg-[#171411] p-5 text-left text-[#f7f0e6] shadow-[0_24px_60px_rgba(23,20,17,0.22)] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            phase === 'solved'
              ? 'opacity-100 scale-100'
              : 'pointer-events-none opacity-0 scale-90',
          ].join(' ')}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold tracking-[-0.02em]">
              Unified upload card
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#d7c7ae]">
              Live
            </span>
          </div>

          <div className="space-y-2.5">
            {['Single caption', 'One asset upload', 'Platform mapping ready'].map((line) => (
              <div
                key={line}
                className="flex items-center justify-between rounded-2xl bg-white/8 px-3 py-2 text-[0.78rem] text-[#f7f0e6]"
              >
                <span>{line}</span>
                <span className="h-2 w-10 rounded-full bg-[#e8d7bd]/45" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p
          className={[
            'max-w-[26rem] text-sm leading-6 text-[#5e5448] transition duration-500',
            phase === 'solved' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
          ].join(' ')}
        >
          Built to remove repetitive posting work.
        </p>

        <button
          type="button"
          onClick={activateDemo}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d9d1c5] bg-white/88 px-4 py-2.5 text-sm font-semibold tracking-[-0.02em] text-[#171411] shadow-[0_10px_24px_rgba(23,20,17,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c7bbaa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2323ff]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f3ec]"
        >
          {phase === 'solved' ? 'Try it again' : 'Post this everywhere'}
        </button>
      </div>
    </div>
  )
}

export default CrosiProblemDemo
