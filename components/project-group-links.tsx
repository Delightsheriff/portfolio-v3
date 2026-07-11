import {
  Github,
  ExternalLink,
  Smartphone,
  FileText,
  Play,
  GitBranch,
} from "lucide-react";
import type { Project } from "@/interface/sanity";

export function ProjectGroupLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          Live
        </a>
      )}
      {project.apiDocsUrl && (
        <a
          href={project.apiDocsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} API docs`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <FileText className="w-3 h-3" aria-hidden="true" />
          API Docs
        </a>
      )}
      {project.demoVideoUrl && (
        <a
          href={project.demoVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} demo video`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Play className="w-3 h-3" aria-hidden="true" />
          Demo
        </a>
      )}
      {project.iosUrl && (
        <a
          href={project.iosUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on App Store`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Smartphone className="w-3 h-3" aria-hidden="true" />
          iOS
        </a>
      )}
      {project.androidUrl && (
        <a
          href={project.androidUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on Play Store`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Smartphone className="w-3 h-3" aria-hidden="true" />
          Android
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="w-3 h-3" aria-hidden="true" />
          Code
        </a>
      )}
      {project.repoUrls?.map((repo, i) => (
        <a
          key={i}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${repo.label} repository`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <GitBranch className="w-3 h-3" aria-hidden="true" />
          {repo.label}
        </a>
      ))}
    </div>
  );
}
