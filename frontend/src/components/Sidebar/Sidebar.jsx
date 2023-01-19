import "./Sidebar.css"
import {CgProfile} from 'react-icons/cg';
import {BsFillPencilFill} from 'react-icons/bs';
import {BsBook} from 'react-icons/bs';
import {FaUserFriends} from 'react-icons/fa';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div><Link to={"/profile"}><CgProfile/></Link></div>
        <div><Link to={"/"}><BsBook/></Link></div>
        <div><Link to={"/posts/new"}><BsFillPencilFill/></Link></div>
        <div><Link to={"/"}><FaUserFriends/></Link></div>

    </div>
  )
}

export default Sidebar
