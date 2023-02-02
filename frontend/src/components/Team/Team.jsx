import React from 'react'
import './Team.css'
import TeamMember from './TeamMember'
import githubIcon from '../../assets/github.png'
import linkedinIcon from '../../assets/linkedin.png'
import angry from '../../assets/quokka-angry.png'
<<<<<<< HEAD
import leaf from '../../assets/quokka-hungry.png'


=======
import laugh from '../../assets/quokka-laughing.png' // HERETOFORTH CLAIMED BY WILL
import love from '../../assets/quokka-love.png'
>>>>>>> main

export default function Team() {

  const tomBio = 'Tom was the team lead for this project. He has a background in strategy and operations and started his career as the first employee at a legal-tech startup.'
  const tomLinkedIn = 'https://www.linkedin.com/in/thomasconger/'
  const tomGithub = 'https://github.com/thomasconger'

  const noamBio = 'Noam was the API integration lead for the project. He was a former mechanical engineer at Ford as well as a high school math and computer science teacher before transitioning into software development. '
  const noamLinkedIn = 'https://www.linkedin.com/in/noam-zimet-4114a594'
  const noamGithub = 'https://github.com/nzoam93'

  const dylanBio = 'Dylan was the team\'s frontend lead. He set up a React frontend and utilized AWS S3 to implement user image uploads for profile images and posts, reducing server load and allowing for scalability of image service.'
  const dylanLinkedIn = 'https://www.linkedin.com/in/dylan-gavin-a9595150/'
  const dylanGithub = 'https://github.com/scgavin1219'

  const willBio = 'Will was the team\'s backend lead. He set up the MERN backend, added rich text editing/rendering with ReactQuill + Interweave, and helped others build and debug React components.'
  const willLinkedIn = 'https://www.linkedin.com/in/will-bannister/'
  const willGithub = 'https://github.com/1banni'

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
            profileImg={leaf}
            linkedIn={noamLinkedIn}
            gitHub={noamGithub}>
          </TeamMember>
          <TeamMember
            name='Dylan Gavin'
            bio={dylanBio}
            profileImg={love}
            linkedIn={dylanLinkedIn}
            gitHub={dylanGithub}>
          </TeamMember>
          <TeamMember
            name='Will Bannister'
            bio={willBio}
            profileImg={laugh}
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
