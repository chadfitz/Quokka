import React from 'react'
import gmaps from './post1.png'
import './MainPage.css'

function Statistics() {
  return (
    <div className='box' data-aos="fade-right" id="splash-statistics">
        <div className='stat-container'>
        <div className='box-left-stat'>
            <div className='box-left-up'>
                <h2 id="statistics">Over 15 users</h2>
            </div>
            <ul>
                <li className='splash-lists'>Users from 4 different countries!</li>
                <li className='splash-lists'>Users visit Quokka on average 2.7 times per day</li>
                <li className='splash-lists'>Users average using Quokka 4 hours per week</li>
            </ul>
        </div>
        <div className='box-middle-stat'>
            <div className='box-middle-up'>
                <h2 id="statistics">Quokka is Global</h2>
            </div>
            <ul>
                <li className='splash-lists'>Users have posted memories from every continent</li>
                <li className='splash-lists'>Users have written posts from 15 countries</li>
                <li className='splash-lists'>Projected to have users in 35 countries by the end of 2023</li>
            </ul>
        </div>
        <div className='box-right-stat'>
            <div className='box-right-up'>
                <h2 id="statistics">Over 30 Total Posts</h2>
            </div>
            <ul>
                <li className='splash-lists'>Projected to have over 1000 posts by 2024</li>
                <li className='splash-lists'>Users have written over 20 replies</li>
                <li className='splash-lists'>Users have reacted over 40 times to posts!</li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Statistics