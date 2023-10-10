import { Input, Button } from '@mui/joy'
import { Alert, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import isValidEmail from '../helper/checkEmail'
import isValidPassword from '../helper/checkPassword'
import axios from "axios"



function SignUp() {
  const [alert, setAlert] = useState({ type: '', message: '' })

  const signUpHandler = async (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (name === '') { setAlert({ type: 'error', message: ' Name is missing' }); return false }
    if (email === '') { setAlert({ type: 'error', message: 'email is missing' }); return false };
    if (password === '') { setAlert({ type: 'error', message: 'password is missing' }); return false }

    if (name > 2) { setAlert({ type: 'error', message: ' Name must be contain more then 2 character' }); return false }
    if (!isValidEmail(email)) { setAlert({ type: 'error', message: 'inValid Email' }); return false }
    if (!isValidPassword(password)) { setAlert({ type: 'error', message: 'password must be combination of letters, numbers, and special characters minimum length 8 characters ex: rC@mB93d' }); return false }


    try {
      const Data = await axios.post('http://localhost:3245/auth/signup', {
        name: name,
        email: email,
        password: password
      })

      setAlert({ type: 'success', message: Data.data.msg });
      return true
    } catch (error) {
      const errorHandle = error.response.data.errors[0]
      setAlert({ type: 'error', message: errorHandle.msg });
    }
  }

  return <>
    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
      <Box onSubmit={signUpHandler} width={'80%'} component='form' >
        <Typography variant="h4" color="rgb(129 123 227 / 87%)" mb={4}>SIGNUP</Typography>
        <Input id='name' sx={{ mb: 2 }} color="neutral" size="md" variant="soft" placeholder="Name…" />
        <Input id='email' sx={{ mb: 2 }} color="neutral" size="md" variant="soft" placeholder="Email…" />
        <Input id='password' sx={{ mb: 2 }} color="neutral" size="md" variant="soft" placeholder="Password…" />
        <Box sx={{ mb: 2 }} textAlign='center' mt={3}>
          <Button type='submit' variant="soft">SIGNUP</Button>
        </Box>
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Box>
    </div>
  </>
}

export default SignUp