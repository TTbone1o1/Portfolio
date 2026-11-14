import { useState, type CSSProperties } from 'react'
import './CursorPlayground.css'

const colors = ['#e45252', '#3789ee', '#8b5cf6', '#20a77b', '#ec8b2c', '#db4b9b', '#209eaf', '#b49326', '#6269d8', '#a56448', '#718c35', '#af5ca5']
const cursorPath = 'M0 0L16.5 17.7Q18.6 20 15.5 20H13Q10.7 20 11.7 22.2L14.4 28Q15.7 30.8 12.9 31.5Q10.9 32 9.9 29.8L7.3 24Q6.4 22 4.8 23.5L2.6 25.5Q0 28 0 24.4Z'

type Box = { x: number; y: number; width: number; height: number; delay: number; color: string }
const random = (min: number, max: number) => min + Math.random() * (max - min)
function makeBox(index: number): Box {
  return {
    x: random(0, 100), y: index % 2 === 0 ? random(0, 25) : random(75, 100),
    width: Math.round(random(65, 210)), height: Math.round(random(40, 115)),
    delay: random(0, 500), color: colors[index % colors.length],
  }
}

function CursorPlayground() {
  const [boxes, setBoxes] = useState(() => Array.from({ length: 5 }, (_, i) => makeBox(i)))
  const [selected, setSelected] = useState(0)
  const [version, setVersion] = useState(0)
  const box = boxes[selected]

  function changeCount(count: number) {
    setBoxes(previous => Array.from({ length: count }, (_, i) => previous[i] ?? makeBox(i)))
    setSelected(previous => Math.min(previous, Math.max(0, count - 1)))
  }
  function updateSize(dimension: 'width' | 'height', value: number) {
    setBoxes(previous => previous.map((item, i) => i === selected ? { ...item, [dimension]: value } : item))
  }

  return (
    <>
      <div className="cursor-field" aria-hidden="true">
        {boxes.map((item, i) => (
          <div key={`${version}-${i}`} className="random-box-slot" style={{
            '--box-x': `${item.x}%`, '--box-y': `${item.y}%`,
            '--box-width': `${item.width}px`, '--box-height': `${item.height}px`,
            '--box-color': item.color, '--box-delay': `${item.delay}ms`,
          } as CSSProperties}>
            <div className="random-box">
              <i className="random-box__dot random-box__dot--tl" />
              <i className="random-box__dot random-box__dot--tr" />
              <i className="random-box__dot random-box__dot--bl" />
              <i className="random-box__dot random-box__dot--br" />
            </div>
            <svg className="random-box__cursor" viewBox="-2 -2 22 36" fill="none">
              <path d={cursorPath} fill="currentColor" stroke="white" strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        ))}
      </div>
      <div className="cursor-controls" role="group" aria-label="Cursor playground">
        <label className="cursor-controls__count">
          <span>Cursors <output>{boxes.length}</output></span>
          <input type="range" min="0" max="12" value={boxes.length} onChange={event => changeCount(Number(event.target.value))} />
        </label>
        {box && <>
          <label>
            <span>Edit box</span>
            <select value={selected} onChange={event => setSelected(Number(event.target.value))}>
              {boxes.map((item, i) => <option key={i} value={i}>Box {i + 1} · {item.color}</option>)}
            </select>
          </label>
          <label>
            <span>Width <output>{box.width}px</output></span>
            <input type="range" min="40" max="280" value={box.width} onChange={event => updateSize('width', Number(event.target.value))} />
          </label>
          <label>
            <span>Height <output>{box.height}px</output></span>
            <input type="range" min="30" max="160" value={box.height} onChange={event => updateSize('height', Number(event.target.value))} />
          </label>
        </>}
        <button type="button" onClick={() => {
          setBoxes(previous => previous.map((_, i) => makeBox(i)))
          setVersion(previous => previous + 1)
        }}>Shuffle ↗</button>
      </div>
    </>
  )
}

export default CursorPlayground
