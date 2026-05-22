import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Body from './Components/Body'
//import Chicken from './Components/Fish'
import { Route, Routes } from 'react-router-dom'
import Fish from './Components/Fish'
import Chicken from './Components/Chicken'
import Mutton from './Components/Mutton'
import Rice from './Components/Rice'
import Sweet from './Components/Sweet'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import Profile from './Components/Profile'

const App = () => {
  return (
    <div>
       
     <Routes>
      
      <Route path='/' element={<Navbar/>} />
      <Route path='/fish' element={<Fish/>} />
      <Route path='/chicken' element={<Chicken/>} />
      <Route path='/mutton' element={<Mutton/>} />
      <Route path='/rice' element={<Rice/>} />
      <Route path='/sweet' element={<Sweet/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      
      </Routes> 
      
    </div>
  )
}

export default App