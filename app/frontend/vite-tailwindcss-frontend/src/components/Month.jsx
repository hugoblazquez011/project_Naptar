import React, { useContext, useState, useEffect } from "react";
import Day from "./Day";
import CalendarButtonDR from './CalendarButtonDownRight';
import CalendarButtonTL from './CalendarButtonTopLeft';
import Modal from './Modal';
import ModalConfig from './ModalConfig';
import ModalTopics from './ModalTopics';

import {getUserConfig, getUserEvents, getUserPreps} from '../functions/functions';
const Month = ({ month }) => {
  
    // Estaria bien que puedas crear un evento al hacer doble click en un dia

  const [createEvent, setCreateEvent] = useState(false);
  const [iconTopic, setIconTopic] = useState();
  const [typeEvent, setTypeEvent] = useState("Exam");


  const [config, setConfig] = useState(false);
  const [topics, setTopics] = useState(false);

  const [dayEvents, setDayEvents] = useState([]);
  const [dayPreps, setDayPreps] = useState([]);
  const [configData, setConfigData] = useState({
    activated: false,
    sHour: '',
    eHour: '',
    nBreaks: 0, 
    ET1: '', 
    ET2: '', 
    ET3: '', 
  });

  const [activation, setActivation] = useState(false);

  const handleCreateEvent = ( iconTopic,typeEvent) => {
    setIconTopic(iconTopic);
    setTypeEvent(typeEvent);
    setCreateEvent(true); // Open the modal
  };
  const handleCloseCreateEvent = () => {
    setCreateEvent(false);
  };

  const handleConfig = () => {

    fetchConfiguration();
    setConfig(true); // Open the modal
  };
  const handleCloseConfig = () => {
    setConfig(false);
  };


  const handleTopics = () => {

    setTopics(true); // Open the modal
  };
  const handleCloseTopics = () => {
    setTopics(false);
  };


  useEffect(() => {
    async function fetchEvents() {

      getUserEvents().then(response => {
        if (response.status == 200){
          setDayEvents(response.data);
         //llamada get para actualizar 3el calendario
         //window.location.href = "/naptar";
          
       }
     })
    } 
    async function fetchPreparations() {

      getUserPreps().then(response => {
        if (response.status == 200){
          setDayPreps(response.data);
         //llamada get para actualizar 3el calendario
         //window.location.href = "/naptar";
          
       }
     })
     //console.log(dayPreps);
    }
    

    //console.log('Month config:', configData);
    fetchEvents();
    fetchPreparations() ;
  });
  const fetchConfiguration = (event) => {

    

    try {
      getUserConfig().then(response => {
        if (response.status == 200){
         
  
          const activatedBool =response.data.activated === 'true';
          setActivation(activatedBool);
  
          setConfigData({
            activated: response.data.activated === 'true', // Convertir a booleano
            sHour: response.data.sHour,
            eHour: response.data.eHour,
            nBreaks: parseInt(response.data.nBreaks), // Convertir a entero
            ET1: response.data.ET1, 
            ET2: response.data.ET2, 
            ET3: response.data.ET3, 
          });
         //llamada get para actualizar 3el calendario
         //window.location.href = "/naptar";
          
       }
     })
      
    } catch (error) {
      // Maneja los errores si es necesario
      console.error('Error:', error);
    }

   

  };
 

  return (
    <div className="relative h-screen w-full">
      {/* Contenido detrás del SpeedDial */}
      <div className="flex-1 z-0 grid grid-cols-7 grid-rows-5 h-full">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} events={dayEvents}preps={dayPreps} rowIdx={i} showPreps={activation} />
            ))}
          </React.Fragment>
        ))}
      </div>

      <CalendarButtonTL onClickConfig={handleConfig} onClickTopics={handleTopics}/>
      <ModalConfig open = {config} handleClose={handleCloseConfig} config= {configData} setConfigData={setConfigData} ></ModalConfig>

      <ModalTopics open = {topics} handleClose={handleCloseTopics} ></ModalTopics>
      {/* SpeedDial en la parte delantera */}
      <CalendarButtonDR handleCreateEvent={handleCreateEvent}config= {configData} />
      <Modal open={createEvent} handleClose={handleCloseCreateEvent} iconTopic = {iconTopic} typeEvent= {typeEvent}/>
    </div>
  );
};

export default Month;
