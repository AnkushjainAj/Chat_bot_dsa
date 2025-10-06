# DSA Instructor - AI-Powered Learning Platform

A modern, interactive Data Structures and Algorithms learning platform powered by Google Gemini AI. Built with React, Vite, Node.js, and Tailwind CSS.

## 🚀 Features

- **AI-Powered Q&A**: Ask any DSA-related question and get detailed explanations
- **Interactive Practice**: Generate custom questions by topic and difficulty
- **Multiple Question Types**: Multiple choice, coding problems, and open-ended questions
- **Real-time Evaluation**: Get instant feedback on your answers
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Topic Coverage**: Arrays, Trees, Graphs, Algorithms, and more

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Google Gemini AI** - AI-powered question generation and evaluation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dsa_instructor
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Get Google Gemini API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env` file

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This starts both the frontend (port 3000) and backend (port 5000) concurrently.

### Individual Services
```bash
# Frontend only
npm run client

# Backend only
npm run server
```

### Production Build
```bash
npm run build
npm start
```

## 📱 Usage

1. **Ask Questions**: Use the chat interface to ask any DSA-related question
2. **Practice**: Generate custom questions by selecting topics and difficulty levels
3. **Learn**: Get detailed explanations of DSA concepts
4. **Evaluate**: Submit answers and get instant AI-powered feedback

## 🎯 Available Topics

- Arrays & Strings
- Linked Lists
- Stacks & Queues
- Trees & Binary Search Trees
- Heaps & Priority Queues
- Hash Tables & Maps
- Graphs & Graph Algorithms
- Sorting Algorithms
- Searching Algorithms
- Dynamic Programming
- Greedy Algorithms
- Backtracking
- Recursion
- Bit Manipulation
- Mathematical Algorithms

## 🔒 Security Features

- Rate limiting on API endpoints
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Environment variable protection

## 📊 API Endpoints

- `GET /api/health` - Health check
- `GET /api/topics` - Get available DSA topics
- `POST /api/generate-question` - Generate a new question
- `POST /api/evaluate-answer` - Evaluate user's answer
- `POST /api/explain-concept` - Get concept explanation

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Theme**: Automatic theme detection
- **Smooth Animations**: Framer Motion powered transitions
- **Glass Morphism**: Modern glassmorphism design elements
- **Syntax Highlighting**: Code syntax highlighting for programming questions
- **Toast Notifications**: Real-time feedback messages

## 🔧 Configuration

### Environment Variables
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Customization
- Modify `tailwind.config.js` for theme customization
- Update `server/services/geminiService.js` for AI prompt tuning
- Adjust rate limiting in `server/index.js`

## 🚨 Troubleshooting

### Common Issues

1. **Gemini API Key Error**
   - Ensure your API key is correctly set in `.env`
   - Check if the API key has proper permissions

2. **CORS Issues**
   - Verify frontend is running on port 3000
   - Check CORS configuration in `server/index.js`

3. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility

## 📈 Performance

- **Frontend**: Vite for fast development and optimized builds
- **Backend**: Express.js with efficient middleware stack
- **AI**: Optimized prompts for faster Gemini API responses
- **Caching**: Browser caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language model capabilities
- React team for the excellent framework
- Tailwind CSS for the utility-first approach
- All open-source contributors

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Happy Learning! 🎓**
