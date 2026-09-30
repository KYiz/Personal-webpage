import { education, profile, projects, t, type Language, type Localized, type Project } from './data'

const featuredSlugs = ['allied-medical-rag', 'uav-advisory-agent', 'meet-ta']
const featured = featuredSlugs.map(slug => projects.find(project => project.slug === slug)!).filter(Boolean)
const other = projects.filter(project => !featuredSlugs.includes(project.slug))
const featuredSummaries: Record<string, Localized> = {
  'allied-medical-rag': {
    en: 'Extended a Spring Boot prototype with source refresh, multimodal retrieval, and suggestions inside the service team’s Front workflow.',
    zh: '在已有 Spring Boot 原型上完成资料刷新、多模态检索，并将零件建议接入客服使用的 Front 工作流。',
  },
  'uav-advisory-agent': {
    en: 'Built a five-stage advisory agent with regulatory retrieval, branching decisions, and human review; tested more than 15 edge cases.',
    zh: '构建五阶段法规咨询 Agent，串联检索、条件判断与人工复核，并测试 15 个以上边界案例。',
  },
  'meet-ta': {
    en: 'Developed the visual emotion model and connected it to a team-built multimodal conversation prototype; test accuracy reached 75.34%.',
    zh: '负责视觉情绪模型开发，并接入团队的多模态对话原型；模型测试准确率为 75.34%。',
  },
}

function ProjectEntry({ project, lang }: { project: Project; lang: Language }) {
  return (
    <article className="project-entry">
      <div className="project-entry-meta">{t(project.period, lang)} · {t(project.role, lang)}</div>
      <h3><a href={`#/projects/${project.slug}`}>{t(project.title, lang)}</a></h3>
      <p>{t(featuredSummaries[project.slug], lang)}</p>
      <div className="entry-links">
        <a href={`#/projects/${project.slug}`}>{lang === 'zh' ? '项目说明' : 'Case study'} →</a>
        {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">GitHub ↗</a>}
      </div>
    </article>
  )
}

export default function Home({ lang }: { lang: Language }) {
  return (
    <main className="page-width home">
      <section className="intro" id="about" aria-labelledby="home-title">
        <div className="intro-copy">
          <p className="eyebrow">{lang === 'zh' ? '个人主页' : 'Personal website'}</p>
          <h1 id="home-title">{lang === 'zh' ? '邹逸翔' : 'Yixiang Zou'}<span>{lang === 'zh' ? 'Yixiang Zou' : '邹逸翔'}</span></h1>
          <p className="intro-lead">{lang === 'zh'
            ? '我在奥克兰大学学习人工智能，主要做 AI 应用开发。近期项目涉及企业知识检索、Agent 工作流和视觉模型。这里记录我具体做过的工作和结果。'
            : 'I studied artificial intelligence at the University of Auckland and work on applied AI. My recent projects involve enterprise search, agent workflows, and computer vision. This site records what I built and learned.'}</p>
          <div className="intro-links">
            <a href={profile.resume} target="_blank" rel="noreferrer">{lang === 'zh' ? '简历 PDF' : 'CV (PDF)'} ↗</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={`mailto:${profile.email}`}>Email ↗</a>
          </div>
        </div>
        <img className="profile-photo" src="./profile.jpg" alt={lang === 'zh' ? '邹逸翔的照片' : 'Portrait of Yixiang Zou'} width="180" height="220" />
      </section>

      <section className="content-section" id="projects" aria-labelledby="projects-title">
        <h2 id="projects-title">{lang === 'zh' ? '项目' : 'Selected projects'}</h2>
        <p className="section-intro">{lang === 'zh'
          ? '下面三个项目分别对应企业应用、Agent 设计和视觉模型。点开项目说明可查看问题、个人贡献、方法和结果。'
          : 'Three projects covering an enterprise application, agent design, and a vision model. Each case study explains the problem, my contribution, approach, and result.'}</p>
        <div className="project-list">{featured.map(project => <ProjectEntry key={project.slug} project={project} lang={lang} />)}</div>
        <div className="other-work">
          <h3>{lang === 'zh' ? '其他项目' : 'Other work'}</h3>
          <ul>{other.map(project => <li key={project.slug}><a href={`#/projects/${project.slug}`}>{t(project.title, lang)}</a><span>{t(project.status, lang)}</span></li>)}</ul>
        </div>
      </section>

      <section className="content-section compact-section" id="portfolio" aria-labelledby="portfolio-title">
        <h2 id="portfolio-title">Portfolio</h2>
        <p>{lang === 'zh'
          ? '更完整的流程图、实验对比和产品方案整理在 16 页作品集中。'
          : 'The 16-page portfolio collects the workflow diagrams, experiment comparisons, and product plans in more detail.'} <a href={profile.portfolio} target="_blank" rel="noreferrer">{lang === 'zh' ? '查看作品集 PDF' : 'Open portfolio PDF'} ↗</a></p>
      </section>

      <section className="content-section compact-section" id="background" aria-labelledby="background-title">
        <h2 id="background-title">{lang === 'zh' ? '教育背景' : 'Education'}</h2>
        <ul className="education-list">{education.map(item => <li key={item.period}><strong>{t(item.degree, lang)}</strong><span>{item.school} · {item.period}</span></li>)}</ul>
      </section>

      <section className="content-section compact-section contact-section" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">{lang === 'zh' ? '联系' : 'Contact'}</h2>
        <p>{lang === 'zh' ? '欢迎通过邮件联系。' : 'The best way to reach me is by email.'} <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
      </section>
    </main>
  )
}
