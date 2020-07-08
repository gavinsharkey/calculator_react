import React from 'react'

export default function CalculatorDisplay({ number }) {
  const truncatedNumber = number.length > 12 ? number.slice(0, 12) : number
  return (
    <div className='display'>
      {truncatedNumber}
    </div>
  )
}
