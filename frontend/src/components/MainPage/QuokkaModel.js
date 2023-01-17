import React from 'react'
import quokkas from './quokkas2.png'
import './MainPage.css'

function Quokkas() {
  return (
    <div className='box' data-aos="fade-right">
        <div className='box-left'>
            <div className='box-left-up'>
                <h2>Mission Statement</h2>
            </div>
            <ul>
                <li className='splash-lists'>We are focused on quality rather than quantity</li>
                <li className='splash-lists'>Users are limited to how often they can post</li>
                <li className='splash-lists'>Users interact with random members of their friend group</li>
            </ul>
        </div>
        <div className='box-right'>
            <img src={quokkas} alt="google maps"/>
        </div>
    </div>
  )
}

export default Quokkas