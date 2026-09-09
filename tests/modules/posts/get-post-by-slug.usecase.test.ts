import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetPostBySlugUseCase, PostNotFoundError } from '../../../src/modules/posts/application/get-post-by-slug.usecase';
import { PostRepository } from '../../../src/modules/posts/domain/post.repository';
import { PostEntity } from '../../../src/modules/posts/domain/post.entity';

describe('GetPostBySlugUseCase', () => {
  let useCase: GetPostBySlugUseCase;
  let mockRepository: vi.Mocked<PostRepository>;

  const mockPost: PostEntity = {
    id: '1',
    slug: 'hello-world',
    title: 'Hello World',
    excerpt: 'This is a test post',
    contentHtml: '<p>Content</p>',
    publishedAt: new Date('2024-01-01'),
    author: {
      id: 'a1',
      name: 'John Doe',
    },
    tags: ['test'],
  };

  beforeEach(() => {
    // Create a mock repository
    mockRepository = {
      findBySlug: vi.fn(),
      findAll: vi.fn(),
    } as unknown as vi.Mocked<PostRepository>;

    useCase = new GetPostBySlugUseCase(mockRepository);
  });

  it('should return a post when a valid slug is provided and post exists', async () => {
    // Arrange
    mockRepository.findBySlug.mockResolvedValue(mockPost);
    const slug = 'hello-world';

    // Act
    const result = await useCase.execute(slug);

    // Assert
    expect(mockRepository.findBySlug).toHaveBeenCalledWith(slug);
    expect(mockRepository.findBySlug).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockPost);
  });

  it('should throw an error when slug is empty string', async () => {
    // Arrange
    const slug = '';

    // Act & Assert
    await expect(useCase.execute(slug)).rejects.toThrow('Slug is required');
    expect(mockRepository.findBySlug).not.toHaveBeenCalled();
  });

  it('should throw PostNotFoundError when post is not found', async () => {
    // Arrange
    mockRepository.findBySlug.mockResolvedValue(null);
    const slug = 'non-existent-slug';

    // Act & Assert
    await expect(useCase.execute(slug)).rejects.toThrow(PostNotFoundError);
    await expect(useCase.execute(slug)).rejects.toThrow(`Post with slug "${slug}" not found`);
    expect(mockRepository.findBySlug).toHaveBeenCalledWith(slug);
  });
});
