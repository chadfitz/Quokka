import React from 'react'
import gmaps from './post1.png'
import './MainPage.css'

function Statistics() {
  return (
    <div className='box' data-aos="fade-up">
        <div className='box-left'>
            <h2>Over 15 registered users</h2>
            <h3>At least 30 friendships</h3>
            <h3>At least 5 pictures of Quokkas</h3>
        </div>
        <div className='box-middle'>
            <h2>Posts from every continent</h2>
            <h3>Users from 4 different countries</h3>
            <h3>I don't know what to write here</h3>
            
        </div>
        <div className='box-right'>
            <h2>Over 30 posts</h2>
            <h3>At least 10 replies</h3>
            <h3>Over 5 reactions</h3>
        </div>
    </div>
  )
}

export default Statistics