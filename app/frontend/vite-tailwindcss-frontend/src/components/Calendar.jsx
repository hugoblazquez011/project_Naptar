import React from 'react'

export default function Component() {
    return (
      <div className="grid grid-cols-7 gap-2">
        <div className="text-center">Sun</div>
        <div className="text-center">Mon</div>
        <div className="text-center">Tue</div>
        <div className="text-center">Wed</div>
        <div className="text-center">Thu</div>
        <div className="text-center">Fri</div>
        <div className="text-center">Sat</div>
        <div className="grid grid-cols-3 gap-4">
        {/* Utilizar un bucle for para generar los números del 1 al 31 */}
        {Array.from({ length: 31 }, (_, index) => (
            <div key={index + 1} className="text-center">{index + 1}</div>
        ))}
        </div>
      </div>
    )
  }
  
  