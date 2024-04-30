import axios from 'axios';

const login = async (email, password) => {
  // Construye la URL con los parámetros
  const url = `http://localhost:8081/login?emailUsername=${email}&password=${password}`;

  try {

    // Esperar 10 segundos
    await new Promise(resolve => setTimeout(resolve, 3 * 1000));

    // Realiza la solicitud GET utilizando Axios
    const response = await axios.get(url);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    // Maneja los errores
    console.error('Error:', error);
    // Retorna un objeto de error si es necesario
    return { error: error.message };
  }
}

const register = async (firstName, lastName, username, email, password) => {
  // Construye la URL con los parámetros
  const url = `http://localhost:8081/register?firstName=${firstName}&lastName=${lastName}&username=${username}&email=${email}&password=${password}`;

  try {
    // Esperar 10 segundos
    await new Promise(resolve => setTimeout(resolve,3 * 1000));

    // Realiza la solicitud Post utilizando Axios
    const response = await axios.post(url);

    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    // Maneja los errores
    console.error('Error:', error);
    // Retorna un objeto de error si es necesario
    return { error: error.message };
  }
}

const getUserEvents = async () => {
  //Construye la URL con los parámetros
  const url = `http://localhost:8081/getUserEvents?user=hugo.blazquez`;

  try {


    // Realiza la solicitud GET utilizando Axios
    const response = await axios.get(url);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    // Maneja los errores
    console.error('Error:', error);
    // Retorna un objeto de error si es necesario
    return { error: error.message };
  }
}

const getUserPreps= async () => {
  //Construye la URL con los parámetros
  const url = `http://localhost:8081/getUserPreps?user=hugo.blazquez`;

  try {


    // Realiza la solicitud GET utilizando Axios
    const response = await axios.get(url);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    // Maneja los errores
    console.error('Error:', error);
    // Retorna un objeto de error si es necesario
    return { error: error.message };
  }
}
const getUserConfig= async () => {
  //Construye la URL con los parámetros
  const url = `http://localhost:8081/getUserConfig?user=hugo.blazquez`;

  try {


    // Realiza la solicitud GET utilizando Axios
    const response = await axios.get(url);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    // Maneja los errores
    console.error('Error:', error);
    // Retorna un objeto de error si es necesario
    return { error: error.message };
  }
}

const getUserTopics= async () => {
  //Construye la URL con los parámetros
  const url = `http://localhost:8081/getUserTopics?user=hugo.blazquez`;

  try {


    // Realiza la solicitud GET utilizando Axios
    const response = await axios.get(url);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    // Maneja los errores
    console.error('Error:', error);
    // Retorna un objeto de error si es necesario
    return { error: error.message };
  }
}


const createEvent = async (topic, name, Date, color, typeEvent, priority) => {
  const colorWithoutHash = color.replace('#', '');
  const url = `http://localhost:8081/createEvent?user=hugo.blazquez&topic=${topic}&name=${name}&Date=${Date}&color=${colorWithoutHash}&typeEvent=${typeEvent}&priority=${priority}`;

  try {
    const response = await axios.post(url);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message };
  }
}


const saveTopics = async (topics) => {
  try {
    const url = 'http://localhost:8081/saveTopics'; // URL de la API
    // Realiza la solicitud POST utilizando Axios, pasando solo 'topics' como el cuerpo de la solicitud
    const response = await axios.post(url, topics);
    // Devuelve la respuesta
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    // Maneja los errores
    console.error('Error:', error);
    // Retorna un objeto de error si es necesario
    return { error: error.message };
  }
}


const saveConfig = async (activated,sHour,eHour, nBreaks,ET1,ET2,ET3) => {


  //Construye la URL con los parámetros
  const url = `http://localhost:8081/saveConfig?user=hugo.blazquez&activated=${activated}&sHour=${sHour}&eHour=${eHour}&nBreaks=${nBreaks}&ET1=${ET1}&ET2=${ET2}&ET3=${ET3}`;

  try {


    // Realiza la solicitud POST utilizando Axios
    const response = await axios.post(url);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    // Maneja los errores
    console.error('Error:', error);
    // Retorna un objeto de error si es necesario
    return { error: error.message };
  }
}

export{
    login,
    register,
    getUserEvents,
    getUserPreps,
    saveConfig,
    getUserConfig,
    createEvent,
    saveTopics,
    getUserTopics
}
