import { useMDXComponent } from 'next-contentlayer/hooks';

type MdxContentProps = {
  code: string;
};

export function MdxContent({ code }: MdxContentProps) {
  const Component = useMDXComponent(code);
  return <Component />;
}
