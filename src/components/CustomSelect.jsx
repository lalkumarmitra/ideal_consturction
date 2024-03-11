import React from 'react'
import Select from 'react-select'

function CustomSelect(props) {
    const {options,name,defaultValue,value,elementId="",isSearchable=false,onChange=()=>{}} = props;
    const customTheme = theme =>  ({
        ...theme,
        borderRadius: '0.25rem',
        colors: {
            ...theme.colors,
            neutral0: 'var(--vz-input-bg)',//background
            primary50: 'var(--vz-light)',
            primary25: 'var(--vz-light)',
            primary: 'var(--vz-gray-700)',
            neutral20: 'var(--vz-input-border)',//border 
            neutral30: 'var(--vz-input-focus-border)',//border focused
            neutral80: 'var(--vz-body-color)',//input color
        },
    });
    return (
        <Select styles={
            {container :  (baseStyles,state) =>({
                ...baseStyles,
                outline: state.isFocused ? 0:0,
            })}
        } onChange={e=>onChange(e)} id={elementId} value={value} defaultValue={defaultValue} theme={t=>customTheme(t)} isSearchable={isSearchable} options={options} name={name} />
    )
}

export default CustomSelect