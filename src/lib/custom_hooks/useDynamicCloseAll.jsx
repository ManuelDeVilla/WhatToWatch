import { useEffect } from 'react'

export default function useSidebarCloseAll(dynamicElement, dynamicTriggerElement, setIsActiveElement) {
  useEffect(() => {
    if (!dynamicElement.current) return;
    if (!dynamicTriggerElement.current) return;

    function closeAllHandler(e) {

      if (e.target !== dynamicTriggerElement.current && !dynamicElement.current.contains(e.target)) {
        setIsActiveElement(false);
        console.log('asda');
      }
    }

    document.addEventListener('click', closeAllHandler)
    return () => document.removeEventListener('click', closeAllHandler)
  }, [])
}
