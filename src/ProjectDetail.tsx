import { t, type Language, type Localized, type Project } from './data'

type DetailSection = { key: string; title: Localized; content: Localized | Localized[] }

export default function ProjectDetail({ project, lang }: { project: Project; lang: Language }) {
  const sections: DetailSection[] = [
    { key: 'problem', title: { en: 'The problem', zh: '问题' }, content: project.challenge },
    { key: 'contribution', title: { en: 'My contribution', zh: '我的工作' }, content: project.responsibility },
    { key: 'approach', title: { en: 'System and approach', zh: '系统与方法' }, content: project.architecture },
    { key: 'process', title: { en: 'Process', zh: '实施过程' }, content: project.process },
    { key: 'result', title: { en: 'Results', zh: '结果' }, content: project.outcomes },
    { key: 'reflection', title: { en: 'What I learned', zh: '复盘' }, content: project.reflection },
  ]

  return (
    <main className="page-width detail-page">
      <a className="back-link" href="#/projects">← {lang === 'zh' ? '返回项目列表' : 'Back to projects'}</a>
      <div className="detail-heading">
        <p className="eyebrow">{lang === 'zh' ? '项目说明' : 'Case study'} · {project.index}</p>
        <h1>{t(project.title, lang)}</h1>
        <p className="detail-overview">{t(project.overview, lang)}</p>
        {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">{lang === 'zh' ? '查看项目仓库' : 'View repository'} ↗</a>}
      </div>

      <dl className="detail-facts">
        <div><dt>{lang === 'zh' ? '时间' : 'Period'}</dt><dd>{t(project.period, lang)}</dd></div>
        <div><dt>{lang === 'zh' ? '角色' : 'Role'}</dt><dd>{t(project.role, lang)}</dd></div>
        <div><dt>{lang === 'zh' ? '状态' : 'Status'}</dt><dd>{t(project.status, lang)}</dd></div>
        <div><dt>{lang === 'zh' ? '技术 / 方法' : 'Tools / methods'}</dt><dd>{project.tags.join(' · ')}</dd></div>
      </dl>

      <div className="detail-body">
        {sections.map(section => <section className="detail-section" id={section.key} key={section.key}>
          <h2>{t(section.title, lang)}</h2>
          {Array.isArray(section.content)
            ? <ul>{section.content.map((item, index) => <li key={index}>{t(item, lang)}</li>)}</ul>
            : <p>{t(section.content, lang)}</p>}
        </section>)}
        {project.note && <p className="project-note">{t(project.note, lang)}</p>}
      </div>
      <a className="back-link bottom-link" href="#/projects">← {lang === 'zh' ? '返回项目列表' : 'Back to projects'}</a>
    </main>
  )
}
