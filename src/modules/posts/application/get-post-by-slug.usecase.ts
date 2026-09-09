import { PostEntity } from '../domain/post.entity';
import { PostRepository } from '../domain/post.repository';

export class PostNotFoundError extends Error {
  constructor(slug: string) {
    super(`Post with slug "${slug}" not found`);
    this.name = 'PostNotFoundError';
  }
}

export class GetPostBySlugUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(slug: string): Promise<PostEntity> {
    if (!slug || slug.trim() === '') {
      throw new Error('Slug is required');
    }

    const post = await this.postRepository.findBySlug(slug);

    if (!post) {
      throw new PostNotFoundError(slug);
    }

    return post;
  }
}
