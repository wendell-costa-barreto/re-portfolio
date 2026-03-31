import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLanguage } from "./context/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import type { Project } from "./components/ProjectRow";
import { ProjectRow } from "./components/ProjectRow";
import "./App.css";
import ContactForm from "./components/ContactForm";

// --- Type Definitions ---
interface SkillItem {
  name: string;
  pct: number;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
}

interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
  url: string;
}

interface SiteData {
  name: string;
  tagline: string;
  intro: string;
  bio: string[];
  location: string;
  experience: string;
  email: string;
  skills: SkillCategory[];
  projects: Project[];
  posts: BlogPost[];
}

// --- Data ---
const SITE: SiteData = {
  name: "Wendell",
  tagline: "Frontend Developer",
  intro:
    "I craft interfaces that feel inevitable — clean logic made beautiful.",
  bio: [
    "I'm a frontend developer who believes great UI is the product of equal parts code and obsession. I work at the intersection of design systems, animation, and accessibility.",
    "Currently open to freelance projects and full-time roles. Based wherever the wifi is good.",
  ],
  location: "Remote-friendly",
  experience: "experience", // key — rendered via t("about.experience_value")
  email: "wendell@wendellcosta.com",

  skills: [
    {
      category: "Core",
      items: [
        { name: "HTML / CSS", pct: 97 },
        { name: "JavaScript (ES6+)", pct: 95 },
        { name: "TypeScript", pct: 85 },
        { name: "React", pct: 92 },
      ],
    },
    {
      category: "Tooling",
      items: [
        { name: "Vite / Webpack", pct: 88 },
        { name: "Tailwind CSS", pct: 90 },
        { name: "Framer Motion", pct: 80 },
        { name: "Figma → Code", pct: 85 },
      ],
    },
    {
      category: "Also fluent in",
      items: [
        { name: "Next.js", pct: 62 },
        { name: "Express.js", pct: 75 },
        { name: "Python", pct: 58 },
        { name: "Node.js", pct: 65 },
      ],
    },
  ],

  projects: [
    {
      id: "nexus",
      name: "Nexus Dashboard",
      tagline: "Real-time crypto analytics & portfolio tracker",
      description:
        "A full-stack crypto dashboard consuming the CoinGecko API to display live data on 100+ cryptocurrencies — prices, OHLC charts, market cap, and trends. Users can sign up and log in via Supabase Auth to manage a personal portfolio and track their own holdings.",
      role: "Full-stack Developer",
      year: "2025",
      tags: ["Next.js", "Supabase", "CoinGecko API"],
      liveUrl: "https://cryptocurrency-dashboard-flame.vercel.app/",
      codeUrl: "#",
    },
    {
      id: "quebec",
      name: "Québec.",
      tagline: "Tourism promotion website for Québec",
      description:
        "A 50+ page tourism website that showcases the beauty of Québec — its landscapes, culture, cities, and gastronomy. Built with a strong emphasis on visual storytelling, smooth page transitions with Framer Motion, and a fully responsive layout using Tailwind CSS.",
      role: "Frontend Developer",
      year: "2025",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://quebec-yhjt.vercel.app/",
      codeUrl: "#",
    },
    {
      id: "scheduler",
      name: "Community Scheduler",
      tagline: "Local scheduling platform — 84 users, 100+ schedules/month",
      description:
        "A private scheduling platform built for a local community, currently serving 84 active users with over 100 schedules generated per month. Features real-time data sync via Firebase, an intuitive scheduling interface, and admin controls. Demo and source code are unavailable due to sensitive client data.",
      role: "Creator & Developer",
      year: "2025 – Present",
      tags: ["React", "Tailwind CSS", "Firebase"],
      liveUrl: undefined,
      codeUrl: undefined,
      demoUnavailable: true,
    },
    {
      id: "haircut1",
      name: "Local Hairdresser — I",
      tagline: "Coming soon",
      description:
        "A website currently in development for a local hairdresser. Will feature online booking, a gallery of work, service pricing, and contact details.",
      role: "Frontend Developer",
      year: "2026",
      tags: ["React", "Tailwind CSS"],
      liveUrl: undefined,
      codeUrl: undefined,
      comingSoon: true,
    },
    {
      id: "haircut2",
      name: "Local Hairdresser — II",
      tagline: "Coming soon",
      description:
        "A second local hairdresser website in progress. Focused on a bold, brand-forward design with an emphasis on first impressions and mobile experience.",
      role: "Frontend Developer",
      year: "2026",
      tags: ["React", "Tailwind CSS"],
      liveUrl: undefined,
      codeUrl: undefined,
      comingSoon: true,
    },
  ],

  posts: [
    {
      date: "Mar 2026",
      title: "The Real Hustle of Freelance Web Dev (Nobody Talks About)",
      excerpt:
        "Why I've stopped writing breakpoints at the page level and moved all responsive logic into the component itself.",
      url: "https://medium.com/@wendell.barreto.dev/the-real-hustle-of-freelance-web-dev-nobody-talks-about-b223ef8f8296",
    },
    {
      date: "Apr 2026",
      title: "The hidden cost of too many animation libraries",
      excerpt: "Soon available",
      url: "https://www.linkedin.com/pulse/why-most-business-websites-look-good-lose-money-barreto-junior-alrvf",
    },
    {
      date: "Apr 2026",
      title: "Accessibility is a design problem, not a dev problem",
      excerpt:
        "On why accessibility debt starts in Figma and what frontend devs can do to push back — constructively.",
      url: "#",
    },
  ],
};

