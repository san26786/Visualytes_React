interface SectionHeadingProps {
    title: string;
    color?: string;
}

export default function SectionHeading({
    title,
    color="#784191"
}: SectionHeadingProps) {
    return (
        <div className="flex justify-center">
            <div className="rounded-full border border-gray-300 px-10 py-3">
                <h2
                    className="text-3xl md:text-5xl font-medium text-center"
                    style={{ color }}
                >
                    {title}
                </h2>
            </div>
        </div>
    );
}