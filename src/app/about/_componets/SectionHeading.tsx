interface SectionHeadingProps {
    title: string;
    color?: string;
    eyebrow?: string;

}

export default function SectionHeading({
    title,
    eyebrow,
    color="#784191"
}: SectionHeadingProps) {
    return (
        <div className="flex justify-center">
            <div className="rounded-full border border-gray-300 px-10 py-3">
               
            {eyebrow && (
        <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </span>
      )} <h2
                    className="text-3xl md:text-5xl font-medium text-center"
                    style={{ color }}
                >
                    {title}
                </h2>
            </div>
        </div>
    );
}