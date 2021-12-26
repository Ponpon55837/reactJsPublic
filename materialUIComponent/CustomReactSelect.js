import Select, { components } from 'react-select'
import PropTypes from 'prop-types'

const Control = ({ children, ...props }) => {
  const style = {
    cursor: 'pointer',
    paddingLeft: '7px',
    paddingRight: '7px',
    margin: 'auto',
    fontWeight: 350,
    fontSize: '.9rem',
    color: '#6D6D6D',
    borderRight: '1px solid #CFCED5',
  }
  const { level } = props.selectProps

  return (
    <components.Control {...props}>
      <span style={style}>{level}</span>
      {children}
    </components.Control>
  )
}

const customStyles = {
  container: provided => ({
    ...provided,
    minWidth: '13rem',
    maxWidth: '16rem',
    fontWeight: '400',
  }),
  menu: provided => ({
    ...provided,
    zIndex: 3,
  }),
}

const CustomReactSelect = ({ level, placeholder, options, onChange }) => {
  return (
    <>
      <Select
        styles={customStyles}
        components={{ Control }}
        level={level}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        isClearable
      />
    </>
  )
}

export default CustomReactSelect

Control.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object,
}

CustomReactSelect.propTypes = {
  level: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
}
