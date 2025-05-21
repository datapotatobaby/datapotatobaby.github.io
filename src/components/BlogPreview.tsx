
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const BlogPreview = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Setting Up a Homelab: A Beginner's Guide",
      excerpt: "Learn how to build your first homelab from selecting hardware to deploying your first services.",
      date: "May 12, 2025",
      readTime: "8 min read",
      category: "Homelab",
      image: "placeholder.svg"
    },
    {
      id: 2,
      title: "Data Engineering for Small Businesses",
      excerpt: "How small businesses can leverage data engineering practices to make better decisions.",
      date: "May 05, 2025",
      readTime: "6 min read",
      category: "Data Engineering",
      image: "placeholder.svg"
    },
    {
      id: 3,
      title: "Automating Business Processes with Python",
      excerpt: "Step-by-step guide to automating repetitive business tasks using Python scripts.",
      date: "April 28, 2025",
      readTime: "10 min read",
      category: "Automation",
      image: "placeholder.svg"
    }
  ];

  return (
    <section id="blog" className="section-container bg-gradient-to-br from-secondary/30 to-background">
      <div className="text-center mb-12">
        <h2 className="section-title">From The Blog</h2>
        <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
          Insights, tutorials, and thoughts on technology, homelab projects, data engineering, and business automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {blogPosts.map((post) => (
          <Card key={post.id} className="card-hover overflow-hidden flex flex-col h-full">
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
              <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
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
      
      <div className="text-center">
        <Button className="gap-2">
          Visit Blog
          <ArrowRight size={16} />
        </Button>
      </div>
    </section>
  );
};

export default BlogPreview;
