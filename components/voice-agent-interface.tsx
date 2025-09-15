"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { AnimatedGlobe } from "./animated-globe"
import { Mic, X } from "lucide-react"

export function VoiceAgentInterface() {
  const [isListening, setIsListening] = useState(false)

  return (
    <div className="voice-gradient min-h-screen flex flex-col items-center justify-between p-8">
      {/* 3D Globe Container */}
      <div className="flex-1 flex items-center justify-center w-full max-w-md">
        <div className="w-80 h-80 relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <AnimatedGlobe isActive={isListening} />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center mb-12 max-w-sm">
        <p className="text-white text-lg leading-relaxed">
          Hi Maia, I want to create a new email template with <span className="text-purple-300">existing design</span>
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <button className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-600 flex items-center justify-center hover:bg-gray-700/50 transition-colors">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
        </button>

        <button
          onClick={() => setIsListening(!isListening)}
          className="w-16 h-16 rounded-full bg-gray-800/50 border border-gray-600 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
        >
          <Mic className="w-6 h-6 text-white" />
        </button>

        <button className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-600 flex items-center justify-center hover:bg-gray-700/50 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs">
        <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 rounded-full w-1/3 transition-all duration-300" />
        </div>
      </div>
    </div>
  )
}
