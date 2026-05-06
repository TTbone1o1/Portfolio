import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import Button from './components/Button/Button'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Name from './components/Name/Name'
import Projects from './components/Projects/Projects'
import {
  contactDetails,
  displayName,
  primaryLinks,
  projects,
  resumeHref,
} from './content/portfolio'
import './App.css'

type Viewport = {
  width: number
  height: number
}

type Point = {
  x: number
  y: number
}

type Reveal = {
  x: number
  y: number
  radius: number
}

const REVEAL_DURATION = 1050
const TRAIL_COUNT = 10

function getViewport(): Viewport {
  if (typeof window === 'undefined') {
    return { width: 1280, height: 720 }
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

function createTrailPoints(x: number, y: number) {
  return Array.from({ length: TRAIL_COUNT }, () => ({ x, y }))
}

function getRevealRadius(width: number, height: number, x: number, y: number) {
  return Math.max(
    Math.hypot(x, y),
    Math.hypot(width - x, y),
    Math.hypot(x, height - y),
    Math.hypot(width - x, height - y),
  )
}

function App() {
  const [viewport, setViewport] = useState<Viewport>(getViewport)
  const [phase, setPhase] = useState<'idle' | 'primed' | 'revealing' | 'open'>(
    'idle',
  )
  const [reveal, setReveal] = useState<Reveal | null>(null)
  const [cursorEnabled, setCursorEnabled] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(false)
  const [cursorPressed, setCursorPressed] = useState(false)
  const closeTimeoutRef = useRef<number | null>(null)
  const revealFrameRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const cursorRef = useRef<HTMLSpanElement | null>(null)
  const trailRefs = useRef<Array<HTMLSpanElement | null>>([])
  const cursorVisibleRef = useRef(false)
  const pointerTargetRef = useRef<Point>({
    x: viewport.width / 2,
    y: viewport.height / 2,
  })
  const cursorPositionRef = useRef<Point>({
    x: viewport.width / 2,
    y: viewport.height / 2,
  })
  const trailPointsRef = useRef<Point[]>(
    createTrailPoints(viewport.width / 2, viewport.height / 2),
  )

  useEffect(() => {
    const handleResize = () => {
      setViewport(getViewport())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }

      if (revealFrameRef.current !== null) {
        window.cancelAnimationFrame(revealFrameRef.current)
      }

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    let animationActive = false

    const setVisibility = (visible: boolean) => {
      cursorVisibleRef.current = visible
      setCursorVisible(visible)
    }

    const initializeCursor = (x: number, y: number) => {
      pointerTargetRef.current = { x, y }
      cursorPositionRef.current = { x, y }
      trailPointsRef.current = createTrailPoints(x, y)

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }

      trailRefs.current.forEach((node) => {
        if (!node) {
          return
        }

        node.style.transform =
          `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      })
    }

    const animateCursor = () => {
      const cursorPosition = cursorPositionRef.current
      const target = pointerTargetRef.current

      cursorPosition.x += (target.x - cursorPosition.x) * 0.26
      cursorPosition.y += (target.y - cursorPosition.y) * 0.26

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0) translate(-50%, -50%)`
      }

      let leadX = cursorPosition.x
      let leadY = cursorPosition.y

      trailPointsRef.current.forEach((point, index) => {
        const ease = Math.max(0.14, 0.24 - index * 0.014)
        point.x += (leadX - point.x) * ease
        point.y += (leadY - point.y) * ease

        const node = trailRefs.current[index]
        if (node) {
          node.style.transform =
            `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`
        }

        leadX = point.x
        leadY = point.y
      })

      if (animationActive) {
        animationFrameRef.current = window.requestAnimationFrame(animateCursor)
      }
    }

    const stopCursorAnimation = () => {
      animationActive = false
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }

    const startCursorAnimation = () => {
      if (animationActive) {
        return
      }

      animationActive = true
      initializeCursor(window.innerWidth / 2, window.innerHeight / 2)
      animationFrameRef.current = window.requestAnimationFrame(animateCursor)
    }

    const syncCursorMode = (enabled: boolean) => {
      setCursorEnabled(enabled)
      document.body.classList.toggle('custom-cursor-enabled', enabled)

      if (enabled) {
        startCursorAnimation()
        return
      }

      stopCursorAnimation()
      setVisibility(false)
      setCursorPressed(false)
    }

    const handlePointerMove = (event: globalThis.MouseEvent) => {
      if (!mediaQuery.matches) {
        return
      }

      pointerTargetRef.current = {
        x: event.clientX,
        y: event.clientY,
      }

      if (!cursorVisibleRef.current) {
        initializeCursor(event.clientX, event.clientY)
        setVisibility(true)
      }
    }

    const handlePointerDown = () => {
      if (mediaQuery.matches) {
        setCursorPressed(true)
      }
    }

    const handlePointerUp = () => {
      if (!mediaQuery.matches) {
        return
      }

      setCursorPressed(false)
    }

    const handlePointerLeave = () => {
      if (!mediaQuery.matches) {
        return
      }

      setVisibility(false)
      setCursorPressed(false)
    }

    const handleWindowBlur = () => {
      if (!mediaQuery.matches) {
        return
      }

      setVisibility(false)
      setCursorPressed(false)
    }

    const handleMediaChange = (event: MediaQueryListEvent) => {
      syncCursorMode(event.matches)
    }

    syncCursorMode(mediaQuery.matches)

    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mouseup', handlePointerUp)
    window.addEventListener('blur', handleWindowBlur)
    document.documentElement.addEventListener('mouseleave', handlePointerLeave)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMediaChange)
    } else {
      mediaQuery.addListener(handleMediaChange)
    }

    return () => {
      stopCursorAnimation()
      document.body.classList.remove('custom-cursor-enabled')
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mouseup', handlePointerUp)
      window.removeEventListener('blur', handleWindowBlur)
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave)

      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleMediaChange)
      } else {
        mediaQuery.removeListener(handleMediaChange)
      }
    }
  }, [])

  const handleReveal = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (phase !== 'idle') {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const x =
      event.clientX === 0 && event.clientY === 0
        ? bounds.width / 2
        : event.clientX - bounds.left
    const y =
      event.clientX === 0 && event.clientY === 0
        ? bounds.height / 2
        : event.clientY - bounds.top
    const radius = getRevealRadius(bounds.width, bounds.height, x, y)

    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
    }

    if (revealFrameRef.current !== null) {
      window.cancelAnimationFrame(revealFrameRef.current)
    }

    setReveal({ x, y, radius })
    setPhase('primed')

    revealFrameRef.current = window.requestAnimationFrame(() => {
      setPhase('revealing')
    })

    closeTimeoutRef.current = window.setTimeout(() => {
      setPhase('open')
      setReveal(null)
    }, REVEAL_DURATION)
  }

  const handleReset = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    if (revealFrameRef.current !== null) {
      window.cancelAnimationFrame(revealFrameRef.current)
      revealFrameRef.current = null
    }

    setReveal(null)
    setPhase('idle')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const coverStyle = reveal
    ? ({
        '--reveal-x': `${reveal.x}px`,
        '--reveal-y': `${reveal.y}px`,
        '--cover-radius': `${reveal.radius}px`,
      } as CSSProperties)
    : undefined

  return (
    <main className="stage">
      <div className="portfolio-shell">
        <section className="name-layer" aria-label="Introduction">
          <div className="name-block">
            <Name>{displayName}</Name>
            <Contact contactDetails={contactDetails} />
          </div>
        </section>

        <Projects projects={projects} />
        <Footer primaryLinks={primaryLinks} resumeHref={resumeHref} />
      </div>

      {phase === 'open' && (
        <Button variant="reset" onClick={handleReset}>
          Reset
        </Button>
      )}

      {cursorEnabled && (
        <div
          className={[
            'cursor-layer',
            cursorVisible ? 'is-visible' : '',
            cursorPressed ? 'is-pressed' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        >
          <div className="cursor-trail">
            {Array.from({ length: TRAIL_COUNT }, (_, index) => {
              const style = {
                '--trail-size': `${14 - index * 0.9}px`,
                '--trail-opacity': `${0.36 - index * 0.026}`,
              } as CSSProperties

              return (
                <span
                  key={index}
                  ref={(node) => {
                    trailRefs.current[index] = node
                  }}
                  className="cursor-trail-dot"
                  style={style}
                />
              )
            })}
          </div>

          <span ref={cursorRef} className="cursor-core" />
        </div>
      )}

      {phase !== 'open' && (
        <Button
          variant="cover"
          className={[
            phase === 'revealing' ? 'cover-revealing' : '',
            phase !== 'idle' ? 'cover-transitioning' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={handleReveal}
          style={coverStyle}
          aria-label="Reveal Abraham May"
        >
          <span className="cover-copy">Click me</span>
        </Button>
      )}
    </main>
  )
}

export default App
