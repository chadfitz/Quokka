import React from 'react'
import './Team.css'
import TeamMember from './TeamMember'
import githubIcon from '../../assets/github.png'
import linkedinIcon from '../../assets/linkedin.png'
import angry from '../../assets/quokka-angry.png'

export default function Team() {

  const tomBio = 'Tom was the team lead for this project. He has a background in strategy and operations and started his career as the first employee at a legal-tech startup.'
  const tomLinkedIn = 'https://www.linkedin.com/in/thomasconger/'
  const tomGithub = 'https://github.com/thomasconger'

  const noamBio = 'Noam was the team lead for this project. He is a great guy. Please give him a job. He will shake your hand. '
  const noamLinkedIn = 'https://www.linkedin.com/in/noam-zimet-4114a594'
  const noamGithub = 'https://github.com/nzoam93'

  const dylanBio = 'Dylan was the team lead for this project. He is a great guy. Please give him a job. He will shake your hand. '
  const dylanLinkedIn = 'https://www.linkedin.com/in/dylan-gavin-a9595150/'
  const dylanGithub = 'https://github.com/scgavin1219'

  const willBio = 'Will was the team lead for this project. He is a great guy. Please give him a job. He will shake your hand. '
  const willLinkedIn = 'https://www.linkedin.com/in/will-bannister/'
  const willGithub = 'https://github.com/3anni'

  const chadBio = 'Chad was the team lead for this project. He is a great guy. Please give him a job. He will shake your hand. '
  const chadLinkedIn = 'https://www.linkedin.com/in/chad-fitzgerald-956981ab/'
  const chadGithub = 'https://github.com/chadfitz'

  return (
    <div className='whole-page-styling'>
      <div className='inner-page-styling'>
        <div className='team-container'>
          <TeamMember
            name='Tom Conger'
            bio={tomBio}
            profileImg={angry}
            linkedIn={tomLinkedIn}
            gitHub={tomGithub}>
          </TeamMember>
          <TeamMember
            name='Noam Zimet'
            bio={noamBio}
            profileImg={angry}
            linkedIn={noamLinkedIn}
            gitHub={noamGithub}>
          </TeamMember>
          <TeamMember
            name='Dylan Gavin'
            bio={dylanBio}
            profileImg={angry}
            linkedIn={dylanLinkedIn}
            gitHub={dylanGithub}>
          </TeamMember>
          <TeamMember
            name='Will Bannister'
            bio={dylanBio}
            profileImg={angry}
            linkedIn={willLinkedIn}
            gitHub={willGithub}>
          </TeamMember>
          <TeamMember
            name='Chad Fitzgerald'
            bio={chadBio}
            profileImg={angry}
            linkedIn={chadLinkedIn}
            gitHub={chadGithub}>
          </TeamMember>
        </div>
      </div>
    </div>
  )
}
