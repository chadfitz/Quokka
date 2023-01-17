import React from 'react'
import gmaps from './post1.png'
import './MainPage.css'

function Statistics() {
  return (
    <div className='box' data-aos="fade-up" id="splash-statistics">
        <div className='box-left'>
            <div className='box-left-up'>
                <h2>Over 15 Registered users</h2>
            </div>
            <h3>At least 30 friendships</h3>
            <h3>At least 5 pictures of Quokkas</h3>
        </div>
        <div className='box-middle'>
            <div className='box-middle-up'>
                <h2>Posts from every continent</h2>
            </div>
            <h3>Users from 4 different countries</h3>
            <h3>I don't know what to write here</h3>
            
        </div>
        <div className='box-right'>
            <div className='box-right-up'>
                <h2>Over 30 Posts</h2>
            </div>
            <h2>Over 30 posts</h2>
            <h3>At least 10 replies</h3>
            <h3>Over 5 reactions</h3>
        </div>
    </div>
  )
}

export default Statistics