import React from 'react'

export default function Button({ value, onClick }) {
  return (
    <div onClick={() => onClick(value)} className="button">
      <p>{value}</p>
    </div>
  )
}
