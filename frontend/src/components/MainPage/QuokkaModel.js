import React from 'react'
import quokkas from './quokkas2.png'
import './MainPage.css'

function Quokkas() {
  return (
    <div className='box' data-aos="fade-up">
        <div className='box-left'>
            <div className='box-left-up'>
                <h2 id="mission-statement">Mission Statement</h2>
            </div>
            <ul>
                <li className='splash-lists'>At Quokka, we are focused on enriching the quality of users' posts</li>
                <li className='splash-lists'>Users are limited to how often they can post to ensure meaningful connections</li>
                <li className='splash-lists'>Users must interact with random members of their friend group</li>
            </ul>
        </div>
        <div className='box-right'>
            <img src={quokkas} alt="cute quokkas" id="splash-quokka"/>
        </div>
    </div>
  )
}

export default Quokkas