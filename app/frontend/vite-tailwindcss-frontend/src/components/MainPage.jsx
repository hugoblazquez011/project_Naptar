import React from 'react'

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link } from 'react-router-dom';

import {CalendarPhoto} from '../assets'

import {mainPageText,navLinks, buttons} from '../constants'



const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // Cambiar color primario
    },
    secondary: {
      main: '#CA2968', // Cambiar color secundario
    },
  },
});

const MainPage = () => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">    
                {mainPageText.map((text) => (
                  <h1 key={text.id} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-normal">
                    {text.id === 'text1' && text.content}
                  </h1>
                 ))}
                 {mainPageText.map((text) => (
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                     {text.id === 'text2' && text.content}
                  </p>
                 ))}
                <div className="w-full max-w-sm mx-auto space-y-2">
                  {/* Buttons TryOut SignUp */}
                <ul className='list-none flex flex-row justify-center items-center flex-1'>
                  {buttons.map((button, index) => (
                    <li key={button.id} className='font-poppins font-normal text-[16px] mr-4 text-white'>
                      <ThemeProvider theme={theme}>
                        <Button
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 400,
                            fontSize: 16
                          }}
                          variant="contained"
                          color={`${button.color}`}
                          component={Link}
                          to={`${button.id}`}
                        >
                          {button.title}
                        </Button>
                      </ThemeProvider>
                    </li>
                  ))}
                </ul>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sign up to get notified when we launch.
                    <Link className="underline underline-offset-2" href="#">
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <img
              alt="Photo"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
           
              src={CalendarPhoto}
              height={400} 
            />
          </div>
        </div>
      </section>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <div className="hidden lg:flex">
          <Link href="#">
            <FlagIcon className="h-6 w-6" />
            <span className="sr-only">Company Name</span>
          </Link>
        </div>
        <div className="w-[150px]">
          <Link className="mr-6 hidden lg:flex" href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </div>
        <div className="ml-auto">
          <Button>Get Started</Button>
        </div>
      </header>
    </>
  
  )
}

export default MainPage


function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}