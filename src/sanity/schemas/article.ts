import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Research', value: 'research' },
          { title: 'Technical', value: 'technical' },
          { title: 'Tutorial', value: 'tutorial' },
          { title: 'Review', value: 'review' },
        ],
      },
    }),
    defineField({
      name: 'journal',
      title: 'Journal',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Under Review', value: 'under-review' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Draft', value: 'draft' },
        ],
      },
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
    }),
    defineField({
      name: 'arxiv',
      title: 'arXiv ID',
      type: 'string',
    }),
    defineField({
      name: 'citations',
      title: 'Citations',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'journal',
    },
  },
})
