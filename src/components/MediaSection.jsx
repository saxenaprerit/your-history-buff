import { useState, useEffect } from 'react'
import './MediaSection.css'
import { searchImages, searchVideos } from '../services/api'

const MediaSection = ({ topic }) => {
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMedia = async () => {
      if (!topic) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        const [imageResults, videoResults] = await Promise.all([
          searchImages(topic),
          searchVideos(topic)
        ])
        
        setImages(imageResults)
        setVideos(videoResults)
      } catch (err) {
        setError('Failed to load media content. Please try again.')
        console.error('Error fetching media:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMedia()
  }, [topic])

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="media-section">
      <div className="images-section">
        <h2>Related Images</h2>
        {isLoading ? (
          <div className="loading">Loading images...</div>
        ) : (
          <div className="images-grid">
            {images.map(image => (
              <div key={image.id} className="image-card">
                <img src={image.url} alt={image.title} />
                <p>{image.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="videos-section">
        <h2>Related Videos</h2>
        {isLoading ? (
          <div className="loading">Loading videos...</div>
        ) : (
          <div className="videos-list">
            {videos.map(video => (
              <div key={video.id} className="video-embed">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="video-title">{video.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MediaSection 