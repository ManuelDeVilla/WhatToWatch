import Accordion from './Accordion.jsx';
import SectionHeader from './SectionHeader.jsx';
import styles from './css/CreditsSection.module.css';
import CloseIcon from './assets/icons/close.svg?react';
import useAccordion from './lib/custom_hooks/accordion/useAccordion.jsx';


export default function CreditsSection({adapter_data}) {
  
  const {
    credits,
    accordion,
    dataState
  } = useAccordion(adapter_data);

  // For Credits
  const {
    onClickCredit,
    creditButtonState
  } = credits;

  const {
    credit_onClick,
    credit_reset_btn
  } = onClickCredit;

  // For Accordion
  const {
    expandAccordion,
    setExpandAccordion,
    onClickAccordion,
    accordionButtonText
  } = accordion;

  const {changeAllAccordionStatus} = onClickAccordion;
  

  return (
    <div className='container'>
      <SectionHeader title={'Credits'} />
      <div className={ styles.sortContainer }>
        {
          dataState.map((value, index) => {
            if (value.total !== 0) return (
              <button onClick={() => credit_onClick(index)} key={value.title} className={ styles.genre }>
                <div className={ styles.textContainer }>
                  <span>{value.title}</span>
                  <span>&#183;</span>
                  <span>{value.total}</span>
                </div>
                <CloseIcon />
              </button>
            )
          })
        }
      </div>

      <div className={ styles.interactionContainer }>
        <button onClick={() => {changeAllAccordionStatus(accordionButtonText)}}>{accordionButtonText}</button>
        {
          creditButtonState && (
            <button onClick={credit_reset_btn}>All Credits</button>
          )
        }
      </div>

      {
        dataState.map((value, adapterIndex) => {
          if (value.total !== 0) return (
            <div className={ styles.accordion } key={value.title}>
              <span className={ styles.accordionHeader }>{value.title}</span>
              {
                Object.entries(value.data).map((val, index) => {
                  if (val[1].length !== 0) return (
                    <Accordion
                      key={index}
                      accordion={{
                        accordionIndex: `${adapterIndex}${index}`,
                        expandAccordion,
                        setExpandAccordion
                      }}
                      data={{
                        header: val[0],
                        accordionData: val[1]
                      }}
                    />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}
