import fs from 'fs';
import type { GetStaticProps } from 'next';
import path from 'path';

interface BaselineProps {
  html: string;
}

export default function Baseline({ html }: BaselineProps) {
  return (
    <div
      className="baseline-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export const getStaticProps: GetStaticProps<BaselineProps> = async () => {
  const filePath = path.join(process.cwd(), 'src', 'tmp', 'generated.html');
  const html = fs.readFileSync(filePath, 'utf8');

  return {
    props: {
      html,
    },
  };
};
