import { useEffect, useRef } from 'react'
import './NameReveal.css'

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => value * value * (3 - 2 * value)

function NameReveal() {
  const rootRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let cancelled = false
    let started: number | undefined
    let bounds = root.getBoundingClientRect()
    const measure = () => { bounds = root.getBoundingClientRect() }
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    window.addEventListener('resize', measure)

    const tick = (now: number) => {
      started ??= now
      const elapsed = now - started
      const padding = Math.min(14, bounds.height * 0.14)
      const start = { x: -padding, y: -padding }
      const end = { x: bounds.width + padding, y: bounds.height + padding }
      const drag = smooth(clamp((elapsed - 950) / 1000))
      const release = smooth(clamp((elapsed - 2070) / 420))
      const fade = 1 - smooth(clamp((elapsed - 2130) / 480))
      let x = start.x + (end.x - start.x) * drag
      let y = start.y + (end.y - start.y) * drag

      if (elapsed < 800) {
        // Cubic Bezier entrance; ease-out brings the tip gently to rest.
        const t = 1 - (1 - clamp((elapsed - 200) / 600)) ** 3
        const inverse = 1 - t
        const entryX = -bounds.left - 45
        x = inverse ** 3 * entryX
          + 3 * inverse ** 2 * t * (entryX + bounds.left * 0.4)
          + 3 * inverse * t ** 2 * (start.x - 35) + t ** 3 * start.x
        y = inverse ** 3 * (start.y + 65)
          + 3 * inverse ** 2 * t * (start.y - 65)
          + 3 * inverse * t ** 2 * (start.y - 12) + t ** 3 * start.y
      }

      const set = (name: string, value: number, unit = 'px') =>
        root.style.setProperty(name, `${value}${unit}`)

      set('--selection-x', start.x)
      set('--selection-y', start.y)
      set('--selection-width', (end.x - start.x) * drag)
      set('--selection-height', (end.y - start.y) * drag)
      // The text's clipping rectangle uses the same moving corner as the box.
      set('--clip-right', Math.max(0, bounds.width - (start.x + (end.x - start.x) * drag)))
      set('--clip-bottom', Math.max(0, bounds.height - (start.y + (end.y - start.y) * drag)))
      set('--cursor-x', x + release * 22)
      set('--cursor-y', y + release * 12)
      set('--cursor-opacity', elapsed < 200 ? 0 : fade, '')
      set('--selection-opacity', elapsed >= 950 ? fade : 0, '')
      // Scaling around SVG (0,0) preserves the exact pointer hotspot.
      const press = smooth(clamp((elapsed - 900) / 50))
      set('--cursor-scale', 1 - 0.08 * press * (1 - release), '')

      if (elapsed < 2610 && !motion.matches) frame = requestAnimationFrame(tick)
      else root.dataset.complete = 'true'
    }

    const finish = () => {
      if (motion.matches) {
        cancelAnimationFrame(frame)
        root.dataset.complete = 'true'
      }
    }
    motion.addEventListener('change', finish)
    void document.fonts.ready.then(() => {
      if (cancelled) return
      measure()
      if (motion.matches) finish()
      else frame = requestAnimationFrame(tick)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', measure)
      motion.removeEventListener('change', finish)
    }
  }, [])

  return (
    <h1 ref={rootRef} className="name-reveal" aria-label="Abraham May">
      <span className="name-reveal__highlight" aria-hidden="true" />
      <span className="name-reveal__text" aria-hidden="true">Abraham May</span>
      <svg
        className="name-reveal__cursor"
        viewBox="-2 -2 22 36"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 0L18 19.3Q18.5 20 17.6 20H11.1L15.1 28.6Q15.6 29.7 14.5 30.2L11.9 31.4Q10.8 31.9 10.3 30.8L6.4 22.2L1 27Q0 27.9 0 26.5Z"
          fill="currentColor"
          stroke="#fff"
          strokeWidth="1.75"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </h1>
  )
}

export default NameReveal
