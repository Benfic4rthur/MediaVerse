import { useEffect, useState } from 'react';

export function useAnimation(element) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const cardElement = element.current;
      if (cardElement) {
        const cardPosition = cardElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (cardPosition.top < windowHeight) {
          setShowAnimation(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { showAnimation };
}
