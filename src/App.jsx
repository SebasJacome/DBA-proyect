import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'

import Dashboard from './layouts/Dashboard'
import GDP from './layouts/GDP'
import Population from './layouts/Population'
import Geography from './layouts/Geography'
import Employment from './layouts/Employment'

const tabs ={"dashboard" : <Dashboard/>, "gdp" : <GDP/>, "population" : <Population/>, "geography" : <Geography/>, "employment" : <Employment/>}

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
