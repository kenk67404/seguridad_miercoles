import { useEffect, useRef, useState } from 'react'
import './App.css'

/* ---------- Íconos SVG ---------- */
const ICONOS = {
  candado: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1.2" />
    </>
  ),
  integridad: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 14.5l2 2 4-4.5" />
    </>
  ),
  rayo: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  alerta: (
    <>
      <path d="M10.3 4.2L2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17.2" r="0.6" />
    </>
  ),
  escudo: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  flecha: <path d="M12 5v14M6 13l6 6 6-6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  cerrar: <path d="M6 6l12 12M18 6L6 18" />,
  reiniciar: <path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4" />,
  externo: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
}

function Icono({ nombre }) {
  return (
    <svg
      className="icono"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONOS[nombre]}
    </svg>
  )
}

/* ---------- Datos ---------- */
const PILARES = [
  {
    id: 'c',
    letra: 'C',
    nombre: 'Confidencialidad',
    lema: 'Solo quien debe, ve.',
    icono: 'candado',
    color: '#38bdf8',
    definicion:
      'Garantiza que la información solo sea accesible para las personas, procesos o sistemas autorizados. Protege la privacidad de los datos.',
    ejemplo:
      'Tu historial médico solo lo puede ver tu médico, no cualquier funcionario del hospital.',
    amenazas: ['Phishing', 'Robo de credenciales', 'Ingeniería social', 'Fuga de datos'],
    controles: ['Cifrado', 'Autenticación multifactor (MFA)', 'Control de accesos', 'Clasificación de la información'],
    falla:
      'Se filtran datos de clientes en internet. Se pierde la privacidad, la confianza y se arriesgan multas.',
  },
  {
    id: 'i',
    letra: 'I',
    nombre: 'Integridad',
    lema: 'Lo que ves es lo que es.',
    icono: 'integridad',
    color: '#a78bfa',
    definicion:
      'Asegura que la información sea exacta, completa y no sea modificada sin autorización, ya sea por error o de forma maliciosa.',
    ejemplo:
      'Si alguien altera el monto de una transferencia de $10.000 a $1.000.000, la integridad se ha roto.',
    amenazas: ['Malware', 'Manipulación de datos', 'Inyección SQL', 'Errores humanos'],
    controles: ['Hash y firmas digitales', 'Control de versiones', 'Logs y auditoría', 'Respaldos verificados'],
    falla:
      'Un registro se modifica sin que nadie lo note. Se toman decisiones basadas en datos falsos.',
  },
  {
    id: 'd',
    letra: 'D',
    nombre: 'Disponibilidad',
    lema: 'Aquí cuando la necesitas.',
    icono: 'rayo',
    color: '#34d399',
    definicion:
      'Garantiza que los sistemas y la información estén accesibles para los usuarios autorizados en el momento en que los necesitan.',
    ejemplo:
      'Una tienda online debe seguir funcionando durante un Cyber Day, aunque reciba miles de visitas.',
    amenazas: ['Ataques DDoS', 'Ransomware', 'Fallas de hardware', 'Desastres naturales'],
    controles: ['Redundancia', 'Backups y recuperación', 'Balanceo de carga', 'Plan de continuidad (BCP)'],
    falla:
      'El sistema cae durante horas. El negocio se detiene y los usuarios no pueden operar.',
  },
]

const POSICIONES = {
  c: { x: 200, y: 55 },
  i: { x: 60, y: 285 },
  d: { x: 340, y: 285 },
}

const NAV = [
  ['triada', 'Pilares'],
  ['fallas', 'Fallas'],
  ['simulador', 'Equilibrio'],
  ['quiz', 'Quiz'],
  ['casos', 'Casos'],
  ['glosario', 'Glosario'],
  ['fuentes', 'Fuentes'],
]

