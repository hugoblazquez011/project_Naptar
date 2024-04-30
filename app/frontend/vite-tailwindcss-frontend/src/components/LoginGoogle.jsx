import React from 'react';
// import {GoogleLogin} from 'react-google-login';

const clientId = "1079608861350-n5ggkb1ps4ubigrcmf466kb11t89g75f.apps.googleusercontent.com";

const LoginGoogle = () => {
    const onSucces =(res) => {
        console.log("Succes: ",res.profileObj)
    }

    const onFailure =(res) => {
        console.log(res)
    }

  return (
    <div id ="signInButton">
        {/* <GoogleLogin
            clientId = {clientId}
            buttonText ="Login"
            onSucces ={onSucces}
            onFailure = {onFailure}
            cookiePolicy = {'single_host_origin'}
            isSignedIn ={true}
        ></GoogleLogin> */}
    </div>
  )
}

export default LoginGoogle