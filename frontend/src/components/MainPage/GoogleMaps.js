import React from 'react'
import gmaps from './post1.png'
import './MainPage.css'

function GoogleMaps() {
  return (
    <div className='box' data-aos="fade-left">
        <div className='box-left'>
            <img src={gmaps} alt="google maps" id="splash-postcard"/>
        </div>
        <div className='box-right' id="postcard-right">
            <div className='box-right-up'>
                <h2 id="postcards">PostCards</h2>
            </div>
            <ul>
                <li className='splash-lists'>Users communicate using a Quill text editor that allows rich content</li>
                <li className='splash-lists'>Users posts are based on the location of their post</li>
                <li className='splash-lists'>Users can attach multiple photos to their posts.</li>
            </ul>
        </div>
    </div>
  )
}

export default GoogleMaps