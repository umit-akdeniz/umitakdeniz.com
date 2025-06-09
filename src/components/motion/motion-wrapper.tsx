'use client'

import React from 'react'

// Simple fallback component without motion
export const MotionDiv = ({ children, className, ...props }: any) => {
  return <div className={className}>{children}</div>
}

export const MotionH1 = ({ children, className, ...props }: any) => {
  return <h1 className={className}>{children}</h1>
}

export const MotionP = ({ children, className, ...props }: any) => {
  return <p className={className}>{children}</p>
}

export const MotionSpan = ({ children, className, ...props }: any) => {
  return <span className={className}>{children}</span>
}

export const MotionButton = ({ children, className, ...props }: any) => {
  return <button className={className}>{children}</button>
}
