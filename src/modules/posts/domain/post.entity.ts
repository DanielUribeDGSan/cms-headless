export interface PostAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface PostEntity {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverImageUrl?: string;
  publishedAt: Date;
  author: PostAuthor;
  tags: string[];
}
