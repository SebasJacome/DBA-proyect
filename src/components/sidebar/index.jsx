import React from "react"
import './sidebar.scss'
import josemi from '../../assets/josemi.jpeg'
import world_ico from '../../assets/world-svgrepo-com.svg'

const Sidebar = () =>{
    return (
        <div className="Sidebar">
            <div className="sidebar-header">
                <img src={world_ico}/>
                <h1>WORLD</h1>   
            </div>
            <div>
                <ul>
                    <li className="sidebar-content-list">
                        <img src=""/>
                        Dashboard
                    </li>
                    <li className="sidebar-content-list">
                        <img src=""/>
                        Languages
                    </li>
                    <li className="sidebar-content-list">
                        <img src=""/>
                        Population
                    </li>
                    <li className="sidebar-content-list">
                        <img src=""/>
                        Dashboard
                    </li>
                    <li className="sidebar-content-list">
                        <img src=""/>
                        Dashboard
                    </li>
                    
                </ul>
            </div>
            <div className="user">
                <div>
                    <img src={josemi}/>
                </div>
                <p className="user-name">Josemi Sus</p>
                <p className="user-email">pepekuri@gmail.com</p>
            </div>
        </div>
    )
}
export default Sidebar