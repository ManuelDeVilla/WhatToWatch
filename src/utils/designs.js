export const selectCustomStyle = {
  container: (baseStyles) => ({
    ...baseStyles,
    width: '15%'
  }),

  control: (baseStyles, state) => ({
    ...baseStyles,
    maxWidth: '100%',
    fontFamily: "'Inter', sans-serif",
    borderColor: state.isFocused ? 'rgb(165, 0, 0)' : 'grey',
    boxShadow: state.isFocused ? '0 0 0 1px rgb(165, 0, 0)' : 'none',
    '&:hover': {
      borderColor:  state.isFocused ? 'rgb(165, 0, 0)' : 'none'
    }
  }),

  option: (baseStyles, state) => ({
    ...baseStyles,
    fontFamily: "'Inter', sans-serif",
    color: state.isSelected ? 'white' : state.isFocused ? 'white' : 'black',
    backgroundColor: state.isSelected ? 'rgb(165, 0, 0)' : state.isFocused ? 'rgb(165, 0, 0.15)': 'transparent'
  })
}