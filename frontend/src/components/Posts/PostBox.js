import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/posts";


function PostBox ({ body, username, id }) {

  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors.posts);
  // const post = useSelector(state => {
  //   state.posts[id]
  // })

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("IN HANDLE DELETE -- ID:")
    console.log(id)
    dispatch(deletePost(id))
  }

  // useEffect(()=>{

  // },[post])

  // let content
  // if (post) {
  //   content = (<>
  //     <div className="post">
  //       <h3>{username ? `${username}:` : ""} {body} </h3>
  //       <button onClick={handleDelete}>Delete above post</button>
  //       <div className="errors">{errors && errors.message}</div>
  //     </div>
  //   </>)
  // } else {
  //   content = <></>
  // }

  return (
    // {content}
  //   <>
  //   { post && (<div className="post">
  //   <h3>{username ? `${username}:` : ""} {body} </h3>
  //   <button onClick={handleDelete}>Delete above post</button>
  //   <div className="errors">{errors && errors.message}</div>
  // </div>)}
  // </>
  <div className="post">
    <h3>{username ? `${username}:` : ""} {body} </h3>
    <button onClick={handleDelete}>Delete above post</button>
    <div className="errors">{errors && errors.message}</div>
  </div>
  );
}

export default PostBox;
