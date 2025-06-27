# Historypedia

Historypedia is an interactive AI-powered web app that helps you explore historical events, figures, and topics. Ask any history question and get informative, conversational answers—plus related images and videos to enrich your learning experience.

## Features

- **Conversational AI:**  
  Chat with an assistant specialized in historical topics, powered by OpenAI's GPT models.

- **Rich Media Integration:**  
  Instantly see related images and YouTube videos for any topic you ask about.

- **Modern UI:**  
  Clean, responsive interface built with React and Vite.

- **Error Handling:**  
  Friendly error messages and loading indicators for a smooth user experience.

## Demo

![screenshot or gif placeholder]

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/saxenaprerit/your-history-buff.git
   cd your-history-buff
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**

   - Copy the example file and fill in your API keys:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` and add your keys:
     ```
     VITE_OPENAI_API_KEY=your_openai_api_key
     VITE_GOOGLE_API_KEY=your_google_api_key
     ```

   - For image and video search, you'll need:
     - A Google Custom Search Engine (CSE) ID (replace the `cx` value in `src/services/api.js` if needed)
     - A Google API key with access to Custom Search and YouTube Data APIs

4. **Start the development server:**
   ```sh
   npm run dev
   ```

5. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
  components/
    ChatInterface.jsx   # Main chat UI
    MediaSection.jsx    # Images and videos for the current topic
  services/
    api.js              # API calls to OpenAI and Google
  App.jsx               # Main app logic
  main.jsx              # Entry point
public/
  favicon.svg
index.html
```

## Environment Variables

- `VITE_OPENAI_API_KEY` — Your OpenAI API key
- `VITE_GOOGLE_API_KEY` — Your Google API key

**Never commit your real `.env` file!**  
Use `.env.example` as a template.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## License

[MIT](LICENSE)
