import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoSearch } from 'react-icons/go'
import './NavBar.css'


function SearchBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [search, setSearch] = useState('')

    const handleChange = (e) => { 
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => { 
        e.preventDefault()
        //fetch search listings here
        .then(()=>history.push(`/search/${search}`))
    }

  return (
    <>
        <form onSubmit={handleSubmit} className="search-form">
          <div className='search-search'>
            <input className="search-field" placeholder='Search...' id="search-bar" type="search" onChange={handleChange} />
            <button id="search-button">< GoSearch id='search-icon' /></button>
          </div>
        </form>
      </>
  )
}

export default SearchBar