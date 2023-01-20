import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReaction, removeReaction } from "../../store/posts";
import './Reactions.css'

const Reactions = ({ post, user }) => {

  // like
  // remember
  // tom
  // NERD!

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
      return reaction.user == user._id
    })

    const userAlreadyReacted = userReactionObject?.emotions.some((oldEmotion) => {
      return oldEmotion == newEmotion
    })

    if ( !(userAlreadyReacted) ) {
      // If no user reaction object exists, send the reaction to the backend
      // if the user raection object exists but doesn't have the emotion
      dispatch(createReaction(user._id, post._id, newEmotion))
    } else {
      // if the user reaction object has the target emotion, remove it
      dispatch(removeReaction(user._id, post._id, newEmotion))
    }

  }

  return(<>
    <div className='dropdown'>

      <button className="reaction-button create-reaction" onClick={openMenu}>🤔</button>

      <div className="dropdown-menu">
        {showMenu && (
          <div className="reaction-wrapper">

             <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "like")}> 😀 </button>
             <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "remember")}> 🥲 </button>
             <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "tom")}> 😎 </button>
             <button className="reaction-icon toolbar" onClick={(e) => handleReaction(e, "NERD!")}> 🤓 </button>

          </div>

        )}
      </div>
    </div>
  </>)

}

export default Reactions