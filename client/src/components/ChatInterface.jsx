import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, Bot, User, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import MarkdownRenderer from './MarkdownRenderer'

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your DSA instructor. Ask me anything about Data Structures and Algorithms - from basic concepts to complex problems!",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setLoading(true)

    try {
      // For demo purposes, we'll use the explain-concept endpoint
      // In a real implementation, you'd have a dedicated chat endpoint
      const response = await axios.post('https://chat-bot-dsa.onrender.com/api/explain-concept', {
        concept: userMessage.content,
        level: 'intermediate'
      })

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.data.explanation.explanation,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'm sorry, I encountered an error. Please make sure the backend server is running and the Gemini API key is configured.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      toast.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickQuestions = [
    "What is Big O notation?",
    "Explain binary search algorithm",
    "What's the difference between stack and queue?",
    "How does dynamic programming work?",
    "What are the types of tree traversals?"
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quick Questions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Quick Questions</h3>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <motion.button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-primary-500/30 rounded-full text-sm text-white transition-all duration-200 hover:shadow-md hover:border-primary-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="card mb-6 h-[600px] overflow-y-auto">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'max-w-2xl flex-row-reverse space-x-reverse' : 'max-w-4xl'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-primary-500' 
                      : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white/95 text-slate-800 border border-white/20 shadow-lg'
                  }`}>
                    {message.type === 'user' ? (
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                    ) : (
                      <MarkdownRenderer content={message.content} />
                    )}
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-primary-100' : 'text-slate-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/95 border border-white/20 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                    <span className="text-sm text-slate-500">Thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="card">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Data Structures and Algorithms..."
              className="w-full px-4 py-3 bg-white/95 text-slate-800 border border-white/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-500"
              rows={3}
              disabled={loading}
            />
          </div>
          
          <motion.button
            onClick={sendMessage}
            disabled={loading || !inputMessage.trim()}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Send</span>
          </motion.button>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Gemini AI</span>
          </div>
          <div className="text-xs text-slate-400">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
