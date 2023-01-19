import React from 'react'
import linkedIn from './linkedin.png'
import github from './github.png'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
        <div className='footer-child'>
            <h3>Tom Conger</h3>
            <a href="https://github.com/scgavin1219"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/dylan-gavin-a9595150/"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>
        <div className='footer-child'>
            <h3>Chad Fitzgerald</h3>
            <a href="https://github.com/scgavin1219"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/dylan-gavin-a9595150/"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>
        <div className='footer-child'>
            <h3>Will Bannister</h3>
            <a href="https://github.com/scgavin1219"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/dylan-gavin-a9595150/"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>
        <div className='footer-child'>
            <h3>Noam Zimet</h3>
            <a href="https://github.com/nzoam93" target="_blank" rel="noopener noreferrer"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/noam-zimet-4114a594" target="_blank" rel="noopener noreferrer"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>
        <div className='footer-child'>
            <h3>Dylan Gavin</h3>
            <a href="https://github.com/scgavin1219"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/dylan-gavin-a9595150/"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>

    </div>
  )
}

export default Footer
