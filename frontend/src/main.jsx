import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router"
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!PUBLISHABLE_KEY){
  throw new Error("key missing");
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
