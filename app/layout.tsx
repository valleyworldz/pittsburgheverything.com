import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NeuralinkInterface from '@/components/NeuralinkInterface'
import QuantumRealityWarper from '@/components/QuantumRealityWarper'
import AugmentedRealityHologram from '@/components/AugmentedRealityHologram'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PittsburghEverything.com - Revolutionary Review Platform',
  description: 'Experience the future of local reviews with Neuralink brain-computer interface, quantum reality warping, and augmented reality holograms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NeuralinkInterface
          enableNeuralink={true}
          onThoughtDetected={(thought, confidence) => {
            console.log(`🧠 Thought detected: ${thought} (${confidence * 100}% confidence)`)
          }}
          onEmotionDetected={(emotion, intensity) => {
            console.log(`💭 Emotion detected: ${emotion} (${intensity * 100}% intensity)`)
          }}
        >
          <QuantumRealityWarper
            intensity={1}
            autoActivate={false}
            onRealityShift={(shiftType) => {
              console.log(`🌌 Reality shift activated: ${shiftType}`)
            }}
          >
            <AugmentedRealityHologram
              enableAR={true}
              hologramType="interactive"
              onHologramInteraction={(interaction, data) => {
                console.log(`🔮 AR interaction: ${interaction}`, data)
              }}
            >
              {children}
            </AugmentedRealityHologram>
          </QuantumRealityWarper>
        </NeuralinkInterface>
      </body>
    </html>
  )
}
