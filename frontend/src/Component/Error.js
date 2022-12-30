import React from 'react'
import { Alert } from 'react-bootstrap'

function Error({
    variant='info',
    children
}) {
  return (<>
  <Alert key={variant} style={{fontSize:20}} variant={variant}>
         {children}
  </Alert>
  </>
  )
}

export default Error