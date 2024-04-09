import React from 'react'

function ErrrorPage({error}) {
  return (
    <div>
      <h1>HTTP Status Code: {error.status}</h1>
      <h4>{error.data.error}</h4>
    </div>
  )
}

export default ErrrorPage