const PREGUNTAS = [
  {
    caso: 'Un empleado descontento publica en internet la lista completa de clientes de la empresa.',
    correcta: 'c',
    explicacion:
      'Personas no autorizadas accedieron a datos que debían ser privados: se rompió la confidencialidad.',
  },
  {
    caso: 'Un ataque de ransomware cifra los servidores y la tienda online deja de funcionar durante un día.',
    correcta: 'd',
    explicacion:
      'Los datos siguen existiendo, pero nadie puede usarlos cuando los necesita: se afectó la disponibilidad.',
  },
  {
    caso: 'Alguien modifica en la base de datos las notas de un alumno sin tener autorización.',
    correcta: 'i',
    explicacion:
      'La información fue alterada y ya no es exacta ni confiable: se violó la integridad.',
  },
]

const CASOS = [
  {
    anio: '2010',
    titulo: 'Stuxnet',
    pilar: 'i',
    texto:
      'Un gusano informático manipuló el control de centrifugadoras industriales mientras los paneles mostraban valores normales. Los datos que veían los operadores ya no eran confiables.',
  },
  {
    anio: '2016',
    titulo: 'Ataque a Dyn',
    pilar: 'd',
    texto:
      'Un ataque DDoS con una botnet de dispositivos conectados afectó a un proveedor de DNS y dejó inaccesibles servicios muy usados, como Twitter, Netflix o Reddit, en gran parte de EE. UU.',
  },
  {
    anio: '2017',
    titulo: 'Equifax',
    pilar: 'c',
    texto:
      'Se expuso información personal de alrededor de 147 millones de personas, a raíz de una vulnerabilidad que no había sido corregida a tiempo.',
  },
  {
    anio: '2021',
    titulo: 'Colonial Pipeline',
    pilar: 'd',
    texto:
      'Un ataque de ransomware obligó a detener la operación de un oleoducto clave y afectó el suministro de combustible en la costa este de EE. UU.',
  },
]

const GLOSARIO = [
  ['Cifrado', 'Proceso que convierte la información en un código ilegible para quien no tenga la clave. Protege la confidencialidad.'],
  ['Hash', 'Huella digital de un archivo o dato. Si el contenido cambia aunque sea un poco, el hash cambia: sirve para verificar integridad.'],
  ['MFA', 'Autenticación multifactor: pedir dos o más pruebas de identidad, como contraseña y código en el celular.'],
  ['DDoS', 'Ataque que satura un servicio con tráfico masivo desde muchos equipos para dejarlo inaccesible.'],
  ['Phishing', 'Engaño, normalmente por correo o mensaje, para que la víctima entregue contraseñas o datos personales.'],
  ['Ransomware', 'Software malicioso que cifra los archivos de la víctima y exige un pago para devolver el acceso.'],
  ['Backup', 'Copia de seguridad de la información, guardada en otro lugar, para poder recuperarla si algo falla.'],
  ['Firewall', 'Barrera que filtra el tráfico de red y decide qué conexiones se permiten y cuáles se bloquean.'],
]

const FUENTES = [
  {
    nombre: 'ISO/IEC 27001',
    desc: 'Estándar internacional para sistemas de gestión de seguridad de la información.',
    url: 'https://www.iso.org/standard/27001',
  },
  {
    nombre: 'NIST Cybersecurity Framework',
    desc: 'Marco de buenas prácticas para gestionar y reducir riesgos de ciberseguridad.',
    url: 'https://www.nist.gov/cyberframework',
  },
  {
    nombre: 'NIST SP 800-12 Rev. 1',
    desc: 'Introducción a la seguridad de la información, con los conceptos base de la tríada.',
    url: 'https://csrc.nist.gov/pubs/sp/800/12/r1/final',
  },
]

