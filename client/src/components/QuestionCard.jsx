import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Code, Send, Loader2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import toast from 'react-hot-toast'
import axios from 'axios'

const QuestionCard = ({ question }) => {
  const [userAnswer, setUserAnswer] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [startTime] = useState(Date.now())

  const submitAnswer = async () => {
    const answer = question.questionType === 'multiple-choice' ? selectedOption : userAnswer
    
    if (!answer.trim()) {
      toast.error('Please provide an answer')
      return
    }

    setLoading(true)
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      
      const response = await axios.post('/api/evaluate-answer', {
        question,
        userAnswer: answer,
        questionType: question.questionType || 'multiple-choice',
        timeSpent
      })

      setEvaluation(response.data.evaluation)
      
      if (response.data.evaluation.isCorrect) {
        toast.success('Correct! Well done!')
      } else {
        toast.error('Incorrect. Check the explanation below.')
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      toast.error('Failed to evaluate answer')
    } finally {
      setLoading(false)
    }
  }

  const resetQuestion = () => {
    setUserAnswer('')
    setSelectedOption('')
    setEvaluation(null)
  }

  if (!question) return null

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Code className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">
              {question.topic || 'DSA Question'}
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty || 'Medium'}
              </span>
              <span className="text-slate-500">
                {question.questionType || 'multiple-choice'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>Started {new Date(startTime).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Question Content */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-slate-800 mb-4">
          {question.question}
        </h4>

        {/* Multiple Choice Options */}
        {question.questionType === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.label
                key={index}
                className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedOption === option
                    ? 'bg-primary-50 border-primary-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                } ${evaluation ? 'cursor-not-allowed' : ''}`}
                whileHover={!evaluation ? { scale: 1.02 } : {}}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  disabled={evaluation}
                  className="mr-3"
                />
                <span className="text-slate-700">{option}</span>
              </motion.label>
            ))}
          </div>
        )}

        {/* Coding Problem */}
        {question.questionType === 'coding' && (
          <div className="space-y-4">
            {question.examples && (
              <div>
                <h5 className="font-medium text-slate-700 mb-2">Examples:</h5>
                {question.examples.map((example, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg mb-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Input:</span>
                        <code className="block mt-1 text-slate-600">{example.input}</code>
                      </div>
                      <div>
                        <span className="font-medium">Output:</span>
                        <code className="block mt-1 text-slate-600">{example.output}</code>
                      </div>
                    </div>
                    {example.explanation && (
                      <p className="text-sm text-slate-600 mt-2">{example.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {question.constraints && (
              <div>
                <h5 className="font-medium text-slate-700 mb-2">Constraints:</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  {question.constraints.map((constraint, index) => (
                    <li key={index}>• {constraint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Answer Input */}
        {(question.questionType === 'coding' || question.questionType === 'open-ended') && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Your {question.questionType === 'coding' ? 'Solution' : 'Answer'}:
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={
                question.questionType === 'coding' 
                  ? 'Write your code here...' 
                  : 'Write your answer here...'
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
              rows={question.questionType === 'coding' ? 10 : 5}
              disabled={evaluation}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {!evaluation && (
        <div className="flex space-x-3">
          <motion.button
            onClick={submitAnswer}
            disabled={loading || (!selectedOption && !userAnswer.trim())}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{loading ? 'Evaluating...' : 'Submit Answer'}</span>
          </motion.button>
        </div>
      )}

      {/* Evaluation Results */}
      {evaluation && (
        <motion.div
          className="mt-6 p-6 rounded-lg border-l-4"
          style={{
            borderLeftColor: evaluation.isCorrect ? '#22c55e' : '#ef4444',
            backgroundColor: evaluation.isCorrect ? '#f0fdf4' : '#fef2f2'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            {evaluation.isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={`font-semibold ${
              evaluation.isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {evaluation.isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
            {evaluation.score && (
              <span className="text-sm text-slate-600">
                Score: {evaluation.score}/100
              </span>
            )}
          </div>

          <div className="space-y-3 text-sm">
            {evaluation.feedback && (
              <div>
                <h5 className="font-medium text-slate-700">Feedback:</h5>
                <p className="text-slate-600">{evaluation.feedback}</p>
              </div>
            )}

            {evaluation.correctAnswer && (
              <div>
                <h5 className="font-medium text-slate-700">Correct Answer:</h5>
                <p className="text-slate-600">{evaluation.correctAnswer}</p>
              </div>
            )}

            {evaluation.explanation && (
              <div>
                <h5 className="font-medium text-slate-700">Explanation:</h5>
                <p className="text-slate-600">{evaluation.explanation}</p>
              </div>
            )}

            {evaluation.timeComplexity && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-slate-700">Time Complexity:</h5>
                  <code className="text-slate-600">{evaluation.timeComplexity}</code>
                </div>
                <div>
                  <h5 className="font-medium text-slate-700">Space Complexity:</h5>
                  <code className="text-slate-600">{evaluation.spaceComplexity}</code>
                </div>
              </div>
            )}
          </div>

          <motion.button
            onClick={resetQuestion}
            className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Another Question
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default QuestionCard
