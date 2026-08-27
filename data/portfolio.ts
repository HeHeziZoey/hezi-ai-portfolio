export type ProjectId = "project-01" | "project-02" | "project-03";

export type Project = {
  id: ProjectId;
  number: "01" | "02" | "03";
  title: string;
  playerTitle: string;
  tags: string[];
  description: string;
  directoryDescription: string;
  accent: string;
  textAccent: string;
  accentSoft: string;
  coverType: "insight" | "creative" | "benchmark";
  imageSrc: string;
  imageAlt: string;
  caseStudyUrl: string | null;
  liveDemoUrl: string | null;
};

export const projects: Project[] = [
  {
    id: "project-01",
    number: "01",
    title: "美妆消费者洞察\u00A0×\u00A0AI 内容增长系统",
    playerTitle: "01 美妆消费者洞察 × AI内容增长系统",
    tags: ["AI Workflow", "Consumer Insight", "QWEN API", "Codex"],
    description:
      "从一个业务问题开始，构建消费者数据清洗、标签编码、聚类分析、AI 洞察与内容策略生成工作流。",
    directoryDescription:
      "这是一个面向美妆品牌消费者研究与内容决策的 AI 洞察系统。项目从真实业务问题出发，搭建了从数据采集、清洗去重、结构化处理，到 AI 多标签标注、语义分类、聚类分析、人工抽检，再到需求洞察、痛点识别、机会点评估与内容策略生成的完整流程。系统接入通义千问 API，使 AI 参与评论理解、标签判断、潜在需求发现与报告生成。项目重点不是做数据看板，而是把分散的消费者声音转化为可执行的人群、卖点、场景与内容方向。",
    accent: "#4285F4",
    textAccent: "#4285F4",
    accentSoft: "#DCE8FF",
    coverType: "insight",
    imageSrc: "/project-01.webp",
    imageAlt: "AI Beauty Insight Platform 首页，展示消费者声音、评论证据与洞察卡片",
    caseStudyUrl: null,
    liveDemoUrl: null,
  },
  {
    id: "project-02",
    number: "02",
    title: "美妆品牌 AI 素材增长系统",
    playerTitle: "02 美妆品牌 AI 素材增长系统",
    tags: ["AI Workflow", "RAG Demo", "QWEN API", "Codex"],
    description:
      "围绕美妆短视频与投放素材，串联策略分析、创意方向、方法论匹配、脚本生成与实验复盘。",
    directoryDescription:
      "这是一个围绕美妆品牌内容投放与千川素材生产设计的 AI 创意增长系统。用户输入创意目标后，Strategy Agent 会拆解产品、人群、核心卖点、购买驱动、购买障碍与消费者痛点，并进一步生成用户决策链路、创意方向与内容方法论。系统继续延伸至短视频脚本、镜头、文案与素材方案，同时结合爆款素材知识库和实验对照思路，连接策略、生产、知识沉淀与效果反馈，让 AI 从辅助写文案升级为参与完整内容增长流程的工作方式。",
    accent: "#F4A62A",
    textAccent: "#F4A62A",
    accentSoft: "#FBE6BF",
    coverType: "creative",
    imageSrc: "/project-02.webp",
    imageAlt: "美妆品牌 AI 素材增长系统首页，展示内容工作流与橙色增长轨迹",
    caseStudyUrl: null,
    liveDemoUrl: null,
  },
  {
    id: "project-03",
    number: "03",
    title: "企业 AI 工具评测与选型系统",
    playerTitle: "03 企业 AI 工具评测与选型系统",
    tags: ["AI Tool Evaluation", "Benchmark", "Workflow", "Codex"],
    description:
      "建立文本、图像、视频 AI 工具评测体系，通过业务场景、测试指标、Benchmark 与结果比较辅助企业完成工具选型。",
    directoryDescription:
      "这是一个面向企业 AI 应用决策的工具评测与选型系统，解决不同业务场景下应该选择哪个模型的问题。项目围绕文本、图片与视频三类生成式 AI 工具建立统一评测框架，通过控制提示词、输入素材与任务目标，对不同模型在准确性、指令遵循、风格匹配、稳定性、速度、成本和业务适配度等维度进行横向比较。同时设计场景化选型模块，让用户从真实任务出发获得模型推荐，建立可复用的 AI 评测方法与企业选型逻辑。",
    accent: "#B9E529",
    textAccent: "#7F9D00",
    accentSoft: "#E7F5B8",
    coverType: "benchmark",
    imageSrc: "/project-03.webp",
    imageAlt: "企业 AI 工具评测与选型系统首页，展示模型评估、证据校验与人工决策门",
    caseStudyUrl: null,
    liveDemoUrl: null,
  },
];

export const profile = {
  name: "季添熠",
  visualPosition: "AI PROJECT—CONTENT——GROWTH",
  position: "AI 项目实践 / AI 内容增长 / AI 应用运营",
  statement: ["把 AI 从单点工具", "变成可落地的业务工作流"],
  bio: "2年内容 电商与增长运营经验 持续将 AI 应用于内容生产 用户洞察 策略分析与业务流程",
  skills: ["Prompt Engineering", "AI Workflow", "RAG", "QWEN API", "Codex", "AI Content"],
  metrics: [
    { value: "2+ YEARS", label: "Content & Growth" },
    { value: "3 PROJECTS", label: "AI Application" },
    { value: "AI × BUSINESS", label: "Workflow Thinking" },
  ],
};

export const contact = {
  email: "991357415@qq.com",
  phone: "13175095921",
  display: "邮箱：991357415@qq.com｜电话：13175095921",
};

export const links = {
  email: null as string | null,
  github: null as string | null,
  resume: null as string | null,
};
