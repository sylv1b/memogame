import React from 'react'

export default function Button({ title, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{ width: '100%' }}
        >
            {title}
        </button>
    )
}
