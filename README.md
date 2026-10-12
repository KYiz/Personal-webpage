# Yixiang Zou — Portfolio

A bilingual, static personal site built with React, TypeScript, and Vite. The homepage is a short introduction and a list of selected projects. Detailed case studies hold the work that needs more room than a CV.

**Live site:** [kyiz.github.io/Personal-webpage](https://kyiz.github.io/Personal-webpage/)

## Run locally

Use Node.js 22 or later:

```bash
npm ci
npm run dev
```

Run `npm run build` to check TypeScript, content links, and the production bundle. The build output is in `dist/`.

## Update the site

- `src/Home.tsx`: introduction, three featured projects, other work, education, and links.
- `src/ProjectDetail.tsx`: case-study layout.
- `src/data.ts`: bilingual profile and project content. Add a verified public `repo` URL to a project to show its GitHub link on the homepage and case study. Leave it unset for private or unpublished work.
- `src/minimal.css`: current responsive design.
- `public/docs/Yixiang_Zou_Resume.pdf`: current Chinese CV. The older portfolio PDF remains in the repository as an archive and is not linked from the homepage because its CareTrip project description predates the current implementation.

The homepage and case studies use hash routes so they work under the GitHub Pages repository path. Older design components remain in `src/` for reference but are not imported by the current site.

Enterprise reports, customer messages, ERP exports, credentials, and partner internal data must stay out of public repositories. The Allied Medical case study contains only a public description of the work.
