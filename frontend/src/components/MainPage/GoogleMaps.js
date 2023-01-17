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
            <h2>PostCards</h2>
            <ul>
                <li>Users communicate based on location</li>
                <li>Users customize pin color based on friends/memory</li>
                <li>Users blah blah blah blah</li>
            </ul>
        </div>
    </div>
  )
}

export default GoogleMaps