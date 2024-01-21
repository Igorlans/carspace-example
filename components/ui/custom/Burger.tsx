"use client"

import { FC } from 'react'

import "./style.css";

interface CategoryBtnProps {
  onClick: () => void
  isOpen: boolean,
}

const Burger: FC<CategoryBtnProps> = ({ isOpen, onClick }) => {

  return (
    <div 
      id="nav-burger"
      className={isOpen ? "open" : ''}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Burger