import { useState } from 'react'
import './App.css'
import ChatInterface from './components/ChatInterface'
import MediaSection from './components/MediaSection'

function App() {
  const [currentTopic, setCurrentTopic] = useState('World War 2')

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Your History Buff</h1>
      </div>
      <div className="app-content">
        <div className="left-pane">
          <ChatInterface onTopicChange={setCurrentTopic} />
        </div>
        <div className="right-pane">
          <MediaSection topic={currentTopic} />
        </div>
      </div>
    </div>
  )
}

export default App
