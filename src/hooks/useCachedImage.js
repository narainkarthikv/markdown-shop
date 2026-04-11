import { useEffect, useState } from 'react';

const CACHE_NAME = 'markdown-shop-image-cache-v1';

const fetchCachedImage = async (url) => {
  if (!('caches' in window)) {
    return { src: url, fromCache: false };
  }

  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(url);

  if (cachedResponse) {
    const blob = await cachedResponse.blob();
    return { src: URL.createObjectURL(blob), fromCache: true };
  }

  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) {
    return { src: url, fromCache: false };
  }

  await cache.put(url, response.clone());
  const blob = await response.blob();
  return { src: URL.createObjectURL(blob), fromCache: false };
};

const useCachedImage = (url, { enabled = true } = {}) => {
  const [cachedSrc, setCachedSrc] = useState('');

  useEffect(() => {
    let isActive = true;
    let objectUrl = '';

    if (!url || !enabled || typeof window === 'undefined') {
      setCachedSrc(url || '');
      return undefined;
    }

    const load = async () => {
      try {
        const result = await fetchCachedImage(url);
        objectUrl = result.src;
        if (isActive) {
          setCachedSrc(result.src || url);
        }
      } catch (error) {
        if (isActive) {
          setCachedSrc(url);
        }
      }
    };

    load();

    return () => {
      isActive = false;
      if (objectUrl && objectUrl.startsWith('blob:')) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [url, enabled]);

  return cachedSrc || url || '';
};

export default useCachedImage;
