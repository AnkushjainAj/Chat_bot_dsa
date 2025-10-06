import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, MessageCircle, Sparkles, Loader2, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import ChatInterface from './components/ChatInterface'
import MarkdownRenderer from './components/MarkdownRenderer'

function App() {
  const [activeTab, setActiveTab] = useState('chat')
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 'chat', label: 'Ask Questions', icon: MessageCircle },
    { id: 'learn', label: 'Learn Concepts', icon: BookOpen }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  DSA Instructor
                </h1>
                <p className="text-xs text-slate-500">AI-Powered Learning</p>
              </div>
            </motion.div>

            <nav className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </motion.button>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Master{' '}
            <span className="hero-gradient">
              Data Structures
            </span>
            {' '}& Algorithms
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium">
            Ask questions and learn concepts with AI-powered explanations
          </p>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'learn' && <LearnSection />}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200/50 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p className="flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Google Gemini AI</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Learn Section Component
function LearnSection() {
  const [concept, setConcept] = useState('')
  const [level, setLevel] = useState('beginner')
  const [explanation, setExplanation] = useState(null)
  const [loading, setLoading] = useState(false)

  const explainConcept = async () => {
    if (!concept.trim()) {
      toast.error('Please enter a concept to explain')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/explain-concept', {
        concept: concept.trim(),
        level
      })
      setExplanation(response.data.explanation)
      toast.success('Concept explained!')
    } catch (error) {
      toast.error('Failed to explain concept')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Learn DSA Concepts</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              What would you like to learn?
            </label>
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="e.g., Binary Search Tree, Quick Sort, Dynamic Programming..."
              className="w-full px-4 py-3 bg-white/95 text-slate-800 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-slate-500"
              onKeyPress={(e) => e.key === 'Enter' && explainConcept()}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Learning Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 bg-white/95 text-slate-800 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <button
            onClick={explainConcept}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <BookOpen className="w-4 h-4" />
            )}
            <span>{loading ? 'Explaining...' : 'Explain Concept'}</span>
          </button>
        </div>
      </div>

      {explanation && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MarkdownRenderer content={explanation.explanation} />
        </motion.div>
      )}
    </div>
  )
}

export default App
