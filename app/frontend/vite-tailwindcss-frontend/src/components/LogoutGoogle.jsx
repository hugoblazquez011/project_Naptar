import React from 'react'

// import {GoogleLogin} from 'react-google-login';

const clientId = "1079608861350-n5ggkb1ps4ubigrcmf466kb11t89g75f.apps.googleusercontent.com";


const LogoutGoogle = () => {


    const onSucces =(res) => {
        console.log("Logout succes")
    }
  return (
    <div id ="signOutButton">
        {/* <GoogleLogin
            clientId = {clientId}
            buttonText ="Logout"
            onLogoutSucces ={onSucces}
        ></GoogleLogin> */}
    </div>
  )
}

export default LogoutGoogle