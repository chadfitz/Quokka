import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReaction, deleteReaction } from "../../store/reactions";
import happy from '../../assets/quokka-happy.png';
import hungry from '../../assets/quokka-hungry.png';
import laughing from '../../assets/quokka-laughing.png';
import love from '../../assets/quokka-love.png';
import './Reactions.css'
import { selectPost } from "../../store/posts";

const Reactions = ({ user, postId, sessionUserReactions }) => {
  const sessionUser = useSelector(state => state.session.user);
  const post = useSelector(selectPost(postId));
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const [showHappy, setShowHappy] = useState(false);
  const [showHungry, setShowHungry] = useState(false);
  const [showLaugh, setShowLaugh] = useState(false);
  const [showLove, setShowLove] = useState(false);

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
      if (entry.style === newEmotion) {
        reactionIdToDelete = entry._id
      }
      return entry.style === newEmotion
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
              <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "happy")}>
                <img 
                  src={happy} 
                  className='reaction-image'
                  onMouseEnter={()=>setShowHappy(true)}
                  onMouseLeave={()=>setShowHappy(false)}
                />
                {showHappy && <p>Happy</p>}
              </button>
              <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "hungry")}>
                <img 
                  src={hungry} 
                  className='reaction-image'
                  onMouseEnter={()=>setShowHungry(true)}
                  onMouseLeave={()=>setShowHungry(false)}
                />
                {showHungry && <p>Hungry</p>}
              </button>
              <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "laughing")}>
                <img 
                  src={laughing} 
                  className='reaction-image'
                  onMouseEnter={()=>setShowLaugh(true)}
                  onMouseLeave={()=>setShowLaugh(false)}
                />
                {showLaugh && <p>Laugh</p>}
              </button>
              <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "love")}>
                <img 
                  src={love} 
                  className='reaction-image'
                  onMouseEnter={()=>setShowLove(true)}
                  onMouseLeave={()=>setShowLove(false)}
                />
                {showLove && <p>Love</p>}
              </button>
          </div>

        )}
      </div>
    </div>
  </>)

}

export default Reactions
