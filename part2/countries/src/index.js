import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {getCountries} from './requests/Requests'


getCountries().then((result) => ReactDOM.createRoot(document.getElementById('root')).render(<App countries={result} />)).catch(err => {throw err;})