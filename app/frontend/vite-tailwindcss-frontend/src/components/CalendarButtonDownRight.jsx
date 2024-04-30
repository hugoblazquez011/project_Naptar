import React from "react";
import { IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction } from "@material-tailwind/react";
import { PlusIcon, HomeIcon, CogIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";

import {Exam_Icon,PR_icon , TK_icon} from '../assets'

const CalendarButtonDownRight = ({ handleCreateEvent, config }) => {

  // Función para manejar la creación de eventos
  const handleCreate = (eventName, emoji, eventConfig) => {
    handleCreateEvent(eventName, emoji, eventConfig);
  };

  return (
    <div className="absolute bottom-8 right-0 mr-8 z-10">
      <SpeedDial>
        <SpeedDialHandler>
          {/* Cambia bg-gray-700 por bg-custom-color */}
          <IconButton size="lg" className="rounded-full flex bg-custom-color mr-8">
            <PlusIcon className="h-12 w-12 lg:h-12 lg:w-12 text-gray-200 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          <SpeedDialAction title={config.ET3}>
            {/* <div className="h-6 w-6" onClick={() => handleCreateEvent("MPI 1", "😜", config.ET3)}>
              😜
            </div> */}
            <img
              className="rounded-full object-cover  aspect-square"
              height="32"
              src={TK_icon} 
              alt="Event button 1" 
              width="32"
              onClick={() => handleCreateEvent(TK_icon, config.ET3)}
            />
          </SpeedDialAction>
          <SpeedDialAction  title={config.ET2}>
            <img
              className="rounded-full object-cover  aspect-square"
              height="32"
              src={PR_icon} 
              alt="Event button 2" 
              width="32"
              onClick={() => handleCreateEvent( PR_icon, config.ET2)}
            />
          </SpeedDialAction>
          <SpeedDialAction  title={config.ET1}>
            {/* <div className="h-6 w-6" onClick={() => handleCreateEvent("EDA", "🥶", config.ET1)}>
              🥶
            </div> */}
            
            <img
              className="rounded-full object-cover  aspect-square"
              height="32"
              src={Exam_Icon} 
              alt="Event button 3" 
              width="32"
              onClick={() => handleCreateEvent( Exam_Icon, config.ET1)}
            />
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
      {/* Estilos para el IconButton */}
      <style>
        {`
          /* Clase para el color personalizado */
          .bg-custom-color {
            background-color: #CA2968; /* Color personalizado */
          }
        `}
      </style>
    </div>
  );
};

export default CalendarButtonDownRight;
