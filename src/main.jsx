import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {

  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';
import 'aos/dist/aos.css';
import Aos from 'aos';
import 'aos/dist/aos.css'; 
import AuthProvider from './context/AuthContext/AuthProvider.jsx';

Aos.init()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-uniquifier max-w-7xl mx-auto'>
     <AuthProvider>
       <RouterProvider router={router} />
     </AuthProvider>
    </div>
  </StrictMode>,
)
