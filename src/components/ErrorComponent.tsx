import React from 'react'

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <div className="fade-in rounded-sm px-3 py-2 border border-red-200 bg-red-100 text-red-600">
      {message}
    </div>
  )
}

export default ErrorComponent
