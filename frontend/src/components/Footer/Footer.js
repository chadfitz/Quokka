import React from 'react'
import linkedIn from '../../assets/linkedin.png'
import github from '../../assets/github.png'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
        <div className='footer-child'>
            <h3>Tom Conger</h3>
            <a href="https://github.com/thomasconger" target="_blank" rel="noopener noreferrer"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/thomasconger/" target="_blank" rel="noopener noreferrer"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>
        <div className='footer-child'>
            <h3>Chad Fitzgerald</h3>
            <a href="https://github.com/chadfitz" target="_blank" rel="noopener noreferrer"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/chad-fitzgerald-956981ab/" target="_blank" rel="noopener noreferrer"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>
        <div className='footer-child'>
            <h3>Will Bannister</h3>
            <a href="https://github.com/1banni" target="_blank" rel="noopener noreferrer"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/will-bannister/" target="_blank" rel="noopener noreferrer"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>
        <div className='footer-child'>
            <h3>Noam Zimet</h3>
            <a href="https://github.com/nzoam93" target="_blank" rel="noopener noreferrer"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/noam-zimet-4114a594" target="_blank" rel="noopener noreferrer"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>
        <div className='footer-child'>
            <h3>Dylan Gavin</h3>
            <a href="https://github.com/scgavin1219" target="_blank" rel="noopener noreferrer"><img id="github" src={github} alt="github link" /></a>
            <a href="https://www.linkedin.com/in/dylan-gavin-a9595150/" target="_blank" rel="noopener noreferrer"><img id ="linkedin" src={linkedIn} alt="linkedin link" /></a>
        </div>

    </div>
  )
}

export default Footer
