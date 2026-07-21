type SectionPlaceholderProps = {
  minHeight?: string;
};

export default function SectionPlaceholder({
  minHeight = "320px",
}: SectionPlaceholderProps) {
  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ minHeight }}
      aria-hidden
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
    </div>
  );
}
