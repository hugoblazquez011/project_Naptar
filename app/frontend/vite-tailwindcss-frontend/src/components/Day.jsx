import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day, rowIdx, events ,preps, showPreps}) => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);


  function hexToTailwind(hexColor) {
    if(!hexColor){
      return '#bee3f8';
    }
    else{
      return  `#${hexColor}`;
    }
    
}



  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <h1 className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            
            {day.format("ddd").toUpperCase()}
          </h1>
        )}
        <p
          className={`text-sm p-1 my-1 text-center `}
          // onClick={() => {
          //   setDaySelected(day);
          //   setShowEventModal(true);
          // }}
        >
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1 cursor-pointer">
        {events.map((evt, idx) => {// Convertir la fecha a un objeto Date
          const eventDate = new Date(evt.Date);

          // Obtener el día, mes y año de la fecha
          const dayEvent = eventDate.getDate();
          const monthEvent = eventDate.getMonth() + 1; // Los meses van de 0 a 11, así que se suma 1
          const yearEvent = eventDate.getFullYear();
          // Formatear la fecha como 'DD-MM-YYYY'
          const date_join = `${yearEvent}-${monthEvent < 10 ? '0' + monthEvent : monthEvent}-${dayEvent < 10 ? '0' + dayEvent : dayEvent}`;

          const formattedDate = dayjs(date_join).format("DD-MM-YY");
          const formattedDateDay = day.format("DD-MM-YY");

          const isEventOnCurrentDay = formattedDate === formattedDateDay;
          
          const formattedHexColor = hexToTailwind(evt.color);
          
          if (isEventOnCurrentDay) {

            //console.log( evt.topic+ "--- "+evt.name +"----"+formattedDate + " -- " + formattedDateDay)
            return (
              <div
                key={idx}
                // onClick={() => setSelectedEvent(evt)}
                className={`p-1 mr-3 text-gray-600 text-sm rounded m-1 truncate`}
                style={{ backgroundColor: formattedHexColor }}
              >
                {evt.topic} - {evt.name}
              </div>
            );
          }
        })}
        {showPreps && (
          preps.map((prs, idx) => {
            const formattedDateDay = day.format("YYYY-MM-DD");
            const isEventOnCurrentDay = prs.date === formattedDateDay;
            if (isEventOnCurrentDay) {
              return (
                <div
                  key={idx}
                  className="p-1 mr-3 text-gray-600 text-sm rounded m-1 truncate"
                  style={{ borderColor: prs.color, borderWidth: '4px', borderStyle: 'solid', borderRadius: '5px' }}
                >
                  Prep: {prs.name} - {prs.topic} 
                </div>
              );
            }
          })
        )}    
      </div>


    </div>
  );
}

export default Day;
