interface Props {
  src?: string;
  height?: number;
}

export default function SubstackEmbed({
  src = process.env.NEXT_PUBLIC_SUBSTACK_EMBED ??
    'https://quillworks.substack.com/embed',
  height = 150,
}: Props) {
  return (
    <div className="mx-auto mt-8 w-full max-w-[480px] sm:mt-6">
      <iframe
        src={src}
        height={height}
        width="100%"
        title="Subscribe to Quillworks Substack"
        className="w-full border border-gray-200 bg-white"
        frameBorder={0}
        scrolling="no"
      />
    </div>
  );
}
