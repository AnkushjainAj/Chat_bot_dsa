import React from 'react'
import { Code, CheckCircle, Clock, Lightbulb, BookOpen, Target } from 'lucide-react'

const MarkdownRenderer = ({ content }) => {
  // Simple markdown parser for our structured format
  const parseMarkdown = (text) => {
    const sections = text.split('## ')
    const parsedSections = []

    sections.forEach((section, index) => {
      if (index === 0 && !section.trim()) return // Skip empty first section
      
      const lines = section.split('\n')
      const title = lines[0]
      const content = lines.slice(1).join('\n')

      // Determine section type and icon
      let icon = BookOpen
      let bgColor = 'bg-blue-50'
      let borderColor = 'border-blue-200'
      let iconColor = 'text-blue-600'

      if (title.includes('Definition')) {
        icon = BookOpen
        bgColor = 'bg-blue-50'
        borderColor = 'border-blue-200'
        iconColor = 'text-blue-600'
      } else if (title.includes('Characteristics')) {
        icon = CheckCircle
        bgColor = 'bg-green-50'
        borderColor = 'border-green-200'
        iconColor = 'text-green-600'
      } else if (title.includes('Complexity')) {
        icon = Clock
        bgColor = 'bg-orange-50'
        borderColor = 'border-orange-200'
        iconColor = 'text-orange-600'
      } else if (title.includes('Use Cases')) {
        icon = Lightbulb
        bgColor = 'bg-purple-50'
        borderColor = 'border-purple-200'
        iconColor = 'text-purple-600'
      } else if (title.includes('Example')) {
        icon = Code
        bgColor = 'bg-gray-50'
        borderColor = 'border-gray-200'
        iconColor = 'text-gray-600'
      } else if (title.includes('Key Points')) {
        icon = Target
        bgColor = 'bg-red-50'
        borderColor = 'border-red-200'
        iconColor = 'text-red-600'
      }

      parsedSections.push({
        title: title.replace(/[📖🔍⚡💡📝🎯]/g, '').trim(),
        content,
        icon,
        bgColor,
        borderColor,
        iconColor
      })
    })

    return parsedSections
  }

  const renderContent = (content) => {
    // Handle bullet points
    const bulletRegex = /^• (.+)$/gm
    content = content.replace(bulletRegex, '<li class="ml-4 mb-2">$1</li>')
    
    // Handle bold text
    const boldRegex = /\*\*(.+?)\*\*/g
    content = content.replace(boldRegex, '<strong class="font-semibold text-slate-800">$1</strong>')
    
    // Handle code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    content = content.replace(codeBlockRegex, (match, lang, code) => {
      return `<div class="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm mt-3 mb-3 overflow-x-auto">
        <div class="text-slate-400 text-xs mb-2">${lang || 'code'}</div>
        <pre class="whitespace-pre-wrap">${code.trim()}</pre>
      </div>`
    })
    
    // Handle inline code
    const inlineCodeRegex = /`([^`]+)`/g
    content = content.replace(inlineCodeRegex, '<code class="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-800">$1</code>')
    
    // Wrap bullet points in ul
    if (content.includes('<li')) {
      content = content.replace(/(<li.*?<\/li>)/gs, '<ul class="space-y-1">$1</ul>')
    }
    
    return content
  }

  const sections = parseMarkdown(content)

  if (sections.length === 0) {
    // Fallback for non-structured content
    return (
      <div className="prose prose-slate max-w-none">
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const Icon = section.icon
        return (
          <div 
            key={index} 
            className={`${section.bgColor} ${section.borderColor} border rounded-xl p-4 transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-lg bg-white/80 ${section.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-800 text-lg">
                {section.title}
              </h3>
            </div>
            <div 
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: renderContent(section.content.trim()) 
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default MarkdownRenderer
