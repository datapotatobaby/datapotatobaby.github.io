import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { BlogPost as BlogPostType } from '@/types/content';
import { getBlogPostBySlug } from '@/utils/content-loader';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setIsLoading(true);
        if (!slug) {
          setError('No blog post slug provided');
          return;
        }
        
        const postData = await getBlogPostBySlug(slug);
        if (!postData) {
          setError('Blog post not found');
          return;
        }
        
        setPost(postData);
      } catch (error) {
        console.error('Error loading blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-20">Loading...</div>;
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      );
    }

    if (!post) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      );
    }

    // Simple renderer for Markdown content - just for demonstration
    const lines = post.content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-4xl font-bold mb-6">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={i} className="text-3xl font-bold mb-4 mt-8">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={i} className="text-2xl font-bold mb-3 mt-6">{line.substring(4)}</h3>;
      } else if (line === '') {
        return <br key={i} />;
      } else {
        return <p key={i} className="mb-4">{line}</p>;
      }
    });

    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap gap-4 items-center text-sm text-foreground/70 mb-8">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {post.image && (
          <div className="my-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="mt-8">{lines}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-12">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
