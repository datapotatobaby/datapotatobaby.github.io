
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Search } from 'lucide-react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { BlogPost } from '@/types/content';
import { getBlogPosts } from '@/utils/content-loader';
import { Input } from '@/components/ui/input';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
        setFilteredPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    let result = blogPosts;
    
    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(post => post.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(result);
  }, [searchQuery, activeCategory, blogPosts]);

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
          <div className="text-center py-20">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Blog</h1>
        <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-center mb-12">
          Insights, tutorials, and thoughts on technology, homelab projects, data engineering, and business automation.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-between mb-10">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button 
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl mb-2">No blog posts found</h3>
            <p className="text-muted-foreground mb-6">Try a different search term or category</p>
            <Button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Card key={post.slug} className="card-hover overflow-hidden flex flex-col h-full">
                <div className="h-48 bg-muted">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">
                    <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <CardDescription className="text-foreground/70 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-foreground/60 pt-4 mt-auto">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
