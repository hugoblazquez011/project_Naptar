import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { getUserTopics, saveTopics } from '../functions/functions'; // Importa la función getUserTopics

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

const Modal = ({ open, handleClose }) => {
  const [topic, setTopic] = useState('');
  const [priority, setPriority] = useState('');
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
  

  const handleAddTopic = () => {
    const newTopic = { topic: topic, priority: priority };
    setTopicsList([...topicsList, newTopic]);
    setTopic('');
    setPriority('');
  };

  const handleSaveChanges = () => {

    console.log(topicsList.length);
    const formattedTopics = topicsList.map(topic => ({
      name: topic.topic,
      priority: topic.priority
    }));
    saveTopics(formattedTopics)
      .then(response => {
        if (response.status === 200) {
          handleClose();
          console.log('Topics saved successfully');
        } else {
          console.error('Failed to save topics');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
            Topics
          </Typography>
          <Box component="form" noValidate onSubmit={handleSaveChanges} sx={{ mt: 3 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="topic"
                  label="Topic"
                  autoFocus
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="priority"
                  label="Priority"
                  type="number"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleAddTopic}
                  disabled={!topic || !priority}
                  sx={{ mt: 3 }}
                >
                  Add to List
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 1 }}>Topics List</Typography>
                <List>
                  {topicsList.map((topic, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={topic.topic} secondary={`Priority: ${topic.priority}`} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            <DialogActions>
              <Button
                type="button"
                variant="contained"
                onClick={handleSaveChanges}
                disabled={topicsList.length === 0}
                sx={{ mt: 3, mb: 2, mr: 2 }}
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={handleClose}
                sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.secondary.main, color: 'white' }}
              >
                Close
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
};

export default Modal;
