import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";


import {TopicsIcon , ConfigIcon} from '../assets'

 
const CalendarButtonTopLeft=  ({ onClickConfig,onClickTopics}) => {
     return (
        
        <div className="absolute top-8 left-0 ml-8 z-11">
            <SpeedDial placement="top">
                <SpeedDialHandler>
                    {/* Cambia bg-gray-700 por bg-custom-color */}
                    <IconButton size="lg" className="rounded-full flex bg-custom-color mr-8">
                        <PlusIcon className="h-12 w-12 lg:h-12 lg:w-12 text-gray-200 transition-transform group-hover:rotate-45" />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <SpeedDialAction>
                        <img
                            className="rounded-full object-cover  aspect-square h-8 w-8"
                            height="25"
                            src={TopicsIcon} 
                            alt="Event button 3" 
                            width="25"
                            onClick={(event) => onClickTopics(event)}  
                        />
                    </SpeedDialAction>
                    <SpeedDialAction>
                        <img
                            className="rounded-full object-cover  aspect-square h-8 w-8"
                            height="25"
                            src={ConfigIcon} 
                            alt="Event button 3" 
                            width="25"
                            onClick={(event) => onClickConfig(event)}
                        />
                    </SpeedDialAction>

{/* 
                    <SpeedDialAction>
                        <Square3Stack3DIcon className="h-8 w-8" />
                    </SpeedDialAction> */}
                </SpeedDialContent>
            </SpeedDial>
            </div>
       

    )
   
  }
  
  export default CalendarButtonTopLeft