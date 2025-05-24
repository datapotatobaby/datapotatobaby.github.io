import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from "@/pages/Index";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import ProjectsPage from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import NotFound from "@/pages/NotFound";
import { QueryClient } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import ResumePage from "@/pages/Resume";

function App() {
  return (
    <QueryClient>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClient>
  );
}

export default App;
