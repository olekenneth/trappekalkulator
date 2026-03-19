import { useState } from 'react';

/**
 * Hook for detecting browser language
 * Returns 'no' for Norwegian, 'en' for everything else
 */
export function useLanguage() {
  const [language] = useState(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.toLowerCase().startsWith('no') ? 'no' : 'en';
  });

  return language;
}
