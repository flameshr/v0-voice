import { Suspense } from "react"
import { VoiceAssistantClient } from "@/components/voice-assistant-client"

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse text-2xl font-bold text-foreground mb-2">AI Voice Assistant</div>
            <div className="text-muted-foreground">Initializing voice agent...</div>
          </div>
        </div>
      }
    >
      <VoiceAssistantClient />
    </Suspense>
  )
}
