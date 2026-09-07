"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { CharacterController } from "@/components/character/character-controller";
import { CharacterLayer } from "@/components/character/character-layer";
import { PortfolioContents } from "@/components/content/portfolio-contents";
import { ProjectPlayer } from "@/components/project/project-player";
import { profile } from "@/data/portfolio";

const transformWords = [
  { base: "PORTFOLIO", alternate: "CONTENT", accent: "#4285F4", turn: "-1.4deg" },
  { base: "WORKFLOW", alternate: "GROWTH", accent: "#F4A62A", turn: "1.1deg" },
  { base: "RAG", alternate: "APPLICATION", accent: "#84A900", turn: "-0.8deg" },
  { base: "RPOMPT", alternate: "OPERATION", accent: "#77736C", turn: "1.3deg" },
] as const;

function jumpToPageTop() {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0 });
  root.style.scrollBehavior = previousBehavior;
}

function HeroProfile() {
  return (
    <section id="about" className="home-profile" aria-labelledby="profile-name">
      <div className="transform-word-list" aria-label="能力方向">
        {transformWords.map((word) => (
          <button
            key={word.base}
            className="transform-word"
            type="button"
            style={{ "--word-accent": word.accent, "--word-turn": word.turn } as React.CSSProperties}
            aria-label={`${word.base}，悬停后显示 ${word.alternate}`}
          >
            <span className="transform-word-stage" aria-hidden="true">
              <span className="transform-word-face transform-word-front">{word.base}</span>
              <span className="transform-word-face transform-word-back">{word.alternate}</span>
              <span className="transform-word-echo">{word.alternate}</span>
            </span>
          </button>
        ))}
      </div>

      <p className="profile-summary">{profile.bio}</p>

      <div className="profile-identity">
        <div className="profile-position-lines" aria-label="求职方向">
          <span>AI项目专员</span>
          <span>AI内容增长</span>
          <span>AI产品运营</span>
        </div>
        <h1 id="profile-name">{profile.name}</h1>
        <h2>
          {profile.statement.map((line) => <span key={line}>{line}</span>)}
        </h2>
      </div>

      <div className="home-portrait">
        <Image
          src="/portrait-home.jpg"
          alt="季添熠身穿黑色服装，站在建筑与屏幕环境前"
          fill
          sizes="(max-width: 767px) 42vw, 20vw"
          priority
        />
      </div>
    </section>
  );
}

function PortfolioExperience() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    jumpToPageTop();
    const frame = window.requestAnimationFrame(jumpToPageTop);

    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return (
    <div className="portfolio-home is-entered">
      <main className="portfolio-canvas">
        <HeroProfile />
        <ProjectPlayer currentIndex={currentIndex} onChange={setCurrentIndex} />
        <CharacterLayer currentProject={currentIndex} />
      </main>
      <PortfolioContents />
    </div>
  );
}

export function PortfolioShell() {
  return (
    <CharacterController>
      <PortfolioExperience />
    </CharacterController>
  );
}
