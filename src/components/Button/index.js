import classNames from 'classnames'
import React from 'react'
import './style.css'

const Button = (props) => {
  return (
    <button {...props} className={classNames('cnButton', props.className)}/>
  )
}

export default Button