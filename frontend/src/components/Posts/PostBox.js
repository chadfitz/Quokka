import mongoose from "mongoose";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../blocks/Button";
import { deletePost } from "../../store/posts";
// const { ObjectId } = require('mongodb')

function PostBox ({ key, postId, posty }) {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors.posts);
  const post = useSelector(store => {
    return Object.values(store.posts.all).find(obj => obj._id === postId)
  })

  // console.log('post');
  // console.log(post);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("In src/components/post/PostBox handleDelete, postId: ", postId);
    dispatch(deletePost(postId))
  }

  return (
    <div className="post">
    {post &&
    <>
      <h3>{posty.username ? `${posty.username}:` : ""} {posty.body} </h3>
      <Button
        label="Delete Post"
        onClick={handleDelete}
      />
      <div className="errors">{errors && errors.message}</div>
    </>
    }
    </div>
  );
}

export default PostBox;
