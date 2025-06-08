import { useState, useEffect } from 'react'
import './ChatInterface.css'
import { sendMessageToLLM } from '../services/api'

// Helper to format assistant messages with bullet points or lists
function formatAssistantMessage(content) {
  // Split by lines
  const lines = content.split('\n')
  // Check for bullet or numbered list
  const isBullet = lines.every(line => line.trim().startsWith('- ') || line.trim() === '')
  const isNumbered = lines.every(line => /^\d+\. /.test(line.trim()) || line.trim() === '')

  if (isBullet) {
    return (
      <ul>
        {lines.filter(line => line.trim()).map((line, idx) => (
          <li key={idx}>{line.replace(/^- /, '').trim()}</li>
        ))}
      </ul>
    )
  }
  if (isNumbered) {
    return (
      <ol>
        {lines.filter(line => line.trim()).map((line, idx) => (
          <li key={idx}>{line.replace(/^\d+\. /, '').trim()}</li>
        ))}
      </ol>
    )
  }
  // Otherwise, return as paragraphs
  return content.split(/\n\n+/).map((para, idx) => (
    <p key={idx}>{para}</p>
  ))
}

const ChatInterface = ({ onTopicChange }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Add initial greeting message
    setMessages([
      {
        role: 'assistant',
        content: 'What would you like to know about history today?'
      }
    ])
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    onTopicChange(input)
    setInput('')
    setIsLoading(true)

    try {
      const response = await sendMessageToLLM([
        ...messages,
        userMessage,
        { role: 'system', content: 'You are a helpful assistant specializing in historical events. Provide accurate and informative responses about historical topics.' }
      ])
      
      const botMessage = { role: 'assistant', content: response }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error while processing your request. Please try again.' 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
              {message.role === 'assistant'
                ? formatAssistantMessage(message.content)
                : message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content">Thinking...</div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about any historical event..."
          className="message-input"
          disabled={isLoading}
        />
        <button type="submit" className="send-button" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default ChatInterface 