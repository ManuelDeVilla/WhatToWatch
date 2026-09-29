import { useRef, useState } from 'react'
import useDynamicCloseAll from './useDynamicCloseAll';

export default function useDynamicElement() {
  const dynamicElement = useRef(null);
  const dynamicTriggerElement = useRef(null);
  const [isActiveElement, setIsActiveElement] = useState(false);

  useDynamicCloseAll(
    dynamicElement,
    dynamicTriggerElement,
    setIsActiveElement
  );

  return {
    elementInformation: {
      isActiveElement,
      setIsActiveElement
    },
    dynamicElement,
    dynamicTriggerElement
  }
}
