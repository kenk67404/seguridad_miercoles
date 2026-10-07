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

/* ---------- Animación al hacer scroll ---------- */
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
        <filter id="brillo">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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
            <circle className="base" cx={pos.x} cy={pos.y} r="30" filter={sel ? 'url(#brillo)' : undefined} />
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

/* ---------- App ---------- */
export default function App() {
  const [activo, setActivo] = useState('c')
  useReveal()
  const pilar = PILARES.find((p) => p.id === activo)

  const barraRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (barraRef.current) barraRef.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="progreso" ref={barraRef} />

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

      {/* TRIADA INTERACTIVA */}
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

      {/* CUANDO FALLA */}
      <section className="seccion contenedor">
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

      {/* EQUILIBRIO */}
      <section className="seccion contenedor">
        <div className="equilibrio reveal">
          <span className="kicker">03 · La clave</span>
          <img
            className="ilustracion"
            src="/triada-3d.webp" width="800" height="800" decoding="async"
            alt="Ilustración 3D de la tríada: confidencialidad, integridad y disponibilidad"
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <h2>El equilibrio lo es todo</h2>
          <p>
            Reforzar un pilar de más puede debilitar otro: un sistema súper cifrado y bloqueado es
            muy confidencial, pero poco disponible. La seguridad real busca el balance según el
            valor de la información y las necesidades del negocio.
          </p>
          <div className="barras">
            {PILARES.map((p) => (
              <div key={p.id} className="barra" style={{ '--col': p.color }}>
                <span>{p.nombre}</span>
                <div className="barra-fondo">
                  <i />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="pie">
        <p>Tríada de la información · Seguridad de la información</p>
      </footer>
    </>
  )
}