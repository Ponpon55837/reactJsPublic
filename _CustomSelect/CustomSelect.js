import React from 'react';
import Select, { components } from 'react-select';

const Control = ({ children, ...props }) => {
  const style = {
    cursor: 'pointer',
    paddingLeft: '7px',
    paddingRight: '7px',
    margin: '0px',
    fontWeight: 400,
    borderRight: '1px solid #CFCED5'
  };
  const { level } = props.selectProps;

  return (
    <components.Control {...props}>
      <span style={style}>
        {level}
      </span>
      {children}
    </components.Control>
  );
};

const CustomSelect = ({ level, options, placeholder, onChange, required }) => {
  const styles={
    container: (provided) => ({
      ...provided,
      minWidth: "15rem",
      fontWeight: "300",
    }),
  };

  return (
    <>
      <Select
        // {...props}
        level={level}
        components={{ Control }}
        isSearchable
        isClearable
        // name={name}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        styles={styles}
      />
      {required &&
        <input
          autoComplete="off"
          tabIndex={-1}
          style={{ opacity: 0, width: 0, height: 0 }}
          required={required}
          // disabled={!required}
        />
      }
    </>
  );
};

export default CustomSelect;
