import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig } from '@/hooks/useSiteConfig';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { config, isLoading } = useSiteConfig();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        ]);

      if (error) {
        throw error;
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you as soon as possible.",
      });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !config) {
    return <div>Loading...</div>;
  }

  const { userInfo } = config;

  return (
    <section id="contact" className="section-container bg-gradient-to-b from-background to-slate-50/30 dark:to-slate-900/30">
      <div className="text-center mb-12">
        <h2 className="section-title">Get In Touch</h2>
        <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
          Have a question or want to discuss a potential opportunity? I'd love to hear from you!
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Me a Message</CardTitle>
            <CardDescription>
              Fill out the form and I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="What's this about?" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Connect With Me</CardTitle>
            <CardDescription className="text-center">
              Let's connect on social media and stay in touch!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center gap-6">
              <a 
                href={userInfo.links.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 bg-card border border-border hover:border-accent/50 hover:bg-accent/5 transition-all p-6 rounded-lg group"
              >
                <Github className="h-8 w-8 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a 
                href={userInfo.links.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 bg-card border border-border hover:border-accent/50 hover:bg-accent/5 transition-all p-6 rounded-lg group"
              >
                <Linkedin className="h-8 w-8 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
