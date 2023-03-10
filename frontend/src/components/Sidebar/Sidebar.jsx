import "./Sidebar.css"
import {BsBookFill, BsFillPencilFill} from 'react-icons/bs';
import {FaUser, FaUserFriends, FaDev} from 'react-icons/fa';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div><Link to={"/profile"} className='sidebar-link'><FaUser/>&nbsp;&nbsp;Profile</Link></div>
        <div><Link to={"/"} className='sidebar-link'><BsBookFill/>&nbsp;&nbsp;Feed</Link></div>
        <div><Link to={"/posts/new"} className='sidebar-link'><BsFillPencilFill/>&nbsp;&nbsp;Create</Link></div>
        <div><Link to={"/users"} className='sidebar-link'><FaUserFriends/>&nbsp;&nbsp;Following</Link></div>
        <div><Link to={"/team"} className='sidebar-link'><FaDev/>&nbsp;&nbsp;Team</Link></div>
    </div>
  )
}

export default Sidebar
