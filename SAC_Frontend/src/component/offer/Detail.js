import React from 'react'
import classes from './Detail.module.css'

const Detail = props => {
  const {name, value} = props 

  return(
    <div className={classes.detail}>
      
      <span className={classes.name} >{props.children} <span>{name}</span></span>
      <span className={classes.value}>{value}</span>
    </div>
  )
}

export default Detail