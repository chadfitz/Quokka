import React from 'react'
import gmaps from './post1.png'
import './MainPage.css'

function Statistics() {
  return (
    <div className='box' data-aos="fade-right" id="splash-statistics">
        <div className='box-left-stat'>
            <div className='box-left-up'>
                <h2 id="statistics">Over 15 users</h2>
            </div>
            <ul>
                <li className='splash-lists'>At least 30 friendships</li>
                <li className='splash-lists'>At least 5 pictures of Quokkas</li>
                <li className='splash-lists'>Another interesting statistic</li>
            </ul>
        </div>
        <div className='box-middle-stat'>
            <div className='box-middle-up'>
                <h2 id="statistics">Users from all over</h2>
            </div>
            <ul>
                <li className='splash-lists'>Posts from every continent</li>
                <li className='splash-lists'>Users from 4 different countries</li>
                <li className='splash-lists'>I don't know what to write here</li>
            </ul>
        </div>
        <div className='box-right-stat'>
            <div className='box-right-up'>
                <h2 id="statistics">Over 30 Posts</h2>
            </div>
            <ul>
                <li className='splash-lists'>And Counting....</li>
                <li className='splash-lists'>At least 10 replies</li>
                <li className='splash-lists'>Over 5 reactions</li>
            </ul>
        </div>
    </div>
  )
}

export default Statistics