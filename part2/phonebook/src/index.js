import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Fetch } from './requests/Requests'

Fetch().then((response) => {
  const persons = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App persons={persons} />)
})