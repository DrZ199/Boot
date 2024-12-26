import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NelsonBot - Medical AI Assistant',
    short_name: 'NelsonBot',
    description: 'AI-powered medical assistant using Hugging Face technology',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5bbcd5',
    icons: [
      {
        src: '/robot-icon.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/robot-icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}

