import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing state in URL query parameters
 */
export function useUrlState() {
  const [state, setState] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      c: parseFloat(params.get('c')) || 330,
      a: parseFloat(params.get('a')) || 30,
      steps: parseInt(params.get('steps')) || 10,
      unit: params.get('unit') || 'cm',
      advanced: params.get('advanced') === 'true',
      // Advanced mode overrides
      height: params.get('height') ? parseFloat(params.get('height')) : null,
      length: params.get('length') ? parseFloat(params.get('length')) : null,
    };
  });

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('c', state.c.toString());
    params.set('a', state.a.toString());
    params.set('steps', state.steps.toString());
    params.set('unit', state.unit);
    
    if (state.advanced) {
      params.set('advanced', 'true');
      if (state.height !== null) params.set('height', state.height.toString());
      if (state.length !== null) params.set('length', state.length.toString());
    }
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [state]);

  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  return [state, updateState];
}
