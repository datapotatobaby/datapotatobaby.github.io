
import { useState, useEffect } from 'react';
import { SiteConfig } from '@/types/site-config';
import { getSiteConfig } from '@/utils/site-config-loader';

export const useSiteConfig = () => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const siteConfig = await getSiteConfig();
        setConfig(siteConfig);
        setError(null);
      } catch (err) {
        console.error('Failed to load site configuration:', err);
        setError('Failed to load site configuration');
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  return { config, isLoading, error };
};
