interface ResumeSectionProps {
  label: string;
  children: React.ReactNode;
}

export function ResumeSection({
  label,
  children,
}: ResumeSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
      <div className="md:col-span-3">
        <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="md:col-span-8 md:col-start-5">{children}</div>
    </div>
  );
}
