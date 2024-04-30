import React, { useState } from 'react';
import './Toggle.css'; // Importa el archivo CSS

const Toggle = ({isChecked,handleChange}) => {
  return (
    <label className="switch">
      {/* Input del toggle que refleja el estado isChecked */}
      <input 
        className="toggle" 
        type="checkbox" 
        checked={isChecked} // Indica si el toggle está activado o no
        //checked={true} // Indica si el toggle está activado o no
        onChange={handleChange} // Maneja el cambio de estado del toggle
      />
      <span className="slider"></span>
      <span className="card-side"></span>
    </label>
  );
};

export default Toggle;
