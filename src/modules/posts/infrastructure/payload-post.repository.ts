import { PostEntity } from '../domain/post.entity';
import { PostRepository } from '../domain/post.repository';
import { PostMapper, PayloadPostDTO } from './post.mapper';

export class PayloadPostRepository implements PostRepository {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async findBySlug(slug: string): Promise<PostEntity | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/posts?where[slug][equals]=${slug}&depth=1`,
        {
          next: { revalidate: 60 }, // ISR Configuration
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      
      if (!data.docs || data.docs.length === 0) {
        return null;
      }

      const rawPost: PayloadPostDTO = data.docs[0];
      return PostMapper.toDomain(rawPost);
    } catch (error) {
      console.error('[PayloadPostRepository] Error fetching post by slug:', error);
      return null;
    }
  }

  async findAll(limit: number = 10, page: number = 1): Promise<PostEntity[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/posts?limit=${limit}&page=${page}&depth=1`,
        {
          next: { revalidate: 60 },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      
      if (!data.docs) {
        return [];
      }

      return data.docs.map((raw: PayloadPostDTO) => PostMapper.toDomain(raw));
    } catch (error) {
      console.error('[PayloadPostRepository] Error fetching all posts:', error);
      return [];
    }
  }
}
