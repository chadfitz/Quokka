import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReaction, deleteReaction } from "../../store/reactions";
import angry from '../../assets/quokka-angry.png';
import button from '../../assets/quokka-button.png';
import happy from '../../assets/quokka-happy.png';
import hungry from '../../assets/quokka-hungry.png';
import laughing from '../../assets/quokka-laughing.png';
import love from '../../assets/quokka-love.png';
import sad from '../../assets/quokka-sad.png';
import sleepy from '../../assets/quokka-sleepy.png';
import './Reactions.css'
import { selectPost } from "../../store/posts";

const Reactions = ({ user, postId, sessionUserReactions }) => {
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
    // compare existing reaction styles, generating a boolean as a test condition
    // -> newEmotion vs styles in sessionUserReaction
    let reactionIdToDelete;
    const userHasReacted = sessionUserReactions.find((entry) => {
      if (entry.style == newEmotion) {
        reactionIdToDelete = entry._id
      }
      return entry.style == newEmotion
    })

    if (userHasReacted) {
      dispatch(deleteReaction(reactionIdToDelete))
    } else {
      dispatch(createReaction(sessionUser._id, post._id, newEmotion))
    }

  }

  return(<>
    <div className='reactions-dropdown'>

      <button className="reaction-button create-reaction" onClick={openMenu}>🤔</button>

      <div className="dropdown-menu">
        {showMenu && (
          <div className="reaction-wrapper">
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
