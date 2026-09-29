import {useState, useEffect} from 'react'
import { getAccordionDefaultState } from '../../../utils/formatter';

export default function useAccordion(adapter_data) {
  // Data States
  const [dataState, setDataState] = useState(adapter_data)

  // Accordion
  const defaultAccordionState = getAccordionDefaultState(adapter_data);
  const [accordionButtonText, setAccordionButtonText] = useState('Expand All');
  const [expandAccordion, setExpandAccordion] = useState(defaultAccordionState);

  // Credit Reset State
  const [creditButtonState, setCreditButtonState] = useState(false);

  // Changing Accordion Status
  const changeAllAccordionStatus = (status) => {
    const newAccordionStatus = {};
    Object.entries(expandAccordion).forEach((val) => {
      if (status === 'Expand All') {
        newAccordionStatus[val[0]] = true
      } else {
        newAccordionStatus[val[0]] = false
      }
    })

    setExpandAccordion(newAccordionStatus);
  }

  // Changing Accordion Expand Button Text
  useEffect(() => {
    const expandStatusCount = Object.entries(expandAccordion).reduce((acc, val) => {
      if (val[1]) {
        acc['expanded'] = (acc['expanded'] || 0) + 1;
      } else {
        acc['collapsed'] = (acc['collapsed'] || 0) + 1;
      }

      return acc;
    }, {})

    const expand_accordion = () => {
      expandStatusCount.expanded === Object.entries(expandAccordion).length
      ? setAccordionButtonText('Collapse All')
      : setAccordionButtonText('Expand All');
    }

    expand_accordion();
  }, [expandAccordion])

  // On click remove categories for credits
  const credit_onClick = (index) => {
    const newData = dataState.toSpliced(index, 1);
    const newAccordionState = getAccordionDefaultState(newData);
    
    setDataState(newData)
    setExpandAccordion(newAccordionState);
  }

  // Show all categories again in credits
  const credit_reset_btn = () => {
    const newAccordionState = getAccordionDefaultState(adapter_data);

    setDataState(adapter_data);
    setExpandAccordion(newAccordionState);
  }

  // When a category is removed show the all credits button for reset
  useEffect(() => {
    if (adapter_data.length === dataState.length) return;

    const changeCreditState = () => {
      setCreditButtonState(true)
    }

    changeCreditState()
  }, [dataState])

  return {
    credits: {
      onClickCredit: {
        credit_onClick,
        credit_reset_btn
      },
      creditButtonState
    },
    accordion: {
      onClickAccordion: {
        changeAllAccordionStatus
      },
      expandAccordion,
      setExpandAccordion,
      accordionButtonText
    },
    dataState
  }
}
