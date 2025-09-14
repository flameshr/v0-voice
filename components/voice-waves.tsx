"use client"

interface VoiceWavesProps {
  isActive: boolean
}

export function VoiceWaves({ isActive }: VoiceWavesProps) {
  return (
    <div className="flex items-center justify-center space-x-1 h-16">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-primary rounded-full transition-all duration-300 ${isActive ? "voice-wave" : "h-2"}`}
          style={{
            height: isActive ? `${Math.random() * 40 + 20}px` : "8px",
          }}
        />
      ))}
    </div>
  )
}
