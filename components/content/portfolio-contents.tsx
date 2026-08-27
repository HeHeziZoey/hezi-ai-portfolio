"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BlobCharacter } from "@/components/character/blob-character";
import { contact, projects } from "@/data/portfolio";

const projectTech = [
  "Prompt Engineering · AI Workflow · QWEN API · Codex",
  "Prompt Engineering · AI Workflow · QWEN API · Codex",
  "AI Tool Evaluation · Benchmark · Codex",
];

const projectCharacterSizes = [54, 78, 64];

const buildNotes = ["Codex 项目构建", "Vercel 部署", "Qwen API 接入", "阿里云域名托管"];

const capabilityNodes = [
  { title: "AI 应用与工作流", subtitle: "Workflow / Prompt / API", position: "top" },
  { title: "数据与消费者洞察", subtitle: "Data & Insight", position: "left-top" },
  { title: "AI 工具评测", subtitle: "Evaluation", position: "left-bottom" },
  { title: "业务与产品", subtitle: "Product", position: "right-top" },
  { title: "AI 内容增长", subtitle: "Growth", position: "right-bottom" },
  { title: "项目落地与协作", subtitle: "Project Delivery", position: "bottom" },
] as const;

function revealProps(reduce: boolean) {
  return {
    initial: reduce ? false : { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reduce ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function ProjectOverview() {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.section
      id="project-overview"
      className="content-page project-overview-page"
      aria-labelledby="project-overview-title"
      {...revealProps(reduce)}
    >
      <header className="content-page-header">
        <p>02 / PROJECT OVERVIEW</p>
        <h2 id="project-overview-title">AI PROJECT</h2>
        <span>三个从真实业务问题出发的 AI 项目</span>
      </header>

      <div className="project-overview-list">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className={`project-overview-item${index % 2 === 1 ? " is-reversed" : ""}`}
            style={{ "--project-accent": project.textAccent } as React.CSSProperties}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: reduce ? 0 : 0.64, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="project-overview-heading">
              <p>{project.number}项目</p>
              <h3>{project.title}</h3>
              <strong>{projectTech[index]}</strong>
            </header>

            <div className="project-overview-media">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 900px) 92vw, 55vw"
              />
              <BlobCharacter
                color={project.accent}
                size={projectCharacterSizes[index]}
                label={`项目 ${project.number} 动画角色`}
                className="project-overview-character"
              />
            </div>

            <div className="project-overview-copy">
              <p>{project.directoryDescription}</p>
              <div className="project-overview-delivery">
                <ul aria-label="项目实现方式">
                  {buildNotes.slice(0, index === 2 ? 2 : buildNotes.length).map((note) => <li key={note}>{note}</li>)}
                </ul>
                <a
                  href={project.liveDemoUrl ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`打开${project.title}产品网站`}
                >
                  <span>网站入口</span>
                  <small>点击体验产品</small>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function WorkExperience() {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.section
      id="experience"
      className="content-page work-experience-page"
      aria-labelledby="experience-title"
      {...revealProps(reduce)}
    >
      <div className="content-section-title">
        <p>03 / EXPERIENCE</p>
        <h2 id="experience-title">工作经历</h2>
      </div>

      <div className="experience-list">
        <article className="experience-item">
          <header>
            <h3>2024.07 – 至今｜杭州启研设计教育有限公司</h3>
            <strong>运营专员｜内容增长 / 电商运营 / AI辅助内容生产</strong>
          </header>
          <ul>
            <li>将 AI 应用于小红书选题、标题、文案、视频脚本、投流方案、用户分析、竞品分析及数据复盘等实际业务环节。</li>
            <li>形成个人 AI 辅助视频流程「AI策划/脚本 - AI素材粗剪 - 人工拍摄/精剪 - AI封面初稿 - 人工优化」，将长口播视频制作周期由约 4–5 小时缩短至约 2 小时。</li>
            <li>搭建官方号、专业号、个人号、素人号组成的小红书账号矩阵，近半年官方账号公域引流转化 GMV 110W+，其他矩阵账号累计 GMV 60W+，策划 UGC 共创与用户裂变活动，实现阶段性新增用户提升 25%。</li>
            <li>统筹自然流量及聚光、乘风等付费投流，根据曝光、点击、转化及 GMV，AI 辅助持续优化内容与投放策略，将留资成本均价从单条 80 下降至 50。</li>
            <li>独立完成淘宝、小红书店铺 0–1 搭建与运营；通过周度数据复盘优化内容、活动与投放，实现阶段性 GMV 环比增长 20%。</li>
          </ul>
        </article>

        <article className="experience-item is-compact">
          <header>
            <h3>2022.06–2023.06｜杭州北斗星色彩研究有限公司</h3>
            <strong>视觉设计助理</strong>
          </header>
          <p>艺术家徐方油画与 AIGC 艺术联展的展览策划及落地执行、立邦品牌年度色彩趋势研究及视觉方案落地等。</p>
        </article>
      </div>

      <BlobCharacter color="#161616" size={82} label="工作经历动画角色" className="experience-character" />
    </motion.section>
  );
}

function ContentPractice() {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.section
      id="content-practice"
      className="content-page content-practice-page"
      aria-labelledby="content-practice-title"
      {...revealProps(reduce)}
    >
      <div className="content-practice-copy">
        <div className="content-section-title">
          <p>04 / CONTENT PRACTICE</p>
          <h2 id="content-practice-title">内容运营实践</h2>
        </div>
        <h3>小红书、B站自媒体运营</h3>
        <div className="content-practice-description">
          <p>账号「禾子Zoey」，小红书3.9K粉丝、B站 1k 粉丝。</p>
          <p>独立负责账号内容策划、脚本撰写、拍摄剪辑、数据分析，熟练掌握平台流量逻辑与内容运营方法，个人分账号单篇笔记最高阅读量达23w+。</p>
          <p>搭建个人小红书店铺，独立负责全流程。</p>
        </div>
        <BlobCharacter color="#161616" size={50} label="内容运营动画角色" className="content-practice-character" />
      </div>

      <div className="social-evidence" aria-label="小红书与B站账号页面展示">
        <div className="social-evidence-item">
          <div className="social-device-mockup" role="img" aria-label="禾子Zoey小红书主页手机样机">
            <span className="social-device-speaker" aria-hidden="true" />
            <div className="social-device-screen">
              <Image
                src="/social-xiaohongshu.png"
                alt="禾子Zoey小红书主页高清截图"
                fill
                sizes="(max-width: 430px) 142px, (max-width: 900px) 160px, 210px"
              />
            </div>
          </div>
          <a href="https://xhslink.cn/m/9pJwxuPUm85" target="_blank" rel="noreferrer" aria-label="打开禾子Zoey小红书主页">
            <span>小红书主页</span>
          </a>
        </div>
        <div className="social-evidence-item">
          <div className="social-device-mockup" role="img" aria-label="禾子Zoey B站主页手机样机">
            <span className="social-device-speaker" aria-hidden="true" />
            <div className="social-device-screen">
              <Image
                src="/social-bilibili.png"
                alt="禾子Zoey B站主页高清截图"
                fill
                sizes="(max-width: 430px) 142px, (max-width: 900px) 160px, 210px"
              />
            </div>
          </div>
          <a href="https://b23.tv/sfMIQp5" target="_blank" rel="noreferrer" aria-label="打开禾子Zoey B站主页">
            <span>B站主页</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}

function CapabilityMap() {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.section
      id="capability-map"
      className="content-page capability-page"
      aria-labelledby="capability-title"
      {...revealProps(reduce)}
    >
      <div className="content-section-title">
        <p>05 / CAPABILITY MAP</p>
        <h2 id="capability-title">能力地图</h2>
      </div>

      <div className="capability-map">
        <div className="capability-spokes" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => <i key={index} style={{ "--spoke": index } as React.CSSProperties} />)}
        </div>
        <div className="capability-center">
          <strong>AI × 业务 × 内容增长</strong>
          <span>AI Business Operator</span>
        </div>
        {capabilityNodes.map((node) => (
          <article key={node.title} className={`capability-node is-${node.position}`}>
            <h3>{node.title}</h3>
            <p>{node.subtitle}</p>
          </article>
        ))}
      </div>

      <BlobCharacter color="#161616" size={104} label="能力地图动画角色" className="capability-character" />
    </motion.section>
  );
}

