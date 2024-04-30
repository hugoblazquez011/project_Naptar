import React, { useState ,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import LoadingRegisterLogin from './LoadingRegisterLogin';
import ForgotPswd from './ForgotPswd';



import {login} from '../functions/functions';


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // Cambiar color primario
    },
    secondary: {
      main: '#CA2968', // Cambiar color secundario
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // Define la fuente que deseas utilizar
    
    
    fontSize: 11
  },
});


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const [loading, setLoading] = useState(false);

  const [forgotP, setForgotP] = useState(false);
  const [count, setCount] = useState(0)


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('emailUsername');
    const rememberedPassword = localStorage.getItem('password');
    const rememberedChecked = localStorage.getItem('isChecked');

    if (rememberedChecked === 'true' && rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleForgotPClick = () => {
    setForgotP(true);
  };

  const handleForgotPClickClose = () => {
    setForgotP(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Send data
    const data = new FormData(event.currentTarget);
    const email= data.get('email');
    const password= data.get('password');

    
    try {
      login(email, password)
      .then(response => {
         if (response.status == 200){

          // Logic for the rememberMe checkbox
          const emailUsername = event.target.email.value;
          const password = event.target.password.value;
          const isChecked = event.target.isChecked.checked;
          
          if (isChecked) {
            localStorage.setItem('emailUsername', emailUsername);
            localStorage.setItem('password',password);
            localStorage.setItem('isChecked',isChecked);  
          }
          else if(!isChecked){
            localStorage.clear(); 
            setEmail('');
            setPassword('');
          }
          
          window.location.href = "/naptar";
           
        }
        else{
          
        }

        setLoading(false);
        console.log('Estado de la respuesta:', response.status);
        console.log('Cuerpo de la respuesta:', response.data);
        

      })
      
    } catch (error) {
      // Maneja los errores si es necesario
      console.error('Error:', error);
    }

  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ThemeProvider theme={theme}>
              <Avatar color='primary' sx={{ m: 1}}>
                <LockOutlinedIcon />
              </Avatar>
            </ThemeProvider>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={(event) => {handleSubmit(event); setLoading(true);}}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username or Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox name="isChecked" checked = {rememberMe} onChange={handleRememberMeChange} color="primary" />}
              // checked={rememberMe} onChange={handleRememberMeChange}
              label="Remember me"
            />
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: 16
                  }}
                  variant="contained"
                  color='secondary'
                >
                  Sign In
                </Button>  
              </ThemeProvider>
              
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2 " onClick={handleForgotPClick} >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>

                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <div style={{ position: 'relative' }}>
        {loading && <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo claro transparente
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',}
          }>
            <LoadingRegisterLogin></LoadingRegisterLogin>
          </div>}
      </div>
      <div style={{ position: 'relative' }}>
        {forgotP && <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo claro transparente
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',}
          }>
            
          <div>
            <ThemeProvider theme={theme} >
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                    <div class="w-72 h-80 mx-auto bg-gray-100 rounded-xl shadow-2xl" >
                        <div class="flex items-center p-3">
                            <div class="px-1">
                                <span class="w-4 h-4 rounded-full inline-block bg-red-500 cursor-pointer" onClick={handleForgotPClickClose}></span>
                            </div>
                            <div class="px-1">
                                <span class="w-4 h-4 rounded-full inline-block bg-yellow-400 cursor-pointer"></span>
                            </div>
                            <div class="px-1">
                                <span class="w-4 h-4 rounded-full inline-block bg-green-500 cursor-pointer"></span>
                            </div>
                          
                        </div>
                        <div class="relative mt-6 m-4">
                            <input
                                type="email"
                                placeholder="Email address"
                                autocomplete="email"
                                aria-label="Email address"
                                class="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                            />
                            <div class="absolute inset-y-1 right-1 flex justify-end">
                                <button
                                type="submit"
                                aria-label="Submit"
                                class="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
                                >
                                <svg viewBox="0 0 16 6" aria-hidden="true" class="w-4">
                                    <path
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                                    ></path>
                                </svg>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </ThemeProvider>
             
              
          </div>
          </div>}
      </div>
    </ThemeProvider>
  );
}
