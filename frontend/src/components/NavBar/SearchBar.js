import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoSearch } from 'react-icons/go'
import './NavBar.css'
import { useEffect } from 'react'
import { fetchUsers } from '../../store/users'
import { fetchPosts } from '../../store/posts'
import Button from '../../blocks/Button'


function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState('');
  const users = useSelector(state => state.users);
  const posts = useSelector(state => state.posts.all);

  const filteredUsers = () => {
    if (users) {
      return Object.values(users).filter(user => {
        return user.username.toLowerCase().includes(search.toLowerCase())
      })
    } else return [];
  }

  const filteredPosts = () => {
    if (posts) {
      return Object.values(posts).filter(post => {
        return post.subject.toLowerCase().includes(search.toLowerCase())
      })
    } else return [];
  }

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
      e.preventDefault()
      setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      //fetch search listings here
    }

  const goToUser = userId => e => {
    e.preventDefault();
    setSearch('');
    history.push(`/profile/${userId}`)
  }

  const goToPost = postId => e => {
    e.preventDefault();
    setSearch('');
    history.push(`/posts/${postId}`)
  }


  return (
    <>
        <form onSubmit={handleSubmit} className="search-form">
          <div className='search-search'>
            <input className="search-field" placeholder='Search...' id="search-bar" type="search" onChange={handleChange} />
            <button id="search-button">< GoSearch id='search-icon' /></button>
          </div>
          {search &&
            <div className='search-results'>
              <div className='search-users'>
                <h4>Users</h4>
                  {filteredUsers()?.map(user =>  (
                    <div className='search-user' key={user._id} onClick={goToUser(user._id)}>
                      {user.username}
                    </div>
                  ))}
              </div>
              <div className='search-posts'>
                <h4>Posts</h4>
                  {filteredPosts()?.map(post =>  (
                    <div className='search-post' key={post._id} onClick={goToPost(post._id)}>
                      {post.subject}
                    </div>
                  ))}

              </div>
            </div>
          }
        </form>
      </>
  )
}

export default SearchBar