import React from 'react';
import { PostEntity } from '../../domain/post.entity';

interface PostCardProps {
  post: PostEntity;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article 
      className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
      aria-labelledby={`post-title-${post.id}`}
    >
      {post.coverImageUrl && (
        <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-100">
          {/* Using img for simplicity here, but next/image should be used in Next.js */}
          <img 
            src={post.coverImageUrl} 
            alt={`Cover for ${post.title}`} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <time dateTime={post.publishedAt.toISOString()}>
            {new Intl.DateTimeFormat('es-MX', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(post.publishedAt)}
          </time>
          <span>•</span>
          <span>{post.author.name}</span>
        </div>
        
        <h3 id={`post-title-${post.id}`} className="text-xl font-bold text-gray-900 leading-tight">
          <a href={`/posts/${post.slug}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm">
            {post.title}
          </a>
        </h3>
        
        <p className="text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-auto pt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span 
            key={tag} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};
