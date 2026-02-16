import { ArrowUpRight, Github } from "lucide-react";

export function EmptyProjectsState({
  category,
  onClearFilter,
}: {
  category: string;
  onClearFilter: () => void;
}) {
  const categoryLabels: { [key: string]: string } = {
    fullstack: "Full-Stack",
    frontend: "Frontend",
    static: "Static",
    mobile: "Mobile",
    backend: "Backend",
    ai: "AI/ML",
    dataviz: "Data Visualization",
    devtool: "Developer Tools",
  };

  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-6">🔍</div>
      <h3 className="text-2xl md:text-3xl font-serif mb-4">
        No {categoryLabels[category]} projects yet
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
        I haven&lsquo;t added any {categoryLabels[category].toLowerCase()}{" "}
        projects to my portfolio yet. Check back soon or explore other project
        types!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onClearFilter}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
        >
          View All Projects
        </button>
        <a
          href="https://github.com/delightsheriff"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors group"
        >
          <Github className="w-4 h-4" />
          <span>Browse GitHub</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </div>
  );
}
