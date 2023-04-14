import React from "react"
import './sidebar.scss'
import josemi from '../../assets/josemi.jpeg'

const Sidebar = () =>{
    return (
        <div className="Sidebar">
            <h1>Sidebar</h1>
            <ul>
                <li>Dashboard</li>
                <li>Projects</li>
                <li>Task List</li>
                <li>Services</li>
                <li>Notifications</li>
                <li>Chat</li>
            </ul>
            <div className="user">
                <div>
                    <img src={josemi}/>
                </div>
                <p>Josemi Sus</p>
                <p>pepekuri@gmail.com</p>
            </div>
        </div>
    )
}
export default Sidebar