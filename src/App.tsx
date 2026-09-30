import { useEffect, useState } from 'react'
import Home from './Home'
import ProjectDetail from './ProjectDetail'
import { profile, projects, t, type Language } from './data'

function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem('portfolio-language')
    if (saved === 'en' || saved === 'zh') return saved
  } catch { /* The language switch still works without storage. */ }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

const sectionForPath: Record<string, string> = {
  '/': 'top',
  '/about': 'about',
  '/projects': 'projects',
  '/experience': 'background',
  '/portfolio': 'portfolio',
  '/contact': 'contact',
}

export default function App() {
  const [lang, setLang] = useState<Language>(initialLanguage)
  const [path, setPath] = useState(() => window.location.hash.slice(1) || '/')
  const project = projects.find(item => path === `/projects/${item.slug}`)

  useEffect(() => {
    const onHashChange = () => setPath(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    try { localStorage.setItem('portfolio-language', lang) } catch { /* Optional preference. */ }
    document.title = project ? `${t(project.title, lang)} | Yixiang Zou` : 'Yixiang Zou | Portfolio'
    const description = project ? t(project.overview, lang) : lang === 'zh'
      ? '邹逸翔的个人主页：AI 应用开发、Agent 工作流与视觉模型项目。'
      : 'Yixiang Zou’s portfolio: applied AI, agent workflows, and computer vision projects.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [lang, project])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const section = sectionForPath[path]
      if (section && section !== 'top') document.getElementById(section)?.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [path])

  const onHome = path in sectionForPath
  const toggleLanguage = () => setLang(current => current === 'en' ? 'zh' : 'en')

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content" onClick={event => {
        event.preventDefault()
        document.getElementById('main-content')?.focus()
        document.getElementById('main-content')?.scrollIntoView()
      }}>{lang === 'zh' ? '跳至正文' : 'Skip to content'}</a>
      <header className="site-header">
        <div className="page-width header-inner">
          <a className="brand" href="#/">{lang === 'zh' ? '邹逸翔' : 'Yixiang Zou'}</a>
          <nav className="nav" aria-label={lang === 'zh' ? '主导航' : 'Main navigation'}>
            <a href="#/about" aria-current={path === '/about' ? 'page' : undefined}>{lang === 'zh' ? '关于' : 'About'}</a>
            <a href="#/projects" aria-current={path.startsWith('/projects') ? 'page' : undefined}>{lang === 'zh' ? '项目' : 'Projects'}</a>
            <a href={profile.resume} target="_blank" rel="noreferrer">{lang === 'zh' ? '简历' : 'CV'} ↗</a>
            <button type="button" onClick={toggleLanguage} aria-label={lang === 'zh' ? 'Switch to English' : '切换为中文'}>
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
          </nav>
        </div>
      </header>
      <div id="main-content" tabIndex={-1}>
        {project ? <ProjectDetail project={project} lang={lang} /> : onHome ? <Home lang={lang} /> : (
          <main className="page-width missing-page">
            <h1>{lang === 'zh' ? '页面不存在' : 'Page not found'}</h1>
            <a href="#/">{lang === 'zh' ? '返回首页' : 'Back to home'} →</a>
          </main>
        )}
      </div>
      <footer className="site-footer">
        <div className="page-width footer-inner">
          <span>© {new Date().getFullYear()} Yixiang Zou</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </footer>
    </div>
  )
}
