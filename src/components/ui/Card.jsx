import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'default',
  shadow = 'default',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200'
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }
  
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-300' : ''
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClasses} ${className}`
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card