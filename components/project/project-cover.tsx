import { Project } from "@/data/portfolio";

type ProjectCoverProps = {
  project: Project;
  compact?: boolean;
};

function InsightArtwork() {
  return (
    <div className="cover-artwork insight-artwork" aria-hidden="true">
      <span className="insight-question">消费者在说什么？</span>
      <div className="insight-orbit insight-orbit-one">
        <span>敏感</span>
        <span>保湿</span>
        <span>复购</span>
      </div>
      <div className="insight-orbit insight-orbit-two">
        <span>油皮</span>
        <span>闷痘</span>
        <span>肤感</span>
      </div>
      <div className="insight-core">
        <b>VOICE</b>
        <span>DATA</span>
        <strong>INSIGHT</strong>
      </div>
      <span className="insight-label">CLUSTER / 06</span>
    </div>
  );
}

function CreativeArtwork() {
  return (
    <div className="cover-artwork creative-artwork" aria-hidden="true">
      <div className="creative-hook">
        <span>HOOK</span>
        <strong>前三秒，先让问题被看见。</strong>
      </div>
      <div className="shot-track">
        <span>00:00</span>
        <i />
        <span>00:03</span>
      </div>
      <div className="shot-cards">
        <span>SHOT 01<br />PROBLEM</span>
        <span>SHOT 02<br />PROOF</span>
        <span>SHOT 03<br />ACTION</span>
      </div>
      <div className="creative-choice">
        <b>A</b>
        <span>or</span>
        <b>B</b>
      </div>
      <span className="creative-script">SCRIPT / CREATIVE DIRECTION</span>
    </div>
  );
}

function BenchmarkArtwork() {
  return (
    <div className="cover-artwork benchmark-artwork" aria-hidden="true">
      <span className="benchmark-heading">BEST FIT</span>
      <div className="benchmark-axis benchmark-axis-top">
        <span>QUALITY</span><span>SPEED</span><span>COST</span>
      </div>
      <div className="benchmark-grid">
        <i /><i /><i /><i /><i /><i /><i /><i /><i />
      </div>
      <div className="benchmark-score">
        <span>FIT</span>
        <strong>场景匹配</strong>
      </div>
      <span className="benchmark-note">BENCHMARK / EVIDENCE / DECISION</span>
    </div>
  );
}

export function ProjectCover({ project, compact = false }: ProjectCoverProps) {
  return (
    <article
      className={`project-cover project-cover-${project.coverType} ${compact ? "is-compact" : ""}`}
      style={{ "--accent": project.accent, "--accent-soft": project.accentSoft } as React.CSSProperties}
      aria-label={`${project.number} ${project.title} 项目封面`}
    >
      <header className="cover-header">
        <span>{project.number}</span>
        <span>HEZI / SELECTED WORK</span>
      </header>
      {project.coverType === "insight" ? <InsightArtwork /> : null}
      {project.coverType === "creative" ? <CreativeArtwork /> : null}
      {project.coverType === "benchmark" ? <BenchmarkArtwork /> : null}
      <footer className="cover-footer">
        <span>{project.title}</span>
        <b>2026</b>
      </footer>
    </article>
  );
}
