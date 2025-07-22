import React from 'react'
import { ClipLoader, ClockLoader } from 'react-spinners'


const override = {
    display: 'block',
    margin: '100px auto',
}

const Spinners = ({loading}) => {
  return (
    <ClockLoader
        color={'gray'}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
  )
}

export default Spinners