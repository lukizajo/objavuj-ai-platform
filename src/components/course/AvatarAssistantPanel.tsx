import React, { useState } from 'react'
import { Bot, Send, X, Sparkles, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AvatarAssistantPanelProps {
  lessonContext?: string
}

export const AvatarAssistantPanel: React.FC<AvatarAssistantPanelProps> = ({
  lessonContext,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Ahoj! Som vas AI asistent pre kurz OBJAVUJ-AI. Ako vam mozem pomoct s ucenim?',
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response (replace with actual OpenAI integration)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Dakujem za vasu otazku! Toto je placeholder odpoved. 
        
Po integraci OpenAI API budem schopny poskytnut relevantne odpovede na vase otazky ohladom ${
          lessonContext || 'umelej inteligencie'
        }.

Mozete sa ma spytat na:
- Vysvetlenie konceptov z lekcie
- Prakticke priklady
- Doplnujuce zdroje
- Cvicenia a ulohy`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Card className="sticky top-20" hover>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-community to-primary rounded-2xl flex items-center justify-center">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">AI Asistent</h3>
          <p className="text-sm text-text-secondary mb-4">
            Ako vam mozem pomoct s ucenim?
          </p>
          <Button
            variant="primary"
            onClick={() => setIsOpen(true)}
            className="w-full gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Otvorit chat
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="sticky top-20 flex flex-col h-[500px]" padding="none">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-community to-primary rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary text-sm">AI Asistent</h3>
            <p className="text-xs text-text-secondary">Vzdy pripraveny pomoct</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-text-secondary" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-muted text-text-primary rounded-bl-md'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm text-text-secondary">Premyslam...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Napisite vasu otazku..."
            className="flex-grow px-4 py-2.5 bg-muted rounded-xl text-sm text-text-primary 
                     placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center
                     hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-text-secondary text-center mt-2">
          Pohaane OpenAI (integrovane coskoro)
        </p>
      </div>
    </Card>
  )
}

export default AvatarAssistantPanel
