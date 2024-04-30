import {useState} from 'react'

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {NaptarMenu,NaptarClose , NaptarLogo} from '../assets'

import {navLinks} from '../constants'




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



const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='w-full flex  justify-between items-center navbar'>
      <div className=' flex'>
        <div className="w-full py-6">
          <div className="container  flex items-center gap-4 px-6 md:px-6">
            <img
              className="rounded-full object-cover  aspect-square"
              height="100"
              src={NaptarLogo} 
              alt="Naptar" 
              width="100"
            />
            {/* <h1 className="text-3xl font-bold tracking-tighter  font-poppins">Naptar</h1> */}
          </div>
        </div>

        
      </div>
      {/* navbar en grande */}
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
      {navLinks.map((nav, index) => (
        <li key={nav.id} className={'font-poppins font-normal text-[16px] mr-10'}>
          {nav.id === 'tryOut' ? (
            <ThemeProvider theme={theme}>
              <Button
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: 16
                }}
                variant="contained"
                color='secondary'
                component={Link}
                to={`${nav.id}`}
               
              >
                {nav.title}
              </Button>
            </ThemeProvider>
            
          ) : (
            <Link to={`${nav.id}`}>
              {nav.title}
            </Link>
          )}
        </li>
      ))}
      </ul>
              {/* navbar en pequeño */}
      <div className='sm:hidden flex flex-1 justify-end items-center mr-2'>
        <img 
          src={toggle ? NaptarClose : NaptarMenu} 

          alt="menu" 
          className='w-[28px] h-[28px] object-contain ' 
          onClick={() => setToggle((prev) => !prev)}
        />
    
        
        <div
          
          className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          
        >
        <ul className='list-none 
            flex flex-col justify-end items-end flex-1'>
            {navLinks.map((nav, index) => (
              <li 
                key={nav.id} 
                className=
                {
                  'font-poppins font-normal text-[16px] mb-2 text-white'
                }
              >
                {nav.id === 'tryOut' ? (
                                  
                  <ThemeProvider theme={theme}>
                    <Button
                      sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: 16
                      }}
                      variant="contained"
                      color='primary'
                      component={Link}
                      to={`${nav.id}`}
                    
                    >
                      {nav.title}
                    </Button>
                  </ThemeProvider>

                ) : (
                  <Link to={`${nav.id}`}>
                    {nav.title}
                  </Link>
                )}
              </li>
            ))}
        </ul>

        </div>

      </div>


      
    </div>
  )
}

export default Navbar