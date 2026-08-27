"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BlobCharacter } from "@/components/character/blob-character";
import { projects } from "@/data/portfolio";

type ProjectDirectoryProps = {
  currentIndex: number;
};

export function ProjectDirectory({ currentIndex }: ProjectDirectoryProps) {
  const reduce = Boolean(useReducedMotion());

  return (
    <section
      id="project-directory"
      className="portfolio-directory-page"
      aria-labelledby="portfolio-directory-title"
    >
      <motion.header
        className="portfolio-directory-header"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: reduce ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="portfolio-directory-heading">
          <p>02 / PROJECT DIRECTORY</p>
          <h2 id="portfolio-directory-title">
            <span>AI PROJECT</span>
            <strong>INDEX</strong>
          </h2>
        </div>

        <p className="portfolio-directory-intro">
          三个从真实业务问题出发的 AI 项目，覆盖消费者洞察、内容增长与企业工具选型
        </p>
      </motion.header>

      <div className="portfolio-directory-grid">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className={`portfolio-directory-project${index === currentIndex ? " is-current" : ""}`}
            style={{ "--project-accent": project.accent } as React.CSSProperties}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              duration: reduce ? 0 : 0.6,
              delay: reduce ? 0 : index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <header className="portfolio-directory-project-heading">
              <p>PROJECT {project.number} / {project.tags[0]}</p>
              <h3>{project.title}</h3>
            </header>

            <div className="portfolio-directory-image">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 900px) 92vw, 32vw"
                loading="eager"
              />
              <BlobCharacter
                color={project.accent}
                size={58}
                label={`项目 ${project.number} 角色`}
                className="portfolio-directory-blob"
              />
            </div>

            <p className="portfolio-directory-description">{project.directoryDescription}</p>

            <nav className="portfolio-directory-actions" aria-label={`${project.title} 项目入口`}>
              <button className="portfolio-directory-action" type="button" disabled>
                <span>
                  <small>CASE STUDY</small>
                  <strong>项目介绍与案例演示</strong>
                </span>
                <em>即将开放</em>
              </button>
              <button className="portfolio-directory-action" type="button" disabled>
                <span>
                  <small>LIVE DEMO</small>
                  <strong>Demo 网站入口</strong>
                </span>
                <em>即将开放</em>
              </button>
            </nav>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
