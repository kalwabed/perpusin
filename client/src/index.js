import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ReactQueryDevtools } from 'react-query-devtools'
import { GeistProvider, CssBaseline } from '@geist-ui/react'

ReactDOM.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <App />
    </GeistProvider>
    <ReactQueryDevtools />
  </React.StrictMode>,
  document.getElementById('root')
)
