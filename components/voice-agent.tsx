"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VoiceWaves } from "@/components/voice-waves"
import { ProgressIndicator } from "@/components/progress-indicator"
import { Bot, User } from "lucide-react"

interface Message {
  id: string
  type: "user" | "agent"
  content: string
  timestamp: Date
  status?: "processing" | "completed" | "pending-approval"
}

interface VoiceAgentProps {
  isListening: boolean
  messages: Message[]
  currentTask: string | null
  showWelcome: boolean
}

export function VoiceAgent({ isListening, messages, currentTask, showWelcome }: VoiceAgentProps) {
  return (
    <div className="space-y-6">
      {/* Voice Visualization */}
      <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-primary/20">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center voice-glow">
              <Bot className="w-12 h-12 text-primary" />
            </div>
            {(isListening || showWelcome) && (
              <div className="absolute -inset-4">
                <VoiceWaves isActive={isListening || showWelcome} />
              </div>
            )}
          </div>

          {currentTask && (
            <div className="flex items-center space-x-3">
              <ProgressIndicator />
              <span className="text-sm text-muted-foreground">{currentTask}</span>
            </div>
          )}

          {isListening && (
            <Badge variant="secondary" className="animate-pulse">
              Listening...
            </Badge>
          )}
        </div>
      </Card>

      {/* Chat Messages */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === "user"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <Card className={`p-4 ${message.type === "user" ? "bg-secondary text-secondary-foreground" : "bg-card"}`}>
                <p className="text-sm leading-relaxed">{message.content}</p>

                {message.status && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                    <Badge
                      variant={
                        message.status === "completed"
                          ? "default"
                          : message.status === "processing"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {message.status === "processing" && <ProgressIndicator size="sm" className="mr-1" />}
                      {message.status.replace("-", " ")}
                    </Badge>
                  </div>
                )}
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
