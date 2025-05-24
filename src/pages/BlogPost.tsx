
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { BlogPost as BlogPostType } from '@/types/content';
import { getBlogPostBySlug } from '@/utils/content-loader';
import { marked } from 'marked';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [processedContent, setProcessedContent] = useState<string>('');
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
        
        // Configure marked options for better parsing
        marked.setOptions({
          breaks: true,
          gfm: true
        });
        
        // Process the markdown content to HTML
        const htmlContent = await marked(postData.content);
        setProcessedContent(htmlContent);
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

    return (
      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-8">{post.title}</h1>
        
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
        
        <div 
          className="prose prose-lg prose-slate dark:prose-invert max-w-none
                   prose-headings:text-foreground prose-headings:font-bold
                   prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                   prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6
                   prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5
                   prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
                   prose-p:text-foreground prose-p:text-base prose-p:leading-7 prose-p:mb-4
                   prose-strong:text-foreground prose-strong:font-semibold
                   prose-ul:text-foreground prose-ol:text-foreground
                   prose-li:text-foreground prose-li:text-base prose-li:my-1
                   prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6
                   prose-pre:bg-secondary prose-pre:text-foreground prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                   prose-code:bg-secondary prose-code:text-foreground prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                   prose-blockquote:border-l-primary prose-blockquote:text-foreground/80
                   prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80"
          dangerouslySetInnerHTML={{ __html: processedContent }} 
        />
      </article>
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
