import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    thumbnail: { type: 'string', required: false },
    liveUrl: { type: 'string', required: false },
    githubUrl: { type: 'string', required: false },
    featured: { type: 'boolean', required: false, default: false },
    status: { type: 'enum', options: ['completed', 'in-progress', 'planned'], required: false, default: 'completed' },
    draft: { type: 'boolean', required: false, default: false }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('projects/', '')
    }
  }
}));

export const Devlog = defineDocumentType(() => ({
  name: 'Devlog',
  filePathPattern: 'devlog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    mood: { type: 'enum', options: ['great', 'good', 'neutral', 'tired', 'challenging'], required: false, default: 'good' },
    draft: { type: 'boolean', required: false, default: false }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('devlog/', '')
    }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, Devlog],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          keepBackground: false
        }
      ]
    ]
  }
});
