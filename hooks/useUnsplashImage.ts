import { useState, useEffect } from 'react';

const imageCache = new Map<string, string>();

export function useUnsplashImage(query: string): string {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (imageCache.has(query)) {
      setImageUrl(imageCache.get(query)!);
      return;
    }

    const fetchImage = async () => {
      try {
        const response = await fetch(`https://source.unsplash.com/featured/800x600?${encodeURIComponent(query)}`);
        const url = response.url;
        imageCache.set(query, url);
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to fetch image:', error);
        setImageUrl('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop');
      }
    };

    fetchImage();
  }, [query]);

  return imageUrl;
}