// --- Skill Bar Component ---
interface SkillBarProps {
  pct: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ pct }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-bar" ref={barRef}>
      <div
        className={`skill-bar-fill ${isVisible ? "loaded" : ""}`}
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
    </div>
  );
};

// --- Main Component ---
const WendellPortfolio: React.FC = () => {
  const { t } = useLanguage();
  const elementRefs = useRef<(HTMLElement | null)[]>([]);

  const registerRef = useCallback((el: HTMLElement | null) => {
    if (el && !elementRefs.current.includes(el)) {
      elementRefs.current.push(el);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elementRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const heroName = SITE.name.slice(0, 4) + SITE.name.slice(4);
  const allSkills = SITE.skills
    .flatMap((c) => c.items.map((i) => i.name))
    .slice(0, 8);

  return (
    <>
      {/* NAV */}
      <nav>
        <a className="nav-logo" href="#home">
          W.
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">{t("nav.about")}</a>
          </li>
          <li>
            <a href="#skills">{t("nav.skills")}</a>
          </li>
          <li>
            <a href="#projects">{t("nav.projects")}</a>
          </li>
          <li>
            <a href="#blog">{t("nav.writing")}</a>
          </li>
          <li>
            <a href="#contact">{t("nav.contact")}</a>
          </li>
        </ul>
        <LanguageSwitcher />
      </nav>

      {/* HERO */}
      <section id="home">
        <div className="hero-left">
          <p className="hero-tag">{t("hero.tagline")}</p>
          <h1 className="hero-name">
            {heroName.slice(0, 4)}
            <em>{heroName.slice(4)}</em>
          </h1>
        </div>
        <div className="hero-right">
          <p className="hero-intro">{t("hero.intro")}</p>
          <p className="hero-sub">{t("hero.sub")}</p>
          <a href="#projects" className="hero-cta">
            {t("hero.cta")} <span>→</span>
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-header" ref={registerRef}>
          <span className="section-number">01</span>
          <h2 className="section-title">{t("about.title")}</h2>
        </div>
        <div className="about-grid">
          <div className="about-text" ref={registerRef}>
            <p>{t("about.bio1")}</p>
            <p>{t("about.bio2")}</p>
          </div>
          <div className="about-aside" ref={registerRef}>
            <div className="aside-block">
              <h4>{t("about.location")}</h4>
              <p>{SITE.location}</p>
            </div>
            <div className="aside-block">
              <h4>{t("about.experience")}</h4>
              <p>{t("about.experience_value")}</p>
            </div>
            <div className="aside-block">
              <h4>{t("about.currently")}</h4>
              <p>{t("about.available")}</p>
            </div>
            <div className="aside-marquee">
              <h4>{t("about.loves")}</h4>
              <div className="marquee-track">
                {allSkills.map((skill, idx) => (
                  <span key={idx}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-header" ref={registerRef}>
          <span className="section-number">02</span>
          <h2 className="section-title">{t("skills.title")}</h2>
        </div>
        <div className="skills-grid">
          {SITE.skills.map((col, idx) => (
            <div key={idx} className="skill-col" ref={registerRef}>
              <h3 className="skill-col-title">
                {col.category === "Core" && t("skills.core")}
                {col.category === "Tooling" && t("skills.tooling")}
                {col.category === "Also fluent in" && t("skills.fluent")}
              </h3>
              <ul className="skill-list">
                {col.items.map((item, i) => (
                  <li key={i}>
                    <span>{item.name}</span>
                    <SkillBar pct={item.pct} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-header" ref={registerRef}>
          <span className="section-number">03</span>
          <h2 className="section-title">{t("projects.title")}</h2>
        </div>
        <div className="projects-list">
          {SITE.projects.map((project, i) => {
            const id = project.id ?? "";

            const translatedProject: Project = {
              id,
              name:
                t(`project.${id}.name`) !== `project.${id}.name`
                  ? t(`project.${id}.name`)
                  : project.name,
              tagline:
                t(`project.${id}.tagline`) !== `project.${id}.tagline`
                  ? t(`project.${id}.tagline`)
                  : project.tagline,
              description:
                t(`project.${id}.description`) !== `project.${id}.description`
                  ? t(`project.${id}.description`)
                  : project.description,
              role:
                t(`project.${id}.role`) !== `project.${id}.role`
                  ? t(`project.${id}.role`)
                  : project.role,
              year:
                t(`project.${id}.year`) !== `project.${id}.year`
                  ? t(`project.${id}.year`)
                  : project.year,
              tags: project.tags,
              liveUrl: project.liveUrl,
              codeUrl: project.codeUrl,
              demoUnavailable: project.demoUnavailable,
              comingSoon: project.comingSoon,
            };

            return (
              <ProjectRow
                key={project.id ?? project.name}
                project={translatedProject}
                index={i}
              />
            );
          })}
        </div>
      </section>

      {/* BLOG */}
      <section id="blog">
        <div className="section-header" ref={registerRef}>
          <span className="section-number">04</span>
          <h2 className="section-title">{t("blog.title")}</h2>
        </div>
        <div className="blog-grid">
          {SITE.posts.map((post, i) => (
            <div key={i} className="blog-card" ref={registerRef}>
              <span className="blog-date">{post.date}</span>
              <h3 className="blog-title">
                {i === 0 && t("blog.post1.title")}
                {i === 1 && t("blog.post2.title")}
                {i === 2 && t("blog.post3.title")}
              </h3>
              <p className="blog-excerpt">
                {i === 0 && t("blog.post1.excerpt")}
                {i === 1 && t("blog.post2.excerpt")}
                {i === 2 && t("blog.post3.excerpt")}
              </p>
              <a className="blog-read" href={post.url}>
                {t("blog.read")} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-header" ref={registerRef}>
          <span className="section-number">05</span>
          <h2 className="section-title">{t("contact.title")}</h2>
        </div>
        <div className="contact-grid">
          {/* LEFT COLUMN — unchanged */}
          <div className="contact-left" ref={registerRef}>
            <div>
              <p className="contact-big">
                {t("contact.big")
                  .split("\n")
                  .map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i === 0 && <br />}
                    </React.Fragment>
                  ))}
              </p>
              <a className="contact-email" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </div>
            <p
              style={{
                fontSize: ".8rem",
                color: "var(--muted)",
                marginTop: "2rem",
              }}
            >
              {t("contact.open")}
            </p>
          </div>

          {/* RIGHT COLUMN — now a smart component */}
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          © {new Date().getFullYear()} {SITE.name}. {t("footer.rights")}
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/wendell-costa-barreto/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/wendell-costa-barreto-junior/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </>
  );
};

export default WendellPortfolio;
