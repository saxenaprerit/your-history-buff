import axios from 'axios';

// You'll need to replace this with your actual API key
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const sendMessageToLLM = async (messages) => {
  try {
    const response = await openai.post('/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export const searchImages = async (query) => {
  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: '63d7d424841fe44d1', // You'll need to create a Custom Search Engine
        q: query,
        searchType: 'image',
        num: 6,
      },
    });
    return response.data.items.map(item => ({
      id: item.link,
      url: item.link,
      title: item.title,
    }));
  } catch (error) {
    console.error('Error searching images:', error);
    throw error;
  }
};

export const searchVideos = async (query) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: GOOGLE_API_KEY,
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 5,
        relevanceLanguage: 'en',
      },
    });
    return response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
}; 