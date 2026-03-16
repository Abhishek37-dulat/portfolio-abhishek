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
  Phone,
  Rocket,
  Server,
} from "lucide-react";

const FlowMap = lazy(() => import("./components/FlowMap"));

const resumeUrl = `${import.meta.env.BASE_URL}abhishek-resume-2026.pdf`;
const chipCityImage = `${import.meta.env.BASE_URL}${encodeURIComponent(
  "BEST WALLPAPERS.jpeg",
)}`;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: "easeOut" },
};

const signalCards = [
  {
    label: "Backend Development",
    value: "Node.js, Express.js, Microservices, Chi, REST APIs",
  },
  {
    label: "Languages",
    value: "JavaScript, TypeScript, Python, Go, C++, HTML, CSS",
  },
  {
    label: "Data & Caching",
    value: "PostgreSQL, MongoDB, MariaDB, ClickHouse, Redis, Elasticsearch",
  },
  {
    label: "Cloud & Messaging",
    value: "Docker, Linux deployment, AWS, gRPC, NATS",
  },
];

const skillGroups = [
  {
    title: "Backend Development",
    items: [
      "Node.js",
      "Express.js",
      "Microservices",
      "Chi (Go Router)",
      "REST API Development",
    ],
  },
  {
    title: "Web Development",
    items: ["React", "Next.js", "Tailwind", "MaterialUI", "jQuery"],
  },
  {
    title: "App Development",
    items: ["React Native"],
  },
  {
    title: "Languages",
    items: [
      "C++",
      "JavaScript",
      "TypeScript",
      "Python",
      "Go (Golang)",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Databases & Caching",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MariaDB",
      "ClickHouse",
      "Elasticsearch",
      "Redis",
    ],
  },
  {
    title: "Cloud Services",
    items: [
      "Docker",
      "Linux Server Deployment",
      "AWS Route53",
      "AWS CDN",
      "AWS Lambda",
      "AWS S3",
      "AWS Load Balancers",
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Git",
      "Zoho",
      "Postman",
      "Android Studio",
      "VS Code",
      "Visual Studio",
    ],
  },
  {
    title: "Messaging / Communication",
    items: ["gRPC", "NATS"],
  },
];

