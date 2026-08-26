import Image from "next/image";

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="主导航">
        <a className="wordmark" href="#top" aria-label="返回首页">
          HZ<span>/</span>PORTFOLIO
        </a>
        <div className="nav-links">
          <a href="#work">案例</a>
          <a href="#method">方法</a>
          <a href="#about">关于</a>
        </div>
        <a className="nav-contact" href="#about">
          求职方向
        </a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy reveal reveal-1">
          <p className="eyebrow">AI PRODUCT OPERATIONS</p>
          <h1>
            把内容增长经验
            <span>转化为可验证的 AI 产品能力</span>
          </h1>
          <p className="hero-intro">
            用证据、评测与人工审核，连接真实业务和 AI 工作流。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              查看案例
            </a>
            <a className="button button-secondary" href="#method">
              了解方法
            </a>
          </div>
        </div>

        <figure className="hero-visual reveal reveal-2">
          <Image
            src="/portfolio-workflow.jpg"
            alt="在桌面上整理用户研究证据卡和 AI 产品工作流"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 54vw"
          />
          <figcaption>从业务问题到可验证原型</figcaption>
        </figure>
      </section>

      <section className="signal-strip" aria-label="能力重点">
        <div className="shell signal-grid">
          <p>内容与增长</p>
          <p>AI 产品工作流</p>
          <p>评测与证据体系</p>
        </div>
      </section>

      <section className="work-intro shell" id="work">
        <div>
          <p className="section-kicker">SELECTED WORK</p>
          <h2>每个洞察，都能回到证据。</h2>
          <p>
            不展示漂亮但不可追溯的结论。案例从问题、数据、判断到人工审核，保留完整链路。
          </p>
        </div>
      </section>

      <section className="featured-case shell" aria-labelledby="case-one-title">
        <div className="case-image">
          <Image
            src="/beauty-intelligence.jpg"
            alt="美妆产品、创意素材与评测卡组成的案例概念图"
            fill
            sizes="(max-width: 767px) 100vw, 62vw"
          />
        </div>
        <div className="case-copy">
          <p className="case-type">AI 创意增长工作台</p>
          <h3 id="case-one-title">Beauty Creative Intelligence</h3>
          <p>
            把品牌知识、消费者洞察、内容生成、实验评测和学习复盘连成可审核闭环。
          </p>
          <ul className="case-tags" aria-label="项目重点">
            <li>产品设计</li>
            <li>RAG 审核</li>
            <li>Prompt 评测</li>
          </ul>
        </div>
      </section>

      <section className="case-wide shell" aria-labelledby="case-two-title">
        <div className="case-wide-media">
          <Image
            src="/ai-evaluation.jpg"
            alt="由透明评估层、模型模块和独立风险门组成的 AI 评估概念图"
            fill
            sizes="(max-width: 767px) 100vw, 100vw"
          />
        </div>
        <div className="case-wide-content">
          <div>
            <p className="case-type">企业 AI 评估与选型 Demo</p>
            <h3 id="case-two-title">Model Decision Lab</h3>
          </div>
          <div className="case-wide-detail">
            <p>
              用场景诊断、证据评分和独立风险门，帮助团队解释为什么选，以及为什么不选。
            </p>
            <dl className="evidence-list">
              <div>
                <dt>推荐依据</dt>
                <dd>能力证据与场景需求逐项对应</dd>
              </div>
              <div>
                <dt>风险门禁</dt>
                <dd>高质量分不能覆盖合规阻断</dd>
              </div>
            </dl>
            <p className="boundary-note">静态演示 / 不代表官方模型评测分数</p>
          </div>
        </div>
      </section>

      <section className="case-grid shell" aria-labelledby="case-three-title">
        <div className="case-grid-image">
          <Image
            src="/portfolio-workflow.jpg"
            alt="研究人员在桌面上整理证据、工作流与评估材料"
            fill
            sizes="(max-width: 767px) 100vw, 60vw"
          />
        </div>
        <article className="case-panel case-panel-main">
          <p className="case-type">AI 消费者研究工作台</p>
          <h3 id="case-three-title">ÉLAN Research Workspace</h3>
          <p>
            将评论清洗、主题归纳、证据定位、洞察生成和研究员审核串成清晰路径。
          </p>
          <p className="boundary-note">Mock 数据 / 证据不足时允许弃权</p>
        </article>
        <aside className="case-panel principle-panel" aria-label="案例原则">
          <strong>Every insight must be traceable.</strong>
          <p>任何结论都能回到原始评论、处理步骤和审核状态。</p>
        </aside>
      </section>

      <section className="method-section" id="method">
        <div className="shell method-heading">
          <h2>我不是从功能开始，而是从可验证的问题开始。</h2>
          <p>
            运营经验负责理解业务，产品方法负责拆解流程，评测体系负责判断 AI 是否真的有用。
          </p>
        </div>
        <div className="shell method-flow">
          <article>
            <h3>定义问题</h3>
            <p>先明确用户、决策和失败成本，再决定是否需要 AI。</p>
          </article>
          <article>
            <h3>建立证据</h3>
            <p>把原始输入、处理过程和输出结论放在同一链路。</p>
          </article>
          <article>
            <h3>设计评测</h3>
            <p>用测试集、评分标准和错误分类替代主观感觉。</p>
          </article>
          <article>
            <h3>保留判断</h3>
            <p>为不确定性、风险阻断和人工复核留下明确位置。</p>
          </article>
        </div>
      </section>

      <section className="about-section shell" id="about">
        <div className="about-statement">
          <p>关于我</p>
          <h2>
            我的优势不是把 AI 说得复杂，
            <span>而是让它进入真实运营流程。</span>
          </h2>
        </div>
        <div className="about-content">
          <p className="about-lead">
            两年小红书内容、店铺与活动运营经验，正在转向 AI 产品与项目运营。
          </p>
          <div className="capability-groups">
            <div>
              <h3>业务理解</h3>
              <p>内容策略、用户增长、电商转化、活动落地</p>
            </div>
            <div>
              <h3>AI 产品</h3>
              <p>Prompt、RAG、工作流、模型能力边界</p>
            </div>
            <div>
              <h3>效果验证</h3>
              <p>测试集、评分标准、错误分类、人工审核</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <p>面向 AI 产品运营与 AI 内容增长机会</p>
            <h2>让每个项目都经得起追问。</h2>
          </div>
          <a className="button button-primary" href="#work">
            浏览案例
          </a>
        </div>
        <div className="shell footer-meta">
          <p>个人作品集概念首页</p>
          <p>生成视觉仅用于作品集展示</p>
        </div>
      </footer>
    </main>
  );
}
