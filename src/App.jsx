import { useState } from 'react'
import Sidebar from './components/sidebar'

import Dashboard from './layouts/Dashboard'
import Prueba from './layouts/Prueba'

const tabs ={"dashboard" : <Dashboard/>, "prueba" : <Prueba/>}

function App() {
  const [tab, setTab] = useState ("dashboard");
  console.log(tab)
  return (
    <>
      <Sidebar setTab={setTab}/>
      <main>
        {
          tabs[tab]
        }
      </main>
    </>
    
  )
}

export default App
