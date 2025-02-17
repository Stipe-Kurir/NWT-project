import React, {useState, Component} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';

import Icon from './icon';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signin, signup} from '../../actions/auth';

const initialState={firstName:'',
lastName:'',
email:'',
password:'',
confirmPassword:''
}


const Auth = () => {
const classes= useStyles();
//const state = null;
//const isSignup=true;
const [showPassword, setShowPassword]=useState(false);
const [isSignup, setIsSignup]=useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();

const [formData,setFormData]=useState(initialState);


const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );

const handleSubmit = (e) =>{
  e.preventDefault();
 if(isSignup)
 {
 dispatch(signup(formData,navigate));
 }
 else{
  dispatch(signin(formData,navigate));
 }
};

const handleChange = (e) =>{
  setFormData({...formData,[e.target.name]:e.target.value})

};

const switchMode = () =>{

  setIsSignup((prevIsSignup) => !prevIsSignup);
  setShowPassword(false);
 

};


  return (
    <Container component="main" maxWidth="xs" >
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />

        </Avatar>
        <Typography variant="h5" >
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
               
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
               
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password" }  handleShowPassword={handleShowPassword} />

              {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}  type="password" /> }
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' :'Sign In' }
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign In': "Don't have an account? Sign Up " }
                </Button>
            </Grid>

          </Grid>
        </form>

      </Paper>
    </Container>
  );
};

export default Auth;



/*const googleSuccess = async (res) =>
{
   const result = res?.profileObj;
   const token =res?.tokenId;

   console.log(res);

   try{
      dispatch({type:'AUTH', data: {result, token} });
      navigate("/");
   }catch(error)
   {
    console.log(error);
   }
   
};

const googleError = (error) =>
{
  console.log(error);
  console.log("Google Sign In failed. Try again later");
  

//staviti google login kad završiš sve!!
   <GoogleLogin

             render={(renderProps) => (
              <Button className={classes.googleButton} 
              color="primary" 
              fullWidth 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled} 
              startIcon={<Icon />} 
              variant="contained">
                Google Sign In
              </Button>
            
             )}
             onSuccess={googleSuccess}
             onError={googleError}
             cookiePolicy="single_host_origin"
          />
         
};
*/