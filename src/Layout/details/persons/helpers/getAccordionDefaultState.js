export function getAccordionDefaultState(adapter_data) {
  const accordion_state_object = {};

  adapter_data.forEach((val, adapterIndex) => {
    Object.entries(val.data).forEach((data, dataIndex) => {
      if (data[1].length === 0) return;
      
      if (Object.keys(accordion_state_object).length === 0) {
        accordion_state_object[`${adapterIndex}${dataIndex}`] = true
        return;
      }
      
      accordion_state_object[`${adapterIndex}${dataIndex}`] = false
    })
  })

  return accordion_state_object;
}