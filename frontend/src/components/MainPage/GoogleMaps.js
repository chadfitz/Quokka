import React from 'react'
import gmaps from './post1.png'
import './MainPage.css'

function GoogleMaps() {
  return (
    <div className='box' data-aos="fade-left">
        <div className='box-left'>
            <img src={gmaps} alt="google maps"/>
        </div>
        <div className='box-right'>
            <div className='box-right-up'>
                <h2>PostCards</h2>
            </div>
            <ul>
                <li className='splash-lists'>Users communicate based on location</li>
                <li className='splash-lists'>Users customize pin color based on friends/memory</li>
                <li className='splash-lists'>Users blah blah blah blah</li>
            </ul>
        </div>
    </div>
  )
}

export default GoogleMaps