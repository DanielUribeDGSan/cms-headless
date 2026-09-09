import { useState, useEffect } from 'react';
import { PostEntity } from '../../domain/post.entity';
import { GetPostBySlugUseCase } from '../../application/get-post-by-slug.usecase';
import { PayloadPostRepository } from '../../infrastructure/payload-post.repository';

// Note: In a real app, you might use React Query or SWR instead of a custom fetch hook.
// This is for demonstration of the Presenter/Controller pattern.

export function usePost(slug: string) {
  const [post, setPost] = useState<PostEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      setLoading(true);
      setError(null);
      
      try {
        const repository = new PayloadPostRepository();
        const useCase = new GetPostBySlugUseCase(repository);
        const fetchedPost = await useCase.execute(slug);
        
        if (isMounted) {
          setPost(fetchedPost);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      fetchPost();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { post, loading, error };
}
