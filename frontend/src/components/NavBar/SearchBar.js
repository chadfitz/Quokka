import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoSearch } from 'react-icons/go'
import './NavBar.css'
import { useEffect } from 'react'
import { fetchUsers } from '../../store/users'
import { fetchPosts } from '../../store/posts'


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
      let searchBar = document.getElementsByClassName('search-search');
      if (e.target.value) {
        searchBar[0].style.borderRadius = '20px 20px 0 0';
        searchBar[0].style.borderBottom = 'none';
      } else {
        searchBar[0].style.borderRadius = '20px';
        searchBar[0].style.borderBottom = '1px solid rgb(184, 183, 183)';
      }
      setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      //fetch search listings here
    }

  const goToUser = userId => e => {
    e.preventDefault();
    let searchInput = document.getElementsByClassName("search-field");
    searchInput[0].value = '';
    setSearch('');
    history.push(`/profile/${userId}`);
    let searchBar = document.getElementsByClassName('search-search');
    searchBar[0].style.borderRadius = '20px';
    searchBar[0].style.borderBottom = '1px solid rgb(184, 183, 183)';
  }

  const goToPost = postId => e => {
    e.preventDefault();
    let searchInput = document.getElementsByClassName("search-field");
    searchInput[0].value = '';
    setSearch('');
    history.push(`/posts/${postId}`)
    let searchBar = document.getElementsByClassName('search-search');
    searchBar[0].style.borderRadius = '20px';
    searchBar[0].style.borderBottom = '1px solid rgb(184, 183, 183)';
  }


  return (
    <>
        <form onSubmit={handleSubmit} className="search-form">
          <div className='search-search'>
            <input placeholder='Search...' id="search-bar" type="search" onChange={handleChange} />
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
