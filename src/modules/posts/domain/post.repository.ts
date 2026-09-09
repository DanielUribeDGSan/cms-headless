import { PostEntity } from './post.entity';

export interface PostRepository {
  findBySlug(slug: string): Promise<PostEntity | null>;
  findAll(limit?: number, page?: number): Promise<PostEntity[]>;
}
