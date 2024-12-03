import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import Events from './pages/Events'
import EventsDetail from './pages/EventsDetail'
import './App.css'

function App() {

  return (
    <>
      <div>
        <Events />
      </div>
    </>
  )
}

export default App
