import React from 'react'
import Card from '../UI/Card'
import classes from './searchBox.module.css'
import { FaSearch } from 'react-icons/fa'

const SearchBox = (props) => {
  return (
    <Card className={classes.container} >
      <label htmlFor='search' className={classes.title} >Keyword Search</label>
      <div className={classes['form-action']} >
        <input type="search" id="search" name="search" />
        <FaSearch className={classes['search-logo']} />
      </div>
    </Card>
  )
}

export default SearchBox 