/* ---------- Hooks ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ---------- Efecto tilt ---------- */
function inclinar(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
  el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`)
}
function enderezar(e) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

/* ---------- Triángulo interactivo ---------- */
function Triangulo({ activo, setActivo }) {
  const { c, i, d } = POSICIONES
  const lineas = [
    [c, i],
    [i, d],
    [d, c],
  ]
  return (
    <svg
      className="triangulo"
      viewBox="0 0 400 340"
      role="img"
      aria-label="Triángulo de la información: confidencialidad, integridad y disponibilidad"
    >
      <defs>
        <linearGradient id="grad-linea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {lineas.map(([a, b], idx) => (
        <line key={idx} className="tri-linea" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
      ))}

      <g className="tri-centro">
        <circle cx="200" cy="205" r="44" />
        <text x="200" y="201" textAnchor="middle">Información</text>
        <text x="200" y="219" textAnchor="middle" className="sub">protegida</text>
      </g>

      {PILARES.map((p) => {
        const pos = POSICIONES[p.id]
        const sel = activo === p.id
        return (
          <g
            key={p.id}
            className={`tri-nodo ${sel ? 'sel' : ''}`}
            style={{ '--col': p.color }}
            onClick={() => setActivo(p.id)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActivo(p.id)}
            tabIndex={0}
            role="button"
            aria-label={p.nombre}
          >
            <circle className="pulso" cx={pos.x} cy={pos.y} r="34" />
            <circle className="base" cx={pos.x} cy={pos.y} r="30" />
            <text x={pos.x} y={pos.y + 9} textAnchor="middle" className="letra">{p.letra}</text>
            <text
              x={pos.x}
              y={pos.id === 'c' ? pos.y - 44 : pos.y + 56}
              textAnchor="middle"
              className="etiqueta"
            >
              {p.nombre}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Panel de detalle ---------- */
function Detalle({ p }) {
  return (
    <article className="detalle" key={p.id} style={{ '--col': p.color }}>
      <header className="detalle-head">
        <span className="detalle-icono">
          <Icono nombre={p.icono} />
        </span>
        <div>
          <h3>{p.nombre}</h3>
          <p className="lema">{p.lema}</p>
        </div>
      </header>
      <p className="def">{p.definicion}</p>
      <div className="ejemplo">
        <strong>Ejemplo real</strong>
        <p>{p.ejemplo}</p>
      </div>
      <div className="dos-col">
        <div>
          <h4 className="h-malo">
            <Icono nombre="alerta" /> Amenazas
          </h4>
          <ul className="chips malo">
            {p.amenazas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="h-bueno">
            <Icono nombre="escudo" /> Controles
          </h4>
          <ul className="chips bueno">
            {p.controles.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

/* ---------- Simulador de equilibrio ---------- */
const TOTAL = 180
const MENSAJES = {
  c: 'Acceso muy restringido: los datos están muy protegidos, pero a los usuarios legítimos les cuesta usarlos. La disponibilidad sufre.',
  i: 'Muchos controles y verificaciones: los datos son muy confiables, pero los procesos se vuelven más lentos y difíciles de usar.',
  d: 'Acceso rápido y siempre abierto: todo funciona fácil, pero con menos barreras crece el riesgo de filtraciones y cambios indebidos.',
  eq: 'Equilibrado: ningún pilar se sacrifica del todo. Es el punto de partida habitual; se ajusta según el valor de la información y las necesidades del negocio.',
}

function redistribuir(valores, clave, nuevo) {
  const otros = Object.keys(valores).filter((k) => k !== clave)
  const resto = TOTAL - nuevo
  const suma = otros.reduce((s, k) => s + valores[k], 0) || 1
  const res = { ...valores, [clave]: nuevo }
  otros.forEach((k) => {
    res[k] = Math.max(0, Math.min(100, Math.round((valores[k] / suma) * resto)))
  })
  return res
}

function Simulador() {
  const [v, setV] = useState({ c: 60, i: 60, d: 60 })
  const centro = { x: 200, y: 208 }

  const punto = (id) => {
    const p = POSICIONES[id]
    const k = v[id] / 100
    return `${centro.x + (p.x - centro.x) * k},${centro.y + (p.y - centro.y) * k}`
  }
  const poligono = ['c', 'i', 'd'].map(punto).join(' ')
  const exterior = ['c', 'i', 'd']
    .map((id) => `${POSICIONES[id].x},${POSICIONES[id].y}`)
    .join(' ')

  const mayor = ['c', 'i', 'd'].reduce((a, b) => (v[a] >= v[b] ? a : b))
  const mensaje = v[mayor] >= 75 ? MENSAJES[mayor] : MENSAJES.eq

  return (
    <div className="sim reveal">
      <div className="sim-controles">
        {PILARES.map((p) => (
          <div key={p.id} className="sim-control" style={{ '--col': p.color }}>
            <div className="sim-fila">
              <span className="sim-nombre">
                <Icono nombre={p.icono} /> {p.nombre}
              </span>
              <span className="sim-valor">{v[p.id]}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={v[p.id]}
              aria-label={`Nivel de ${p.nombre}`}
              onChange={(e) => setV((prev) => redistribuir(prev, p.id, Number(e.target.value)))}
            />
          </div>
        ))}
        <button className="btn-sec" onClick={() => setV({ c: 60, i: 60, d: 60 })}>
          <Icono nombre="reiniciar" /> Restablecer
        </button>
      </div>

      <div className="sim-resultado">
        <svg className="radar" viewBox="0 0 400 340" aria-hidden="true">
          <polygon className="radar-fondo" points={exterior} />
          <polygon className="radar-area" points={poligono} />
          {PILARES.map((p) => {
            const [x, y] = punto(p.id).split(',')
            return <circle key={p.id} cx={x} cy={y} r="7" fill={p.color} />
          })}
          {PILARES.map((p) => (
            <text
              key={p.id}
              className="radar-letra"
              x={POSICIONES[p.id].x}
              y={p.id === 'c' ? POSICIONES[p.id].y - 14 : POSICIONES[p.id].y + 30}
              textAnchor="middle"
              fill={p.color}
            >
              {p.letra}
            </text>
          ))}
        </svg>
        <p className="sim-msg" aria-live="polite">{mensaje}</p>
      </div>
    </div>
  )
}

/* ---------- Quiz ---------- */
function Quiz() {
  const [paso, setPaso] = useState(0)
  const [resp, setResp] = useState(null)
  const [puntos, setPuntos] = useState(0)
  const fin = paso >= PREGUNTAS.length
  const q = PREGUNTAS[paso]

  const elegir = (id) => {
    if (resp !== null) return
    setResp(id)
    if (id === q.correcta) setPuntos((p) => p + 1)
  }
  const siguiente = () => {
    setPaso((n) => n + 1)
    setResp(null)
  }
  const reiniciar = () => {
    setPaso(0)
    setResp(null)
    setPuntos(0)
  }

  if (fin) {
    const mensaje =
      puntos === PREGUNTAS.length
        ? '¡Excelente! Dominas la tríada.'
        : puntos >= 2
        ? 'Muy bien, vas por buen camino.'
        : 'Repasa los pilares y vuelve a intentarlo.'
    return (
      <div className="quiz fin reveal">
        <p className="quiz-puntaje">
          {puntos}<span>/{PREGUNTAS.length}</span>
        </p>
        <p className="quiz-final">{mensaje}</p>
        <button className="btn-sec" onClick={reiniciar}>
          <Icono nombre="reiniciar" /> Intentar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="quiz reveal">
      <div className="quiz-progreso" aria-hidden="true">
        {PREGUNTAS.map((_, idx) => (
          <i key={idx} className={idx < paso ? 'hecho' : idx === paso ? 'actual' : ''} />
        ))}
      </div>
      <p className="quiz-num">Caso {paso + 1} de {PREGUNTAS.length}</p>
      <h3 className="quiz-caso">{q.caso}</h3>
      <p className="quiz-pregunta">¿Qué pilar de la tríada se vulneró?</p>

      <div className="quiz-opciones">
        {PILARES.map((p) => {
          let estado = ''
          if (resp !== null) {
            if (p.id === q.correcta) estado = 'ok'
            else if (p.id === resp) estado = 'mal'
            else estado = 'dim'
          }
          return (
            <button
              key={p.id}
              className={`op ${estado}`}
              style={{ '--col': p.color }}
              onClick={() => elegir(p.id)}
              disabled={resp !== null}
            >
              <Icono nombre={p.icono} />
              <span>{p.nombre}</span>
              {estado === 'ok' && <Icono nombre="check" />}
              {estado === 'mal' && <Icono nombre="cerrar" />}
            </button>
          )
        })}
      </div>

      {resp !== null && (
        <div className="quiz-explica" aria-live="polite">
          <p>
            <strong>{resp === q.correcta ? 'Correcto. ' : 'No es ese. '}</strong>
            {q.explicacion}
          </p>
          <button className="btn-sec" onClick={siguiente}>
            {paso + 1 === PREGUNTAS.length ? 'Ver resultado' : 'Siguiente caso'}
          </button>
        </div>
      )}
    </div>
  )
}

/* ---------- App ---------- */
export default function App() {
  const [activo, setActivo] = useState('c')
  const [seccion, setSeccion] = useState('')
  const barraRef = useRef(null)
  const navRef = useRef(null)
  useReveal()
  const pilar = PILARES.find((p) => p.id === activo)

  // Barra de progreso y aparición del menú (sin re-render)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (barraRef.current)
        barraRef.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`
      if (navRef.current)
        navRef.current.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sección activa del menú
  useEffect(() => {
    const els = NAV.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSeccion(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className="progreso" ref={barraRef} />

      <nav className="nav" ref={navRef} aria-label="Secciones de la página">
        {NAV.map(([id, nombre]) => (
          <a key={id} href={`#${id}`} className={seccion === id ? 'on' : ''}>
            {nombre}
          </a>
        ))}
      </nav>

      <div className="fondo" aria-hidden="true">
        <span className="orbe o1" />
        <span className="orbe o2" />
        <span className="orbe o3" />
      </div>

      {/* HERO */}
      <header className="hero">
        <div className="hero-img" aria-hidden="true" />
        <div className="contenedor hero-contenido">
          <span className="etiqueta-hero">Seguridad de la información · Modelo CID</span>
          <h1>
            La <span className="grad">Tríada</span> de la Información
          </h1>
          <p className="hero-sub">
            Tres principios que sostienen toda estrategia de ciberseguridad. Si uno falla, la
            información deja de ser confiable.
          </p>
          <ul className="hero-chips">
            {PILARES.map((p) => (
              <li key={p.id} style={{ '--col': p.color }}>
                <b>{p.letra}</b> {p.nombre}
              </li>
            ))}
          </ul>
          <a href="#triada" className="btn">
            Explorar la tríada
            <span>
              <Icono nombre="flecha" />
            </span>
          </a>
        </div>
      </header>

      {/* 01 · TRIADA INTERACTIVA */}
      <section id="triada" className="seccion contenedor">
        <div className="titulo-seccion reveal">
          <span className="kicker">01 · Los tres pilares</span>
          <h2>Toca un vértice y descubre cada principio</h2>
          <p>También conocida como CIA (Confidentiality, Integrity, Availability) o CID en español.</p>
        </div>

        <div className="grid-triada reveal">
          <div className="tri-wrap">
            <Triangulo activo={activo} setActivo={setActivo} />
          </div>
          <Detalle p={pilar} />
        </div>

        <div className="tabs reveal" role="tablist">
          {PILARES.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={activo === p.id}
              className={activo === p.id ? 'tab on' : 'tab'}
              style={{ '--col': p.color }}
              onClick={() => setActivo(p.id)}
            >
              <Icono nombre={p.icono} /> {p.nombre}
            </button>
          ))}
        </div>
      </section>

      {/* 02 · CUANDO FALLA */}
      <section id="fallas" className="seccion contenedor">
        <div className="titulo-seccion reveal">
          <span className="kicker">02 · ¿Qué pasa si falla?</span>
          <h2>Cada pilar roto tiene consecuencias distintas</h2>
        </div>
        <div className="grid-falla">
          {PILARES.map((p, idx) => (
            <article
              key={p.id}
              className="tarjeta reveal"
              style={{ '--col': p.color, transitionDelay: `${idx * 120}ms` }}
              onMouseMove={inclinar}
              onMouseLeave={enderezar}
            >
              <span className="tarjeta-letra">{p.letra}</span>
              <div className="tarjeta-icono">
                <Icono nombre={p.icono} />
              </div>
              <h3>Falla en {p.nombre.toLowerCase()}</h3>
              <p>{p.falla}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 03 · EQUILIBRIO + SIMULADOR */}
      <section id="simulador" className="seccion contenedor">
        <div className="titulo-seccion reveal">
          <span className="kicker">03 · La clave</span>
          <h2>El equilibrio lo es todo</h2>
          <p>
            Reforzar un pilar de más suele debilitar otro. Mueve los controles y mira cómo se
            redistribuye la protección.
          </p>
        </div>

        <div className="equilibrio reveal">
          <img
            className="ilustracion"
            src="/triada-3d.png"
            alt="Ilustración 3D de la tríada: confidencialidad, integridad y disponibilidad"
            loading="lazy"
            decoding="async"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <p>
            Un sistema súper cifrado y bloqueado es muy confidencial, pero poco disponible. La
            seguridad real busca el balance según el valor de la información y las necesidades
            del negocio.
          </p>
        </div>

        <Simulador />
      </section>

      {/* 04 · QUIZ */}
      <section id="quiz" className="seccion contenedor">
        <div className="titulo-seccion reveal">
          <span className="kicker">04 · Ponte a prueba</span>
          <h2>¿Qué pilar se vulneró?</h2>
          <p>Tres casos rápidos para comprobar lo aprendido.</p>
        </div>
        <Quiz />
      </section>

      {/* 05 · CASOS REALES */}
      <section id="casos" className="seccion contenedor">
        <div className="titulo-seccion reveal">
          <span className="kicker">05 · Casos reales</span>
          <h2>Cuando la teoría se volvió noticia</h2>
          <p>Incidentes conocidos que muestran qué pasa al fallar cada pilar.</p>
        </div>
        <ol className="linea">
          {CASOS.map((c) => {
            const p = PILARES.find((x) => x.id === c.pilar)
            return (
              <li key={c.titulo} className="hito reveal" style={{ '--col': p.color }}>
                <div className="hito-cab">
                  <span className="hito-anio">{c.anio}</span>
                  <span className="hito-tag">{p.nombre}</span>
                </div>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </li>
            )
          })}
        </ol>
        <p className="nota">
          Casos de dominio público, resumidos. Verifica cifras y fuentes antes de citarlos.
        </p>
      </section>

      {/* 06 · GLOSARIO */}
      <section id="glosario" className="seccion contenedor">
        <div className="titulo-seccion reveal">
          <span className="kicker">06 · Glosario</span>
          <h2>Términos clave en simple</h2>
        </div>
        <div className="glosario reveal">
          {GLOSARIO.map(([t, d]) => (
            <details key={t} className="gl-item">
              <summary>{t}</summary>
              <p>{d}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 07 · FUENTES */}
      <section id="fuentes" className="seccion contenedor">
        <div className="titulo-seccion reveal">
          <span className="kicker">07 · Fuentes y referencias</span>
          <h2>Para seguir profundizando</h2>
        </div>
        <div className="fuentes">
          {FUENTES.map((f, idx) => (
            <a
              key={f.nombre}
              className="fuente reveal"
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className="fuente-cab">
                <strong>{f.nombre}</strong>
                <Icono nombre="externo" />
              </span>
              <span className="fuente-desc">{f.desc}</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="pie">
        <p>Tríada de la información · Seguridad de la información</p>
      </footer>
    </>
  )
}