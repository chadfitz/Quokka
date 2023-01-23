import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReaction, removeReaction, selectPost, selectReactions } from "../../store/posts";
import angry from '../../assets/quokka-angry.png';
import button from '../../assets/quokka-button.png';
import happy from '../../assets/quokka-happy.png';
import hungry from '../../assets/quokka-hungry.png';
import laughing from '../../assets/quokka-laughing.png';
import love from '../../assets/quokka-love.png';
import sad from '../../assets/quokka-sad.png';
import sleepy from '../../assets/quokka-sleepy.png';


import './Reactions.css'

const Reactions = ({ user, postId }) => {
  const sessionUser = useSelector(state => state.session.user);
  const post = useSelector(selectPost(postId));
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleReaction = (e, newEmotion) => {
    e.preventDefault();

    const userReactionObject = post.reactions.find((reaction) => {
      return reaction.user == sessionUser._id
    })

    const userAlreadyReacted = userReactionObject?.emotions.some((oldEmotion) => {
      return oldEmotion == newEmotion
    })

    console.log("User Already Reacted:", userAlreadyReacted)

    if ( !(userAlreadyReacted) ) {
      // If no user reaction object exists, send the reaction to the backend
      // if the user raection object exists but doesn't have the emotion
      dispatch(createReaction(sessionUser._id, post._id, newEmotion))
    } else {
      // if the user reaction object has the target emotion, remove it
      console.log("about to remove reaction")
      dispatch(removeReaction(sessionUser._id, post._id, newEmotion))
    }

  }

  return(<>
    <div className='reactions-dropdown'>

      <button className="reaction-button create-reaction" onClick={openMenu}>🤔</button>

      <div className="dropdown-menu">
        {showMenu && (
          <div className="reaction-wrapper">

              {/* <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "like")}> 😀 </button> */}
              {/* <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "remember")}> 🥲 </button> */}
              {/* <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "tom")}> 😎 </button> */}
              {/* <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "NERD!")}> 🤓 </button> */}
              <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "like")}>
                <img src={happy} className='reaction-image'/>
              </button>
              <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "remember")}>
                <img src={hungry} className='reaction-image'/>
              </button>
              <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "tom")}>
                <img src={laughing} className='reaction-image'/>
              </button>
              <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "NERD!")}>
                <img src={love} className='reaction-image'/>
              </button>
          </div>

        )}
      </div>
    </div>
  </>)

}

export default Reactions
