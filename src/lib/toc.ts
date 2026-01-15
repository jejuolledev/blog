import GithubSlugger from 'github-slugger';

type TocItem = {
  text: string;
  level: number;
  id: string;
};

export function getTableOfContents(mdxContent: string) {
  const slugger = new GithubSlugger();
  const lines = mdxContent.split('\n');
  const items: TocItem[] = [];
  let inCodeBlock = false;

  lines.forEach((line) => {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) {
      return;
    }

    const match = /^(#{2,4})\s+(.*)/.exec(line);
    if (!match) return;

    const level = match[1].length;
    const text = match[2].trim();
    const id = slugger.slug(text);
    items.push({ text, level, id });
  });

  return items;
}

export type { TocItem };
