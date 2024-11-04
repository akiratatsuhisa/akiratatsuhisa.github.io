import { useLayoutEffect, useRef } from 'react';

export const useLifecycleState = () => {
  const state = useRef({
    isInit: true,
    isMounted: false,
    isUnMounted: false,
  });

  useLayoutEffect(() => {
    state.current = {
      isInit: false,
      isMounted: true,
      isUnMounted: false,
    };

    return () => {
      state.current = {
        isInit: false,
        isMounted: false,
        isUnMounted: true,
      };
    };
  }, []);

  return state;
};
