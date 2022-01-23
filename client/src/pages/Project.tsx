import React from 'react'
import { useParams } from 'react-router-dom'

const Project: React.FC = () => {
  const params = useParams()

  return <h1>Project {params.projectId}</h1>
}

export default Project