function ClosingPage() {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.section className="closing-page" aria-label="工作方式与联系方式" {...revealProps(reduce)}>
      <article className="content-page work-method-panel">
        <div className="content-section-title">
          <p>06 / HOW I WORK</p>
          <h2>工作方式</h2>
        </div>
        <p className="work-method-flow">
          <span className="work-step">业务问题</span><i>→</i>
          <span className="work-step">场景判断</span><i>→</i>
          <span className="work-step">方案设计</span><i>→</i>
          <span className="work-step">Prompt / Workflow</span><i>→</i>
          <span className="work-step">Demo验证</span><i>→</i>
          <span className="work-step">评测</span><i>→</i>
          <span className="work-step">人工审核</span><i>→</i>
          <span className="work-step">迭代优化</span>
        </p>
      </article>

      <article id="contact" className="content-page contact-panel">
        <div className="content-section-title">
          <p>07 / CONTACT</p>
          <h2>联系方式</h2>
        </div>
        <div className="contact-panel-copy">
          <p>正在持续更新迭代对 AI 的认知与实践，致力于将 AI 融入工作生活中。</p>
          <strong>求职意向：AI项目专员｜AI内容增长｜AI产品运营</strong>
          <address>
            <span>邮箱：{contact.email}</span>
            <span>电话：{contact.phone}</span>
          </address>
        </div>
        <div className="contact-panel-characters" aria-hidden="true">
          <BlobCharacter color="#B9E529" size={48} label="绿色角色" />
          <BlobCharacter color="#F4A62A" size={70} label="橙色角色" />
          <BlobCharacter color="#161616" size={86} label="黑色角色" />
          <BlobCharacter color="#4285F4" size={56} label="蓝色角色" />
        </div>
      </article>
    </motion.section>
  );
}

export function PortfolioContents() {
  return (
    <div className="portfolio-contents">
      <ProjectOverview />
      <WorkExperience />
      <ContentPractice />
      <CapabilityMap />
      <ClosingPage />
    </div>
  );
}
