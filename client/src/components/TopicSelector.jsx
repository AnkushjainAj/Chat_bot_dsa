import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Loader2, Target } from 'lucide-react'
import axios from 'axios'

const TopicSelector = ({ 
  selectedTopic, 
  onTopicSelect, 
  difficulty, 
  onDifficultyChange, 
  questionType, 
  onQuestionTypeChange, 
  onGenerate, 
  loading 
}) => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    fetchTopics()
  }, [])

  const fetchTopics = async () => {
    try {
      const response = await axios.get('/api/topics')
      setTopics(response.data.topics)
    } catch (error) {
      console.error('Error fetching topics:', error)
      // Fallback topics
      setTopics([
        'Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 
        'Binary Search Trees', 'Heaps', 'Hash Tables', 'Graphs', 
        'Sorting Algorithms', 'Searching Algorithms', 'Dynamic Programming'
      ])
    }
  }

  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'hard', label: 'Hard', color: 'text-red-600' }
  ]

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'coding', label: 'Coding Problem' },
    { value: 'open-ended', label: 'Open Ended' }
  ]

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary-500" />
          <span>Practice Settings</span>
        </h3>

        {/* Topic Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Select Topic
          </label>
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
            {topics.map((topic) => (
              <motion.button
                key={topic}
                onClick={() => onTopicSelect(topic)}
                className={`text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                  selectedTopic === topic
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {topic}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {difficulties.map((diff) => (
              <motion.button
                key={diff.value}
                onClick={() => onDifficultyChange(diff.value)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  difficulty === diff.value
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {diff.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Question Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Question Type
          </label>
          <select
            value={questionType}
            onChange={(e) => onQuestionTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {questionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={onGenerate}
          disabled={loading || !selectedTopic}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          <span>{loading ? 'Generating...' : 'Generate Question'}</span>
        </motion.button>
      </div>

      {/* Tips Card */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Start with easier topics if you're a beginner</li>
          <li>• Practice multiple question types</li>
          <li>• Focus on understanding, not just solving</li>
          <li>• Review explanations carefully</li>
        </ul>
      </div>
    </div>
  )
}

export default TopicSelector
