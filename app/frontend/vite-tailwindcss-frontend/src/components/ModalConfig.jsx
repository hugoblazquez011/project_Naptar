import React, { useState } from 'react';
import { Dialog, DialogActions, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import {saveConfig} from '../functions/functions';


import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';


import Toggle from './Toggle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // Cambiar color primario según tu tema
    },
    secondary: {
      main: '#CA2968', // Cambiar color secundario según tu tema
    },
  },
});

const Modal = ({ open, handleClose ,config, setConfigData}) => {

    const [startHour, setStartHour] = useState(dayjs('2022-04-17T08:00')); // Hora de inicio predeterminada
    const [endHour, setEndHour] = useState(dayjs('2022-04-17T21:30')); // Hora de finalización predeterminada

    // Función para manejar el cambio de hora de inicio
    const handleStartHourChange = (newHour) => {
        setStartHour(newHour); // Actualizar el estado con la nueva hora seleccionada
        saveHours(newHour, endHour); // Guardar las horas al cambiar
    };

    // Función para manejar el cambio de hora de finalización
    const handleEndHourChange = (newHour) => {
        setEndHour(newHour); // Actualizar el estado con la nueva hora seleccionada
        saveHours(startHour, newHour); // Guardar las horas al cambiar
    };

    // Función para manejar el cambio de estado de los campos de entrada
    const handleChange = (event) => {
        const { name, value } = event.target;
        // setFormData((prevState) => ({
        //     ...prevState,
        //     [name]: value,
        //     }));
        setConfigData((prevState) => ({
                ...prevState,
                [name]: value,
                }));
    };


    const saveHours = () => {

        const startDate = new Date(startHour);
        const endDate = new Date(endHour);
            
        // Obtener la hora y los minutos
        const startHours = startDate.getHours().toString().padStart(2, '0'); // Obtener la hora y rellenar con cero si es necesario
        const startMinutes = startDate.getMinutes().toString().padStart(2, '0'); // Obtener los minutos y rellenar con cero si es necesario

        // Obtener la hora y los minutos
        const endHours = endDate.getHours().toString().padStart(2, '0'); // Obtener la hora y rellenar con cero si es necesario
        const endMinutes = endDate.getMinutes().toString().padStart(2, '0'); // Obtener los minutos y rellenar con cero si es necesario

        const startFormattedTime = `${startHours}:${startMinutes}`;
        const endFormattedTime = `${endHours}:${endMinutes}`;

        setConfigData((prevState) => ({
            ...prevState,
            sHour: startFormattedTime, // Guardar la hora de inicio formateada
            eHour: endFormattedTime,   // Guardar la hora de fin formateada
        }));
        
    };

    const handleSave = (event) => {
        event.preventDefault();
        // Send data

        try {
          saveConfig(config.activated, config.sHour,config.eHour,config.nBreaks,config.ET1,config.ET2,config.ET3)
          .then(response => {
                if (response.status == 200){
                    console.log('Saved data:', config);
                    handleClose();

                    console.log('Estado de la respuesta:', response.status);
                    console.log('Cuerpo de la respuesta:', response.data);
                    //llamada get para actualizar 3el calendario
                    //window.location.href = "/naptar";
            
                }
          })
        
        } catch (error) {
          // Maneja los errores si es necesario
          console.error('Error:', error);
        }

    };

    const handleToggleChange = () => {

        setConfigData((prevState) => ({
            ...prevState,
            activated: !prevState.activated,
            }));
    };
    

    return (
        <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { backgroundColor: theme.palette.primary.main } }}>
            <Box
            sx={{
                margin: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography component="h1" variant="h5">
                Configuration
            </Typography>
            <Box component="form" noValidate onSubmit={(event) => {handleSave(event)}} sx={{ mt: 3 }}>
                < Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* Activar/Desactivar preparación automática de eventos */}
                        <Typography variant="body1">Activate/Deactivate auto event preparation</Typography>
                        <Toggle isChecked={config.activated} handleChange={handleToggleChange} />
                    </Grid>
                    {/* Hora de inicio,Hota de fin, horas maximas, numeros de descansos, tipo de eventos */}
                
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="Start hour">
                            <TimePicker 
                                value={startHour} // Valor actual
                                onChange={handleStartHourChange} // Función para manejar el cambio
                            />
                            </DemoItem>
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem label="End hour">
                            <TimePicker 
                                //defaultValue={dayjs(config.eHour, 'HH:mm')} 
                                value={endHour} // Valor actual
                                //value={dayjs(config.eHour, 'HH:mm')} // Valor actual
                                onChange={handleEndHourChange} // Función para manejar el cambio
                            
                            />
                            </DemoItem>
                        </LocalizationProvider>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="nBreaks"
                        required
                        fullWidth
                        id="nBreaks"
                        label="Number of breaks per day"
                        autoFocus
                        value={config.nBreaks}
                        onChange={handleChange}
                        />
                </Grid>
                {/* Event Type */}
                {/* Button 1 🥶 */}
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="ET1"
                    label="Event type button 1 "
                    name="ET1"
                    autoComplete="family-name"
                    value={config.ET1}
                    onChange={handleChange}
                    />
                </Grid>
                {/* Button 2 🥵 */}
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="ET2"
                    label="Event type button 2"
                    name="ET2"
                    autoComplete="family-name"
                    value={config.ET2}
                    onChange={handleChange}
                    />
                </Grid>
                {/* Button 3 😜 */}
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="ET3"
                    label="Event type button 3"
                    name="ET3"
                    autoComplete="family-name"
                    value={config.ET3}
                    onChange={handleChange}
                    />
                </Grid>

                </Grid>

                
                <DialogActions>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    onClick={handleClose}
                    sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.secondary.main, color: 'white' }} // Usando el color primario del tema
            
                >
                    Close
                </Button>
                {/* Puedes agregar más botones de acción si es necesario */}
                </DialogActions>
            </Box>
            </Box>
        
        </Dialog>
        </ThemeProvider>
    );
};

export default Modal;
