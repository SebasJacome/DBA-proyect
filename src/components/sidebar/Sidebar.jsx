import React from "react"
import './sidebar.scss'
import josemi from '../../assets/josemi.jpeg'
import world_ico from '../../assets/world-svgrepo-com.svg'

const Sidebar = ({setTab}) =>{
    const handleClick = (event) =>{
        const tabText = event.target.innerText
        setTab(tabText.toLowerCase())
    }
    return (
        <div className="Sidebar">
            <div className="sidebar-header">
                <img src={world_ico}/>
                <h1>World</h1>   
            </div>
            <div>
                <ul>
                    <li className="sidebar-content-list" onClick={handleClick}>
                        <img src=""/>
                        Dashboard
                    </li>
                    <li className="sidebar-content-list" onClick={handleClick}>
                        <img src=""/>
                        GDP
                    </li>
                    <li className="sidebar-content-list" onClick={handleClick}>
                        <img src=""/>
                        Geography
                    </li>
                    <li className="sidebar-content-list" onClick={handleClick}>
                        <img src=""/>
                        Population
                    </li>
                    <li className="sidebar-content-list" onClick={handleClick}>
                        <img src=""/>
                        Employment
                    </li>
                </ul>
            </div>
            <div className="user">
                <div>
                    <img src={josemi}/>
                </div>
                <p className="user-name">Jose Kuri</p>
                <p className="user-email">jose.kuri@gmail.com</p>
            </div>
        </div>
    )
}
export default Sidebar