import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Cpu,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Moon,
  Phone,
  Rocket,
  Server,
  Sun,
} from "lucide-react";

const Scene3D = lazy(() => import("./components/Scene3D"));
const FlowMap = lazy(() => import("./components/FlowMap"));

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const skills = [
    "Node.js",
    "Express.js",
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "Go",
    "gRPC",
    "NATS",
  ];

  const companies = [
    {
      role: "Senior Software Engineer",
      company: "Nubewell Networks → SecPoint Technologies",
      duration: "Jul 2024 — Present",
      highlights: [
        "Built high-reliability backend services with Node.js, TypeScript, gRPC, NATS, and Redis.",
        "Migrated production services from Python to Go for improved concurrency and performance.",
        "Transitioned service communication from REST APIs to NATS-based messaging.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Locus",
      duration: "Apr 2023",
      highlights: [
        "Developed React + Redux frontend features for logistics workflows.",
        "Built and integrated backend APIs using Node.js and MongoDB.",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Geteideas",
      duration: "Jun 2023 — Feb 2024",
      highlights: [
        "Delivered MERN products across e-commerce and service-booking domains.",
        "Managed deployments and platform reliability for production clients.",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Offerplant Technologies",
      duration: "Mar 2022 — May 2023",
      highlights: [
        "Built responsive React interfaces and integrated Node.js + MongoDB APIs.",
        "Contributed feature delivery and bug fixes across MERN applications.",
      ],
    },
  ];

  const projects = [
    {
      name: "Sortlizer (Sorting Visualizer)",
      stack: "MERN",
      description:
        "Interactive algorithm visualizer for Bubble, Merge, and Quick Sort with real-time UI feedback and step-by-step behavior tracking.",
    },
    {
      name: "Restaurant Management System",
      stack: "Python, Tkinter, MySQL",
      description:
        "Desktop system for order handling, billing, and menu operations with efficient relational data management.",
    },
    {
      name: "Trade Bro",
      stack: "Python, MERN, PostgreSQL, gRPC",
      description:
        "Algorithmic trading platform with automated strategy execution and distributed service communication.",
    },
  ];

  const focusAreas = [
    {
      icon: <Server size={18} />,
      title: "Backend Reliability",
      text: "Microservices, gRPC, Redis, and resilient API contracts with measurable uptime focus.",
    },
    {
      icon: <Cpu size={18} />,
      title: "Data & Performance",
      text: "PostgreSQL, MongoDB, caching, and concurrency-focused architecture decisions.",
    },
    {
      icon: <Rocket size={18} />,
      title: "Product Shipping",
      text: "End-to-end delivery from feature ideation to deployment, optimization, and monitoring.",
    },
  ];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app-root">
      <nav className="top-nav">
        <a href="#home" className="brand">
          AD.
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#companies">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#flow">Flow</a>
          <a href="#contact">Contact</a>
          <button className="theme-toggle" onClick={toggleTheme} type="button">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      <main className="site-shell">
        <section className="hero-screen" id="home">
          <div className="hero-scene" aria-hidden="true">
            <Suspense
              fallback={<div className="lazy-panel">Loading 3D scene…</div>}
            >
              <Scene3D theme={theme} />
            </Suspense>
          </div>

          <div className="hero-copy">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
            >
              Senior Software Engineer • Full-stack Developer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Abhishek Dulat
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="subtitle"
            >
              Building reliable software across frontend, backend, and
              distributed systems — focused on speed, stability, and outcomes.
            </motion.p>
            <p className="scene-tip">Move your cursor — the 3D world responds live.</p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a
                className="btn btn-primary"
                href="/abhishek-resume-2026.pdf"
                download
              >
                <Download size={17} /> Download Resume
              </a>
              <a className="btn btn-secondary" href="#projects">
                View Projects <ArrowRight size={16} />
              </a>
            </motion.div>
            <div className="contact-row">
              <a href="mailto:abhishek11906997dulat@gmail.com">
                <Mail size={16} /> Email
              </a>
              <a href="tel:+919518118356">
                <Phone size={16} /> Call
              </a>
              <a
                href="https://linkedin.com/in/abhishekdulat"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/Abhishek37-dulat"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <h2>What I Build</h2>
          <div className="focus-grid">
            {focusAreas.map((item) => (
              <article className="focus-card" key={item.title}>
                <p className="focus-title">
                  {item.icon} {item.title}
                </p>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="chip-grid">
            {skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="section" id="companies">
          <h2>Experience</h2>
          <div className="timeline">
            {companies.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="timeline-card"
              >
                <p className="timeline-meta">{item.duration}</p>
                <h3>{item.role}</h3>
                <p className="timeline-company">
                  <Building2 size={16} /> {item.company}
                </p>
                <ul>
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <h2>Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card">
                <h3>{project.name}</h3>
                <p className="project-stack">{project.stack}</p>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section flow-section" id="flow">
          <h2>Wire your ideas with React Flow</h2>
          <p className="section-note">
            System thinking from business problem to production impact.
          </p>
          <div className="flow-wrap">
            <Suspense
              fallback={
                <div className="lazy-panel">Loading architecture map…</div>
              }
            >
              <FlowMap theme={theme} />
            </Suspense>
          </div>
        </section>

        <section className="section" id="contact">
          <h2>Education & Contact</h2>
          <div className="edu-grid">
            <article className="edu-card">
              <p className="timeline-company">
                <GraduationCap size={16} /> Lovely Professional University
              </p>
              <h3>B.Tech in Information Technology</h3>
              <p className="timeline-meta">2019 — 2023</p>
            </article>
            <article className="edu-card">
              <h3>Let&apos;s connect</h3>
              <p className="section-note">
                Open to engineering roles focused on scalable product platforms.
              </p>
              <div className="contact-row">
                <a href="mailto:abhishek11906997dulat@gmail.com">
                  <Mail size={16} /> abhishek11906997dulat@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/abhishekdulat"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={16} /> linkedin.com/in/abhishekdulat
                </a>
              </div>
            </article>
          </div>
        </section>

        <footer className="footer-note">
          © {new Date().getFullYear()} Abhishek Dulat • Cyberpunk Portfolio
          Build
        </footer>
      </main>
    </div>
  );
}

export default App;
