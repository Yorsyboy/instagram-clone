import React from 'react'

export default function Story({ username, img }) {
  return (
    <div>
        <img src={img} alt="User image" />
        <p>{username}</p>
    </div>
  )
}
