import React from 'react'
import githubIcon from '../../assets/github.png'
import linkedinIcon from '../../assets/linkedin.png'

export default function TeamMember({name, bio, profileImg, linkedIn, gitHub}) {
  return (
    <div className='team-member-card'>
      <img class='team-member-profile' src={profileImg} />
      <div className='team-member-name'>
        <p>{name}</p>
        <div className='team-member-social-wrapper'>
          <a href={linkedIn} target="_blank" rel="noopener noreferrer"><img className='team-member-social' src={linkedinIcon}></img></a>
          <a href={gitHub} target="_blank" rel="noopener noreferrer"><img className='team-member-social' src={githubIcon}></img></a>
        </div>
      </div>
      <p>{bio}</p>
    </div>
  )
}