const focusAreas = [
  {
    icon: <Server size={18} />,
    title: "Reliability-First Delivery",
    text: "Scalable and secure backend services with strong API behavior, caching, and production stability.",
  },
  {
    icon: <Cpu size={18} />,
    title: "Performance Engineering",
    text: "Service optimization, Go migrations, and infrastructure choices that reduce friction under load.",
  },
  {
    icon: <Rocket size={18} />,
    title: "End-to-End Shipping",
    text: "Frontend, backend, databases, cloud deployment, and operational cleanup handled as one system.",
  },
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "Nubewell Networks -> Sechpoint Technologies",
    duration: "July 2024 - Present",
    highlights: [
      "Developed scalable and secure backend services using Node.js, TypeScript, gRPC, NATS, and Redis while contributing as a full-stack developer.",
      "Improved API performance and reliability through service optimization and efficient caching strategies.",
      "Migrated two production services from Python to Go to leverage high concurrency and better performance.",
      "Transitioned inter-service communication from REST APIs to NATS messaging for faster and more decoupled communication.",
      "Integrated centralized logging and error tracking across microservices for faster issue resolution.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Geteideas",
    duration: "June 2023 - Feb 2024",
    highlights: [
      "Developed full-stack web applications using the MERN stack with Redux across multiple client projects.",
      "Built e-commerce platforms, household service booking products, and customized product ordering systems with design features.",
      "Implemented backend services with MongoDB, PostgreSQL, and Redis, then handled deployment and hosting on Hostinger.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Locus",
    duration: "April 2023",
    highlights: [
      "Developed frontend features using React.js and Redux to improve user interaction and state management in the logistics platform.",
      "Built and integrated backend APIs using Node.js and MongoDB for logistics data and service operations.",
      "Collaborated with the engineering team to debug issues, implement new features, and improve application performance.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Offerplant Technologies",
    duration: "March 2022 - May 2023",
    highlights: [
      "Developed responsive user interfaces using React and managed application state with Redux for MERN-based web applications.",
      "Integrated frontend components with backend APIs built using Node.js and MongoDB.",
      "Contributed to feature development and bug fixes across live products.",
    ],
  },
];

const projects = [
  {
    name: "TradeBro",
    type: "Algorithmic Trading Platform",
    stack: "Python, MERN, PostgreSQL, gRPC",
    icon: <Server size={20} />,
    notes: [
      "Developed an algorithmic trading platform to execute automated trading strategies using Python for strategy execution and Node.js for backend services.",
      "Built the system with React for the frontend and integrated services using gRPC, with data stored in PostgreSQL and MongoDB.",
    ],
  },
  {
    name: "Sortlizer",
    type: "Sorting Visualizer Web App",
    stack: "MERN",
    icon: <Cpu size={20} />,
    notes: [
      "Developed an interactive web application to visualize Bubble Sort, Merge Sort, and Quick Sort step by step using React.",
      "Built dynamic UI updates and algorithm execution flows to demonstrate real-time sorting behavior.",
    ],
  },
  {
    name: "Restaurant Management System",
    type: "Desktop Application",
    stack: "Python, Tkinter, MySQL",
    icon: <Rocket size={20} />,
    notes: [
      "Developed a desktop application using Tkinter to manage order handling, billing, and menu operations.",
      "Implemented backend data storage using MySQL with Python for efficient data management and retrieval.",
    ],
  },
];

const contactNotes = [
  {
    title: "Open To",
    text: "I am open to backend-heavy roles, full-stack product work, and systems where reliability matters as much as speed.",
  },
  {
    title: "Core Strength",
    text: "My strength is turning messy requirements into cleaner services, clearer contracts, and shippable production code.",
  },
  {
    title: "Preferred Stack",
    text: "I am strongest with Node.js, TypeScript, Go, React, PostgreSQL, Redis, gRPC, NATS, Docker, and AWS.",
  },
];

const themeOptions = [
  {
    id: "aqua",
    label: "Aqua",
    description: "Teal with electric blue",
    accentA: "#4af1d6",
    accentB: "#69b7ff",
    metaColor: "#041013",
  },
  {
    id: "circuit",
    label: "Circuit",
    description: "Neon lime with amber accents",
    accentA: "#b3ff4a",
    accentB: "#ffb258",
    metaColor: "#060907",
  },
  {
    id: "copper",
    label: "Copper",
    description: "Burnt orange with brass highlights",
    accentA: "#ff9152",
    accentB: "#ffd166",
    metaColor: "#120a08",
  },
  {
    id: "ember",
    label: "Ember",
    description: "Crimson with warm sand",
    accentA: "#ff6b6b",
    accentB: "#ffc57a",
    metaColor: "#14080a",
  },
];

const defaultTheme = "aqua";

function App() {
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }

    const storedTheme = window.localStorage.getItem("portfolio-theme");
    return themeOptions.some((theme) => theme.id === storedTheme)
      ? storedTheme
      : defaultTheme;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme;
    window.localStorage.setItem("portfolio-theme", activeTheme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    const selectedTheme = themeOptions.find((theme) => theme.id === activeTheme);

    if (metaTheme && selectedTheme) {
      metaTheme.setAttribute("content", selectedTheme.metaColor);
    }
  }, [activeTheme]);

  const activeThemeOption =
    themeOptions.find((theme) => theme.id === activeTheme) ?? themeOptions[0];

  return (
    <div className="app-root">
      <div className="page-noise" aria-hidden="true" />

      <header className="topbar">
        <a href="#home" className="brand">
          <span className="brand-mark">AD</span>
          <span className="brand-copy">
            Abhishek Dulat
            <small>Senior Software Engineer • Full-stack developer</small>
          </span>
        </a>

        <div className="topbar-tools">
          <nav className="nav-links" aria-label="Primary">
            <a href="#resume">Resume</a>
            <a href="#skills">Skills</a>
            <a href="#systems">Systems</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="theme-switcher">
            <span className="theme-switcher-label">Theme</span>
            <div className="theme-select-shell">
              <span className="theme-chip-preview" aria-hidden="true">
                <span style={{ backgroundColor: activeThemeOption.accentA }} />
                <span style={{ backgroundColor: activeThemeOption.accentB }} />
              </span>
              <label className="sr-only" htmlFor="theme-select">
                Select color theme
              </label>
              <select
                id="theme-select"
                className="theme-select"
                value={activeTheme}
                onChange={(event) => setActiveTheme(event.target.value)}
              >
                {themeOptions.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="page-shell">
        <section className="hero" id="home">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="eyebrow">
              Senior software engineer • backend systems • full-stack delivery
            </p>
            <h1>Backend systems that feel engineered, not decorated.</h1>
            <p className="hero-text">
              I&apos;m Abhishek Dulat, a senior software engineer building
              backend-heavy products with Node.js, TypeScript, Go, React,
              PostgreSQL, Redis, gRPC, NATS, and cloud deployment workflows that
              stay readable under production pressure.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href={resumeUrl} download>
                <Download size={17} />
                Download Resume
              </a>
              <a className="btn btn-secondary" href="#systems">
                Explore System Flow
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="hero-links">
              <a href="mailto:abhishek11906997dulat@gmail.com">
                <Mail size={15} />
                abhishek11906997dulat@gmail.com
              </a>
              <a href="tel:+919518118356">
                <Phone size={15} />
                +91 9518118356
              </a>
              <a
                href="https://linkedin.com/in/abhishekdulat"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={15} />
                linkedin.com/in/abhishekdulat
              </a>
              <a
                href="https://github.com/Abhishek37-dulat"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={15} />
                github.com/Abhishek37-dulat
              </a>
            </div>

            <div className="signal-grid">
              {signalCards.map((item) => (
                <article key={item.label} className="signal-card">
                  <p className="panel-label">{item.label}</p>
                  <p>{item.value}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-stage"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div className="hero-board hero-board-minimal">
              <article className="hero-image-frame">
                <img
                  className="hero-board-image"
                  src={chipCityImage}
                  alt="Glowing chip city representing large-scale systems"
                />
                <div className="hero-image-tag">
                  <p className="panel-label">Backend Systems</p>
                  <p>I like systems that stay clean as they scale.</p>
                </div>
              </article>

              <article className="hero-bottom-band">
                <div>
                  <span className="panel-key">Current role</span>
                  <p>
                    I&apos;m currently a Senior Software Engineer at Nubewell
                    Networks -&gt; Sechpoint Technologies.
                  </p>
                </div>
                <div>
                  <span className="panel-key">Strongest stack</span>
                  <p>
                    I work most with Node.js, TypeScript, Go, Redis, PostgreSQL,
                    gRPC, NATS, and React.
                  </p>
                </div>
                <div>
                  <span className="panel-key">Delivery style</span>
                  <p>
                    I like working end to end, with backend-first thinking and
                    cleaner systems underneath.
                  </p>
                </div>
              </article>
            </div>
          </motion.div>
        </section>

        <motion.section className="section" id="resume" {...reveal}>
          <div className="section-heading">
            <p className="section-kicker">About Me</p>
            <h2>
              I build backend-heavy products that stay reliable as they grow.
            </h2>
            <p className="section-text">
              My recent work has focused on backend reliability, service
              communication, migrations, full-stack delivery, and the production
              details that keep systems healthy.
            </p>
          </div>

          <div className="resume-grid">
            <article className="story-card story-card-wide">
              <p className="panel-label">What I Focus On</p>
              <h3>
                I focus on scalable backend services, production reliability,
                and calmer system behavior.
              </h3>
              <p>
                My strongest recent experience is in secure backend services
                built with Node.js, TypeScript, gRPC, NATS, and Redis. I have
                also worked on service optimization, caching improvements,
                migrations from Python to Go, and centralized logging across
                microservices.
              </p>
              <div className="bullet-row">
                <span>Microservices</span>
                <span>Go migrations</span>
                <span>gRPC + NATS</span>
                <span>Centralized logging</span>
              </div>
            </article>

            <article className="focus-wrap">
              {focusAreas.map((item) => (
                <article className="focus-card" key={item.title}>
                  <p className="focus-title">
                    {item.icon}
                    {item.title}
                  </p>
                  <p>{item.text}</p>
                </article>
              ))}
            </article>

            <article className="story-card resume-visual-card">
              <p className="panel-label">What Matters To Me</p>
              <h3>
                I prefer clear structure, strong hierarchy, and systems that
                feel intentional.
              </h3>
              <p>
                In both engineering and UI, I prefer clarity over noise. I care
                about good structure, consistent decisions, and details that
                make a system easier to understand and maintain.
              </p>
              <div className="bullet-row">
                <span>Clarity</span>
                <span>Consistency</span>
                <span>Intentional details</span>
              </div>
            </article>
          </div>
        </motion.section>

        <motion.section className="section" id="skills" {...reveal}>
          <div className="section-heading">
            <p className="section-kicker">Skill Set</p>
            <h2>
              I work across backend, frontend, data, messaging, and cloud
              delivery.
            </h2>
            <p className="section-text">
              I like understanding the whole system, not just one layer of it.
            </p>
          </div>

          <div className="skill-matrix">
            {skillGroups.map((group) => (
              <article key={group.title} className="skill-card">
                <p className="panel-label">{group.title}</p>
                <p>{group.items.join(" • ")}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" id="systems" {...reveal}>
          <div className="section-heading">
            <p className="section-kicker">How I Think</p>
            <h2>This is the delivery pattern I keep coming back to.</h2>
            <p className="section-text">
              I usually work from user-facing surfaces into services, messaging,
              data, and deployment so the whole system stays connected.
            </p>
          </div>

          <div className="flow-layout">
            <div className="flow-shell">
              <Suspense
                fallback={
                  <div className="lazy-panel">Loading architecture flow...</div>
                }
              >
                <FlowMap theme={activeTheme} />
              </Suspense>
            </div>
            <div className="flow-side">
              <article className="note-card">
                <p className="panel-label">Delivery Pattern</p>
                <h3>
                  I move between frontend surfaces, resilient services,
                  messaging, caching, and shipping.
                </h3>
                <p>
                  Across my work, a similar pattern shows up again and again:
                  React on the product surface, Node.js or Go at the core, then
                  databases, caching, and deployment handled without losing the
                  system view.
                </p>
                <ul>
                  <li>
                    React, Next.js, and React Native for user-facing work.
                  </li>
                  <li>
                    Node.js, Express.js, Go, gRPC, and NATS for service layers.
                  </li>
                  <li>
                    PostgreSQL, MongoDB, MariaDB, Redis, and AWS for delivery.
                  </li>
                </ul>
              </article>

              <article className="note-card system-aside-card">
                <p className="panel-label">What Stays Consistent</p>
                <h3>
                  I try to keep architecture readable and execution practical.
                </h3>
                <p>
                  No matter the stack, I try to ship across frontend, backend,
                  data, and deployment without losing the system view.
                </p>
                <div className="bullet-row">
                  <span>APIs</span>
                  <span>Messaging</span>
                  <span>Caching</span>
                  <span>Deployments</span>
                </div>
              </article>
            </div>
          </div>
        </motion.section>

        <motion.section className="section" id="experience" {...reveal}>
          <div className="section-heading">
            <p className="section-kicker">Experience</p>
            <h2>
              These are the roles where I have built most of my systems
              experience.
            </h2>
            <p className="section-text">
              My work has mostly lived across backend services, product
              delivery, and full-stack execution.
            </p>
          </div>

          <div className="experience-grid">
            {experience.map((item) => (
              <article
                className="experience-card"
                key={`${item.company}-${item.role}`}
              >
                <p className="timeline-duration">{item.duration}</p>
                <h3>{item.role}</h3>
                <p className="timeline-company">
                  <Building2 size={16} />
                  {item.company}
                </p>
                <ul>
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" id="projects" {...reveal}>
          <div className="section-heading">
            <p className="section-kicker">Projects</p>
            <h2>
              These projects show how I build across different kinds of systems.
            </h2>
            <p className="section-text">
              They range from algorithm visualization to trading workflows and
              desktop operations tools, but they all reflect the way I like to
              build.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-body">
                  <div className="project-top">
                    <span className="project-icon">{project.icon}</span>
                    <p className="panel-label">{project.type}</p>
                  </div>
                  <h3>{project.name}</h3>
                  <p className="project-stack">{project.stack}</p>
                  <ul>
                    {project.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" id="contact" {...reveal}>
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="section-kicker">Contact</p>
              <h2>
                I am open to backend and full-stack work where system quality
                matters.
              </h2>
              <p className="section-text">
                I enjoy working on products where reliability, maintainability,
                and long-term system quality matter as much as shipping speed.
              </p>

              <div className="contact-actions">
                <a
                  className="btn btn-primary"
                  href="mailto:abhishek11906997dulat@gmail.com"
                >
                  <Mail size={16} />
                  Email Me
                </a>
                <a className="btn btn-secondary" href={resumeUrl} download>
                  <Download size={16} />
                  Resume PDF
                </a>
              </div>

              <div className="contact-links-panel">
                <a href="mailto:abhishek11906997dulat@gmail.com">
                  <Mail size={15} />
                  Abhishek11906997dulat@gmail.com
                </a>
                <a href="tel:+919518118356">
                  <Phone size={15} />
                  +91 9518118356
                </a>
                <a
                  href="https://linkedin.com/in/abhishekdulat"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={15} />
                  linkedin.com/in/abhishekdulat
                </a>
                <a
                  href="https://github.com/Abhishek37-dulat"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={15} />
                  github.com/Abhishek37-dulat
                </a>
              </div>

              <article className="education-card">
                <p className="panel-label">Education</p>
                <h3>Bachelor of Technology in Information Technology</h3>
                <p className="timeline-company">
                  <GraduationCap size={16} />
                  Lovely Professional University, Punjab, India
                </p>
                <p className="timeline-duration">2019 - 2023</p>
              </article>
            </div>

            <div className="contact-side-grid">
              {contactNotes.map((item) => (
                <article className="note-card" key={item.title}>
                  <p className="panel-label">{item.title}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <footer className="footer-note">
          © {new Date().getFullYear()} Abhishek Dulat • Resume-driven systems
          portfolio
        </footer>
      </main>
    </div>
  );
}

export default App;
