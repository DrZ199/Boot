# NelsonBot

NelsonBot is a Progressive Web App (PWA) chatbot that uses Hugging Face's Inference API for AI-driven conversations. It is designed to be mobile-first but works seamlessly across devices.

## Features

- Mobile-first responsive design
- Integration with Hugging Face's Inference API
- PWA functionality for offline access and installation
- AI-powered chatbot using the GPT-J-6B model

## Setup Instructions

### Prerequisites

1. [Node.js](https://nodejs.org/) installed (version 14 or above).
2. [npm](https://www.npmjs.com/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd NelsonBot
   ``` 

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory (already included in this repo) and add your Hugging Face API key:
     ```
     HF_API_KEY=your_huggingface_api_key
     HF_MODEL=EleutherAI/gpt-j-6b
     PORT=5000
     ```

### Running the App

1. Start the backend server (API):
   ```bash
   node src/api.js
   ```

2. Start the frontend React app:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to use NelsonBot.

### Build for Production

1. Build the React app:
   ```bash
   npm run build
   ```

2. Serve the built files using any static server (e.g., `serve` or Nginx).

### PWA Functionality

- Install the app on your mobile or desktop by visiting it in Chrome/Edge and clicking "Add to Home Screen".

---

© 2024 NelsonBot. All rights reserved.
