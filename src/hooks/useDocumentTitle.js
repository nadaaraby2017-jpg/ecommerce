import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    try {
      document.title = title;
    } catch (error) {
      console.warn('Failed to set document title:', error);
    }
    
    return () => {
      try {
        document.title = 'Fresh Cart'; // Default title
      } catch (error) {
        console.warn('Failed to reset document title:', error);
      }
    };
  }, [title]);
}
