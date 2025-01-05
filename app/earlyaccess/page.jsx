"use client"

import React, { useState, useEffect } from 'react'

const CountdownTimer = ({ days, hours, minutes }) => {
  return (
    <div className="flex justify-center items-center space-x-4 text-4xl font-bold text-purple-600">
      <div className="flex flex-col items-center">
        <span>{days.toString().padStart(2, '0')}</span>
        <span className="text-sm text-gray-500">Days</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{hours.toString().padStart(2, '0')}</span>
        <span className="text-sm text-gray-500">Hours</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{minutes.toString().padStart(2, '0')}</span>
        <span className="text-sm text-gray-500">Minutes</span>
      </div>
    </div>
  )
}

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      {message}
    </div>
  )
}

const EarlyAccessPage = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 4, minutes: 23 })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1 }
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59 }
        } else if (prevTime.days > 0) {
          return { days: prevTime.days - 1, hours: 23, minutes: 59 }
        } else {
          clearInterval(timer)
          return prevTime
        }
      })
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async () => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate success/failure randomly
    const isSuccess = Math.random() > 0.5

    if (isSuccess) {
      setToast({ message: "You've been added to the early access list.", type: 'success' })
      setEmail('')
    } else {
      setToast({ message: "Something went wrong. Please try again.", type: 'error' })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Myilo AI Early Access
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto">
          Be among the first to revolutionize your newsletter creation process with AI magic.
        </p>
        <div className="mb-8">
          <CountdownTimer {...timeLeft} />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full max-w-md bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Get Early Access'
            )}
          </button>
        </form>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default EarlyAccessPage