import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export interface Project {
  name: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
}

interface ProjectRowProps {
  project: Project;
  index: number;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ project, index }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!detailRef.current) return;
    if (open) {
      setHeight(detailRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <article className={`project-row ${open ? "project-row--open" : ""}`}>
      <button
        className="project-row__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${open ? t("project.close") : t("project.openProject")}: ${project.name}`}
      >
        <span className="project-row__accent" aria-hidden />

        <span className="project-row__index">
          No.&nbsp;{String(index + 1).padStart(2, "0")}
        </span>

        <span className="project-row__nam-col">
          <span className="project-row__name">{project.name}</span>
        </span>

        <span className="project-row__toggle" aria-hidden>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            style={{
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
            }}
          >
            <line
              x1="9"
              y1="2"
              x2="9"
              y2="16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="2"
              y1="9"
              x2="16"
              y2="9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        className="project-row__expand-wrap"
        style={{
          maxHeight: height,
          opacity: open ? 1 : 0,
        }}
        aria-hidden={!open}
      >
        <div ref={detailRef} className="project-row__detail">
          <p className="project-row__description">{project.description}</p>

          <div className="project-row__meta-row">
            <div className="project-row__meta-block">
              <span className="project-row__meta-label">
                {t("project.role")}
              </span>
              <span className="project-row__meta-value">{project.role}</span>
            </div>
            <div className="project-row__meta-block">
              <span className="project-row__meta-label">
                {t("project.year")}
              </span>
              <span className="project-row__meta-value">{project.year}</span>
            </div>
            <div className="project-row__meta-block">
              <span className="project-row__meta-label">
                {t("project.stack")}
              </span>
              <span className="project-row__tags-row">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-row__tag">
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {(project.liveUrl || project.codeUrl) && (
            <div className="project-row__link-row">
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-row__link"
                >
                  {t("project.viewLive")} ↗
                </a>
              )}
              {project.codeUrl && project.codeUrl !== "#" && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-row__link"
                >
                  {t("project.viewCode")} ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
