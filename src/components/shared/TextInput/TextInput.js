import React from 'react'

function TextInput({
    title,
    value,
    placeholder,
    error,
    onChange
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
            <h3>{title}</h3>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    height: 40,
                    padding: 8,
                    borderRadius: 8,
                }}
            />
            {error
                && <div
                    style={{
                        color: 'red',
                        fontSize: '0.8em',
                        marginTop: 4
                    }}
                >
                    {error}
                </div>
            }
        </div>
    )
}


export default TextInput
