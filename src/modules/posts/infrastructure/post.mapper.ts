import { PostEntity } from '../domain/post.entity';

// Simulating Payload CMS API Response Type
export interface PayloadPostDTO {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: {
    html: string;
  };
  featuredImage?: {
    url: string;
  };
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar?: {
      url: string;
    };
  };
  tags: Array<{ name: string }>;
}

export class PostMapper {
  static toDomain(raw: PayloadPostDTO): PostEntity {
    return {
      id: raw.id,
      slug: raw.slug,
      title: raw.title,
      excerpt: raw.excerpt,
      contentHtml: raw.content?.html || '',
      coverImageUrl: raw.featuredImage?.url,
      publishedAt: new Date(raw.createdAt),
      author: {
        id: raw.author.id,
        name: raw.author.name,
        avatarUrl: raw.author.avatar?.url,
      },
      tags: raw.tags?.map((tag) => tag.name) || [],
    };
  }
}
