import { useHistory } from 'react-router-dom';

const SingleFriend = ({friend}) => {
  const history = useHistory();

    const handleProfile = e => {
      e.preventDefault()
      history.push(`/profile/${friend._id}`)
    }

  return (
    <div id='single-friend-container' onClick={handleProfile}>
      <div id='friend-username'>{friend.username}</div>
      <div><img id='user-profile-image' src={friend.profileImageUrl}></img></div>
    </div>
  )
}

export default SingleFriend
