import React from 'react';
import { Navbar, MainPage, Performance, TaskPlanning, StorageFiles, Testimony, Examples, TryOutButton, Footer } from './index';
import styles from '../style';


import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff', // Cambiar color primario
      },
      secondary: {
        main: '#3E3F45', // Cambiar color secundario
      },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif', // Define la fuente que deseas utilizar
      
      
      fontSize: 11
    },
    
  });

const Home = () => {
  return (

    <ThemeProvider theme={theme}>
         <div className="w-full h-full overflow-hidden bg-gradient-to-r from-white to-gray-200 ">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                <Navbar />
                </div>
            </div>

            <div className={`${styles.flexStart} ml-28`}>
                <div className={styles.boxWidth}>
                <MainPage />
                
                </div>
            </div>

            <div className={` ${styles.paddingX} ${styles.flexStart}`}>
                <div className={styles.boxWidth}>
                <TaskPlanning />
                <Performance />
                <StorageFiles />
                <Testimony />
                <Examples />
                <TryOutButton />
                <Footer />
                </div>
            </div>
        </div>
    </ThemeProvider>
   
  );
}

export default Home;
