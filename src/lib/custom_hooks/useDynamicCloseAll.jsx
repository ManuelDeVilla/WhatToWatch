import { useEffect } from 'react'

export default function useSidebarCloseAll(dynamicElement, dynamicTriggerElement, setIsActiveElement) {
  useEffect(() => {
    if (!dynamicElement.current) return;
    if (!dynamicTriggerElement.current) return;

    function closeAllHandler(e) {
      if (e.target !== dynamicTriggerElement.current && !dynamicElement.current.contains(e.target)) {
        setIsActiveElement(false);
      }
    }

    document.addEventListener('mousedown', closeAllHandler)
    return () => document.removeEventListener('mousedown', closeAllHandler)
  }, [dynamicElement.current, dynamicTriggerElement.current])
}
