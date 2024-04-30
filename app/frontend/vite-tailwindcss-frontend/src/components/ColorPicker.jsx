import React from 'react';
import { CirclePicker } from 'react-color';

const ColorPicker= ({ handleColorChange }) => {

    const presetColors = [
        '#bee3f8', // blue-200
        '#c6f6d5', //'green-200'
        '#b2f5ea', //'teal-200'
        '#fef3c7', //'yellow-200'
        '#e2e8f0', // gray-200',
      ];

  return (
    <div className="w-full max-w-xs flex justify-center">
      <CirclePicker
        
        colors={presetColors} // Especifica los colores predefinidos
        onChange={handleColorChange} // Función para manejar cambios de color
      />
    </div>
  );
};

export default ColorPicker;