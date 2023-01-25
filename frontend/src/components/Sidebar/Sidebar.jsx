import "./Sidebar.css"
import {BsBookFill, BsFillPencilFill} from 'react-icons/bs';
import {FaUser, FaUserFriends} from 'react-icons/fa';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div><Link to={"/profile"} className='sidebar-link'><FaUser/>&nbsp;&nbsp;Profile</Link></div>
        <div><Link to={"/"} className='sidebar-link'><BsBookFill/>&nbsp;&nbsp;Book</Link></div>
        <div><Link to={"/posts/new"} className='sidebar-link'><BsFillPencilFill/>&nbsp;&nbsp;Create</Link></div>
        <div><Link to={"/users"} className='sidebar-link'><FaUserFriends/>&nbsp;&nbsp;Friends</Link></div>
    </div>
  )
}

export default Sidebar
