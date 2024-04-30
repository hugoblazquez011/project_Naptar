import React, { useState ,useEffect} from 'react';
import { Dialog, DialogActions, Button, Select, MenuItem  } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ColorPicker from './ColorPicker';
import FileUpload from './FileUpload';
import dayjs from 'dayjs';

import {createEvent,getUserTopics} from '../functions/functions';


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

const Modal = ({ open, handleClose,  iconTopic ,typeEvent}) => {

  const [color, setColor] = useState('#ffffff');

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const [formData, setFormData] = useState({
    topic: '',
    name: '',
    Date: new Date(),
    color: '#ffffff', 
    priority: 3, 
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send data
    

    try {
      const formattedDate = dayjs(formData.Date, 'DD/MM/YYYY').format('YYYY-MM-DD');
      console.log("Topic: " + formData.topic + " Name: " + formData.name + " Date: " + formattedDate+ " Color: " + color + " Priority " +  formData.priority);
      createEvent(formData.topic, formData.name,formattedDate, color,typeEvent,formData.priority)

      .then(response => {
         if (response.status == 200){
          
          handleClose();

          console.log('Estado de la respuesta:', response.status);
          console.log('Cuerpo de la respuesta:', response.data);
          //llamada get para actualizar 3el calendario
          //window.location.href = "/naptar";
           
        }
        else{

          console.log('Estado de la respuesta:', response.status);
          console.log('Cuerpo de la respuesta:', response.data);
                }
      })
      
    } catch (error) {
      // Maneja los errores si es necesario
      console.error('Error:', error);
    }

  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleTopicChange = (event) => {
    const { value } = event.target;
    // Buscar el topic seleccionado en la lista de topics
    const selectedTopic = topicsList.find((topic) => topic.topic === value);
    // Establecer la prioridad del topic seleccionado
    setFormData((prevState) => ({
      ...prevState,
      topic: value,
      priority: selectedTopic ? selectedTopic.priority : 3, // Si no se encuentra la prioridad, por defecto es 3
    }));
  };


  // Obtener la fecha actual en el formato 'YYYY-MM-DD'
  const currentDate = dayjs().format('YYYY-MM-DD');

  const [topicsList, setTopicsList] = useState([]);


  useEffect(() => {
    const fetchUserTopics = async () => {
      try {
        const response = await getUserTopics();
        if (response.status === 200) {
          const topicsData = response.data; // Almacena los datos recibidos
          // Map para extraer el nombre y la prioridad de cada tema
          const formattedTopics = topicsData.map(topicData => ({
            topic: topicData.name, // Extrae el nombre del tema
            priority: topicData.priority // Extrae la prioridad del tema
          }));
          setTopicsList(formattedTopics); // Actualiza los temas del usuario en la lista de temas
        } else {
          console.error('Failed to fetch user topics');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    if (open) {
      fetchUserTopics(); // Llama a la función para obtener los temas del usuario cuando el modal se abre
    }
  }, [open]);

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
           <img
              className="  aspect-square"
              height="64"
              src={iconTopic} 
              alt="Event button icon" 
              width="64"
             
            />
          <Typography component="h1" variant="h5">
            Create  {typeEvent}
          </Typography>
          <Box component="form" noValidate onSubmit={(event) => {handleSubmit(event)}} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <Select
                    required
                    fullWidth
                    id="topic"
                    value={formData.topic}
                    onChange={handleTopicChange}
                  >
                    {topicsList.length === 0 && (
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                    )}
                    {topicsList.map((topic, index) => (
                      <MenuItem key={index} value={topic.topic}>
                        {topic.topic} - Priority: {topic.priority}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="family-name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Date">
                  <DatePicker   
                   onChange={(newDate) => handleChange({ target: { name: 'Date', value: newDate } })}
                  label="Date"
                
                />
                </DemoItem>
              </LocalizationProvider>
              </Grid>



              <Grid item xs={12} sm={6} sx={{ml:19, mt: 2 }}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle1">Select one color</Typography>
                  </Grid>
                  <Grid item >
                    <ColorPicker handleColorChange={handleColorChange} />
                  </Grid>
                </Grid>
                <input type="hidden" name="color" value={color} /> {/* Hidden input to store the color */}
              </Grid>


              <Grid item xs = {12}>
                <FileUpload/>
              </Grid>
            </Grid>

            
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Event
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
