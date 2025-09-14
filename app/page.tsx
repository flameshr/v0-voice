"use client"

import { useState, useEffect } from "react"
import { VoiceAgent } from "@/components/voice-agent"
import { ApprovalModal } from "@/components/approval-modal"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"

export default function Home() {
  const [isListening, setIsListening] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [messages, setMessages] = useState<
    Array<{
      id: string
      type: "user" | "agent"
      content: string
      timestamp: Date
      status?: "processing" | "completed" | "pending-approval"
    }>
  >([])
  const [currentTask, setCurrentTask] = useState<string | null>(null)
  const [pendingApproval, setPendingApproval] = useState<{
    id: string
    action: string
    details: string
    data: any
  } | null>(null)

  useEffect(() => {
    // Welcome message on app load
    if (showWelcome) {
      const welcomeTimer = setTimeout(() => {
        setMessages([
          {
            id: "1",
            type: "agent",
            content:
              "Hello! I'm your AI voice assistant. I'm ready to help you with tasks like sending emails, scheduling meetings, and much more. How can I assist you today?",
            timestamp: new Date(),
            status: "completed",
          },
        ])
        setShowWelcome(false)
      }, 1000)
      return () => clearTimeout(welcomeTimer)
    }
  }, [showWelcome])

  const handleStartListening = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      const userMessage = {
        id: Date.now().toString(),
        type: "user" as const,
        content: "Send an email to John about the project update",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setIsListening(false)
      handleProcessMessage(userMessage.content)
    }, 3000)
  }

  const handleProcessMessage = (content: string) => {
    const agentMessage = {
      id: Date.now().toString(),
      type: "agent" as const,
      content: "I'll help you send that email. Let me draft it for you...",
      timestamp: new Date(),
      status: "processing" as const,
    }
    setMessages((prev) => [...prev, agentMessage])
    setCurrentTask("Drafting email...")

    // Simulate processing
    setTimeout(() => {
      setCurrentTask("Email drafted - awaiting approval")
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === agentMessage.id
            ? {
                ...msg,
                status: "pending-approval" as const,
                content: "I've drafted an email for John. Please review and approve:",
              }
            : msg,
        ),
      )

      setPendingApproval({
        id: agentMessage.id,
        action: "Send Email",
        details: "Email to John about project update",
        data: {
          to: "john@company.com",
          subject: "Project Update",
          body: "Hi John,\n\nI wanted to give you a quick update on our current project status. We've made significant progress and are on track to meet our deadline.\n\nBest regards",
        },
      })
    }, 2000)
  }

  const handleApproval = (approved: boolean) => {
    if (pendingApproval) {
      const resultMessage = {
        id: Date.now().toString(),
        type: "agent" as const,
        content: approved
          ? "Email sent successfully! John will receive your message shortly."
          : "Email cancelled. Is there anything else I can help you with?",
        timestamp: new Date(),
        status: "completed" as const,
      }
      setMessages((prev) => [...prev, resultMessage])
      setPendingApproval(null)
      setCurrentTask(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">AI Voice Assistant</h1>
          <p className="text-muted-foreground text-lg">Your intelligent companion for productivity and communication</p>
        </div>

        <VoiceAgent isListening={isListening} messages={messages} currentTask={currentTask} showWelcome={showWelcome} />

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleStartListening}
            disabled={isListening}
            size="lg"
            className="rounded-full w-20 h-20 voice-glow"
          >
            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </Button>
        </div>

        {pendingApproval && (
          <ApprovalModal
            isOpen={!!pendingApproval}
            onClose={() => setPendingApproval(null)}
            onApprove={() => handleApproval(true)}
            onReject={() => handleApproval(false)}
            action={pendingApproval.action}
            details={pendingApproval.details}
            data={pendingApproval.data}
          />
        )}
      </div>
    </div>
  )
}
