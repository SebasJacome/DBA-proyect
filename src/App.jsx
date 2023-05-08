import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'

import Dashboard from './layouts/Dashboard'
import GDP from './layouts/GDP'

const tabs ={"dashboard" : <Dashboard/>, "gdp" : <GDP/>}

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
