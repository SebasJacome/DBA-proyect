import React from "react"
import './Sidebar.scss'
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
                        DashboardSAD
                    </li>
                    <li className="sidebar-content-list" onClick={handleClick}>
                        <img src=""/>
                        GDP
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