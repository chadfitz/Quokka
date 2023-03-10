import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/users';
import { fetchFriends } from '../../store/friends';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import { fetchReactions } from '../../store/reactions';
import PostsIndexItem from './PostsIndexItem';
import { Link } from 'react-router-dom';
import './PostsIndex.css';

function PostsIndex () {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts.all));
  const friends = useSelector(state => state.friends)
  const currentUser = useSelector(state => state.session.user);
  const [rules, setRules] = useState(false)
  const [friendsPost, setFriendsPost] = useState(false)

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
    dispatch(fetchFriends(currentUser));
    dispatch(fetchReactions());
    return () => dispatch(clearPostErrors());
  }, [currentUser, dispatch]);

  const friendsFilter = posts.filter(post => {
    return (post.writer._id === currentUser._id || Object.keys(friends).includes(post.writer._id) || Object.keys(friends).includes(post.recipient._id) )
  })

  const toggleFriends = () => {
    setFriendsPost(true)
  }

  const toggleRules = () => {
    rules ? setRules(false) : setRules(true)
  }

  const toggleAll = () => {
    setFriendsPost(false)
  }

  const friendClass = () => {
    return friendsPost ? 'filter-buttons selected' : 'filter-buttons'
  }

  const allClass=()=> {
    return !friendsPost ? 'filter-buttons selected' : 'filter-buttons'
  }

  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch, posts.length])

  if (posts.length === 0) return <div>There are no Posts</div>;
  return (
    <div className='whole-page-styling'>
      <div className='inner-page-styling'>
          <div className='posts-index-header'>
            { (Object.values(friends).length) ?
            <div className='write-cta-wrapper'>
              <p>You haven't written to anyone in awhile. </p>
              <button className='secondary-button' id="rules" onClick={toggleRules}>Rules</button>
              { rules ?
              <>
               <div className='rules'>
                  <p>1. Users can only write to followers once per week***</p>
                  <p>2. Users can not post to the same user twice in a row</p>
                  <p>3. You will need more than 1 follower to consistently make posts</p>
                  <p>***Once every 5 minutes for Demo purposes</p>
               </div>
                  <Link to="/users" className='posts-index-compose-link'><button className='secondary-button' id='follow-users'>Follow Users</button></Link>
              </>:
               ""}
              <Link to="/posts/new" className='posts-index-compose-link'><button className='secondary-button'>Send a postcard now?</button></Link>
            </div> :
            <div className='write-cta-wrapper'>
              <p>Let's start by following some friends </p>
              <Link to="/users" className='posts-index-compose-link'><button className='secondary-button'>Follow</button></Link>
            </div> }
          </div>
          <div className='posts-index-filter'>
            <div className='posts-index-filter-bar' >
              <h5 id="filter-by">Filter by: </h5>
              <button className={allClass()} onClick={toggleAll}>All Posts</button>
              <button className={friendClass()} onClick={toggleFriends}>Following</button>
            </div>
          </div>
        {friendsPost ?
        friendsFilter.map(post => (
          <PostsIndexItem key={post._id} post={post} />
        ))
        :
        posts.map(post => (
          <PostsIndexItem key={post._id} post={post} />
        ))
        }
      </div>
    </div>
  );
}

export default PostsIndex;
