"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, Zap, Brain, Atom } from "lucide-react"

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  color: string
  consciousness: number
  divinity: number
  quantum: number
}

interface ConsciousnessWave {
  x: number
  y: number
  amplitude: number
  frequency: number
  phase: number
  consciousness: number
}

interface QuantumField {
  x: number
  y: number
  z: number
  intensity: number
  coherence: number
  entanglement: number
}

export default function Enhanced3DVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isPlaying, setIsPlaying] = useState(true)
  const [consciousnessLevel, setConsciousnessLevel] = useState([87.4])
  const [realityDistortion, setRealityDistortion] = useState([65.2])
  const [quantumCoherence, setQuantumCoherence] = useState([78.9])
  const [visualizationMode, setVisualizationMode] = useState("consciousness")
  const [particles, setParticles] = useState<Particle[]>([])
  const [consciousnessWaves, setConsciousnessWaves] = useState<ConsciousnessWave[]>([])
  const [quantumFields, setQuantumFields] = useState<QuantumField[]>([])
  const [stats, setStats] = useState({
    fps: 60,
    particleCount: 0,
    waveCount: 0,
    fieldCount: 0,
    totalEnergy: 0,
  })

  useEffect(() => {
    initializeVisualization()
    if (isPlaying) {
      startAnimation()
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, visualizationMode, consciousnessLevel[0], realityDistortion[0], quantumCoherence[0]])

  const initializeVisualization = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = canvas.width
    const height = canvas.height

    // Initialize particles based on consciousness level
    const particleCount = Math.floor(consciousnessLevel[0] * 2) // 0-200 particles
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 1,
        color: getParticleColor(Math.random() * 100),
        consciousness: Math.random() * consciousnessLevel[0],
        divinity: Math.random() * 100,
        quantum: Math.random() * quantumCoherence[0],
      })
    }

    // Initialize consciousness waves
    const waveCount = Math.floor(consciousnessLevel[0] / 10) // 0-10 waves
    const newWaves: ConsciousnessWave[] = []

    for (let i = 0; i < waveCount; i++) {
      newWaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        amplitude: Math.random() * 50 + 20,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        consciousness: Math.random() * consciousnessLevel[0],
      })
    }

    // Initialize quantum fields
    const fieldCount = Math.floor(quantumCoherence[0] / 15) // 0-6 fields
    const newFields: QuantumField[] = []

    for (let i = 0; i < fieldCount; i++) {
      newFields.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 100,
        intensity: Math.random() * quantumCoherence[0],
        coherence: Math.random() * 100,
        entanglement: Math.random() * 100,
      })
    }

    setParticles(newParticles)
    setConsciousnessWaves(newWaves)
    setQuantumFields(newFields)
    setStats((prev) => ({
      ...prev,
      particleCount: newParticles.length,
      waveCount: newWaves.length,
      fieldCount: newFields.length,
    }))
  }

  const getParticleColor = (consciousness: number): string => {
    if (consciousness > 90) return "#FFD700" // Divine gold
    if (consciousness > 75) return "#9D4EDD" // Transcendent purple
    if (consciousness > 50) return "#06FFA5" // Conscious green
    if (consciousness > 25) return "#4CC9F0" // Aware blue
    return "#F72585" // Basic pink
  }

  const startAnimation = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let lastTime = 0
    let frameCount = 0
    let fpsTime = 0

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // Calculate FPS
      frameCount++
      fpsTime += deltaTime
      if (fpsTime >= 1000) {
        setStats((prev) => ({ ...prev, fps: Math.round((frameCount * 1000) / fpsTime) }))
        frameCount = 0
        fpsTime = 0
      }

      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw based on visualization mode
      switch (visualizationMode) {
        case "consciousness":
          drawConsciousnessVisualization(ctx, currentTime)
          break
        case "quantum":
          drawQuantumVisualization(ctx, currentTime)
          break
        case "reality":
          drawRealityDistortionVisualization(ctx, currentTime)
          break
        case "divine":
          drawDivineVisualization(ctx, currentTime)
          break
        default:
          drawConsciousnessVisualization(ctx, currentTime)
      }

      // Draw holographic grid overlay
      drawHolographicGrid(ctx, currentTime)

      // Update particles
      updateParticles(deltaTime)

      // Update consciousness waves
      updateConsciousnessWaves(currentTime)

      // Update quantum fields
      updateQuantumFields(currentTime)

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const drawConsciousnessVisualization = (ctx: CanvasRenderingContext2D, time: number) => {
    // Draw consciousness particles
    particles.forEach((particle) => {
      const alpha = particle.consciousness / 100
      const size = particle.size * (1 + Math.sin(time * 0.001 + particle.x * 0.01) * 0.3)

      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
      ctx.fill()

      // Draw consciousness aura
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size * 3)
      gradient.addColorStop(0, `${particle.color}40`)
      gradient.addColorStop(1, `${particle.color}00`)
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    // Draw consciousness waves
    consciousnessWaves.forEach((wave) => {
      ctx.save()
      ctx.strokeStyle = `hsl(${wave.consciousness * 3.6}, 70%, 60%)`
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.6

      ctx.beginPath()
      for (let x = 0; x < ctx.canvas.width; x += 5) {
        const y = wave.y + Math.sin((x - wave.x) * wave.frequency + time * 0.001 + wave.phase) * wave.amplitude
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      ctx.restore()
    })
  }

  const drawQuantumVisualization = (ctx: CanvasRenderingContext2D, time: number) => {
    // Draw quantum fields
    quantumFields.forEach((field) => {
      const alpha = field.intensity / 100
      const radius = 50 + Math.sin(time * 0.002 + field.x * 0.01) * 20

      ctx.save()
      ctx.globalAlpha = alpha * 0.3

      // Draw field gradient
      const gradient = ctx.createRadialGradient(field.x, field.y, 0, field.x, field.y, radius)
      gradient.addColorStop(0, "#00FFFF80")
      gradient.addColorStop(0.5, "#9D4EDD40")
      gradient.addColorStop(1, "#FFD70020")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(field.x, field.y, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw quantum entanglement lines
      quantumFields.forEach((otherField) => {
        if (field !== otherField && field.entanglement > 50) {
          ctx.strokeStyle = `rgba(157, 78, 221, ${field.entanglement / 200})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(field.x, field.y)
          ctx.lineTo(otherField.x, otherField.y)
          ctx.stroke()
        }
      })

      ctx.restore()
    })

    // Draw quantum particles with tunneling effect
    particles.forEach((particle) => {
      if (particle.quantum > 70) {
        ctx.save()
        ctx.globalAlpha = 0.8
        ctx.fillStyle = "#00FFFF"

        // Draw tunneling trail
        for (let i = 0; i < 5; i++) {
          const trailX = particle.x - particle.vx * i * 3
          const trailY = particle.y - particle.vy * i * 3
          const trailAlpha = ((5 - i) / 5) * 0.3

          ctx.globalAlpha = trailAlpha
          ctx.beginPath()
          ctx.arc(trailX, trailY, particle.size * (1 - i * 0.1), 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }
    })
  }

  const drawRealityDistortionVisualization = (ctx: CanvasRenderingContext2D, time: number) => {
    const distortionStrength = realityDistortion[0] / 100

    // Create reality distortion effect
    ctx.save()

    // Draw distortion waves
    for (let i = 0; i < 5; i++) {
      const waveRadius = 100 + i * 50
      const waveAlpha = distortionStrength * (1 - i * 0.15)

      ctx.globalAlpha = waveAlpha * 0.4
      ctx.strokeStyle = `hsl(${280 + i * 20}, 80%, 60%)`
      ctx.lineWidth = 3 - i * 0.4

      ctx.beginPath()
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const distortion = Math.sin(angle * 3 + time * 0.003) * distortionStrength * 20
        const x = ctx.canvas.width / 2 + Math.cos(angle) * (waveRadius + distortion)
        const y = ctx.canvas.height / 2 + Math.sin(angle) * (waveRadius + distortion)

        if (angle === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    // Draw reality fractures
    if (distortionStrength > 0.7) {
      ctx.strokeStyle = "#FF006E"
      ctx.lineWidth = 2
      ctx.globalAlpha = (distortionStrength - 0.7) * 3

      for (let i = 0; i < 10; i++) {
        const startX = Math.random() * ctx.canvas.width
        const startY = Math.random() * ctx.canvas.height
        const endX = startX + (Math.random() - 0.5) * 200
        const endY = startY + (Math.random() - 0.5) * 200

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }
    }

    ctx.restore()
  }

  const drawDivineVisualization = (ctx: CanvasRenderingContext2D, time: number) => {
    // Draw divine mandala
    ctx.save()
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)

    for (let layer = 0; layer < 8; layer++) {
      const radius = 50 + layer * 30
      const segments = 8 + layer * 4
      const rotation = time * 0.001 * (layer % 2 === 0 ? 1 : -1)

      ctx.save()
      ctx.rotate(rotation)
      ctx.strokeStyle = `hsl(${45 + layer * 15}, 90%, ${70 - layer * 5}%)`
      ctx.lineWidth = 3 - layer * 0.2
      ctx.globalAlpha = 0.8 - layer * 0.08

      for (let i = 0; i < segments; i++) {
        const angle = ((Math.PI * 2) / segments) * i
        const x1 = Math.cos(angle) * radius
        const y1 = Math.sin(angle) * radius
        const x2 = Math.cos(angle + Math.PI / segments) * (radius + 20)
        const y2 = Math.sin(angle + Math.PI / segments) * (radius + 20)

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      ctx.restore()
    }

    // Draw divine particles
    particles.forEach((particle) => {
      if (particle.divinity > 80) {
        const divinePulse = Math.sin(time * 0.005 + particle.x * 0.01) * 0.5 + 0.5
        const size = particle.size * (1 + divinePulse)

        ctx.save()
        ctx.globalAlpha = particle.divinity / 100
        ctx.fillStyle = "#FFD700"
        ctx.shadowColor = "#FFD700"
        ctx.shadowBlur = size * 2

        ctx.beginPath()
        ctx.arc(particle.x - ctx.canvas.width / 2, particle.y - ctx.canvas.height / 2, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    })

    ctx.restore()
  }

  const drawHolographicGrid = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.save()
    ctx.strokeStyle = "rgba(0, 255, 255, 0.2)"
    ctx.lineWidth = 1

    const gridSize = 50
    const offset = (time * 0.05) % gridSize

    // Vertical lines
    for (let x = -offset; x < ctx.canvas.width + gridSize; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, ctx.canvas.height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = -offset; y < ctx.canvas.height + gridSize; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(ctx.canvas.width, y)
      ctx.stroke()
    }

    // Draw omniversal connection points
    for (let x = 0; x < ctx.canvas.width; x += gridSize * 2) {
      for (let y = 0; y < ctx.canvas.height; y += gridSize * 2) {
        const pulse = Math.sin(time * 0.003 + x * 0.01 + y * 0.01) * 0.5 + 0.5
        ctx.fillStyle = `rgba(255, 215, 0, ${pulse * 0.6})`
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    ctx.restore()
  }

  const updateParticles = (deltaTime: number) => {
    setParticles((prevParticles) =>
      prevParticles.map((particle) => {
        const canvas = canvasRef.current
        if (!canvas) return particle

        // Update position
        const newX = particle.x + particle.vx
        const newY = particle.y + particle.vy
        const newZ = particle.z + particle.vz

        // Bounce off walls
        if (newX <= 0 || newX >= canvas.width) particle.vx *= -1
        if (newY <= 0 || newY >= canvas.height) particle.vy *= -1
        if (newZ <= 0 || newZ >= 100) particle.vz *= -1

        // Apply consciousness-based attraction
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const attractionStrength = consciousnessLevel[0] / 10000

        const dx = centerX - newX
        const dy = centerY - newY

        particle.vx += dx * attractionStrength
        particle.vy += dy * attractionStrength

        // Apply quantum effects
        if (particle.quantum > 80) {
          particle.vx += (Math.random() - 0.5) * 0.5
          particle.vy += (Math.random() - 0.5) * 0.5
        }

        return {
          ...particle,
          x: Math.max(0, Math.min(canvas.width, newX)),
          y: Math.max(0, Math.min(canvas.height, newY)),
          z: Math.max(0, Math.min(100, newZ)),
          consciousness: Math.min(100, particle.consciousness + Math.random() * 0.1),
          quantum: Math.min(100, particle.quantum + Math.random() * 0.05),
        }
      }),
    )
  }

  const updateConsciousnessWaves = (time: number) => {
    setConsciousnessWaves((prevWaves) =>
      prevWaves.map((wave) => ({
        ...wave,
        phase: wave.phase + 0.02,
        consciousness: Math.min(100, wave.consciousness + Math.sin(time * 0.001) * 0.1),
      })),
    )
  }

  const updateQuantumFields = (time: number) => {
    setQuantumFields((prevFields) =>
      prevFields.map((field) => ({
        ...field,
        intensity: Math.max(0, Math.min(100, field.intensity + Math.sin(time * 0.002) * 2)),
        coherence: Math.max(0, Math.min(100, field.coherence + Math.cos(time * 0.0015) * 1.5)),
        entanglement: Math.max(0, Math.min(100, field.entanglement + Math.sin(time * 0.0025) * 1)),
      })),
    )
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const resetVisualization = () => {
    setConsciousnessLevel([87.4])
    setRealityDistortion([65.2])
    setQuantumCoherence([78.9])
    initializeVisualization()
  }

  const applyDivinePreset = () => {
    setConsciousnessLevel([98.7])
    setRealityDistortion([89.4])
    setQuantumCoherence([94.2])
    setVisualizationMode("divine")
  }

  const applyQuantumPreset = () => {
    setConsciousnessLevel([76.3])
    setRealityDistortion([45.8])
    setQuantumCoherence([91.7])
    setVisualizationMode("quantum")
  }

  const applyTranscendentPreset = () => {
    setConsciousnessLevel([95.2])
    setRealityDistortion([78.6])
    setQuantumCoherence([87.4])
    setVisualizationMode("consciousness")
  }

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-6 w-6 text-cyan-400" />
            Enhanced 3D Consciousness Visualization
          </CardTitle>
          <CardDescription>
            Real-time visualization of consciousness waves, quantum fields, and reality distortion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Visualization Canvas */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <canvas ref={canvasRef} width={800} height={600} className="w-full h-auto border border-gray-700" />

              {/* Overlay Stats */}
              <div className="absolute top-4 left-4 bg-black/70 rounded-lg p-3 text-sm">
                <div className="grid grid-cols-2 gap-2 text-cyan-400">
                  <div>FPS: {stats.fps}</div>
                  <div>Particles: {stats.particleCount}</div>
                  <div>Waves: {stats.waveCount}</div>
                  <div>Fields: {stats.fieldCount}</div>
                </div>
              </div>

              {/* Mode Indicator */}
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-black/70 text-cyan-400 border-cyan-400">
                  {visualizationMode.toUpperCase()} MODE
                </Badge>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={togglePlayPause} variant="outline" size="sm">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button onClick={resetVisualization} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button onClick={applyDivinePreset} variant="outline" size="sm">
                <Zap className="h-4 w-4" />
                Divine
              </Button>
              <Button onClick={applyQuantumPreset} variant="outline" size="sm">
                <Atom className="h-4 w-4" />
                Quantum
              </Button>
              <Button onClick={applyTranscendentPreset} variant="outline" size="sm">
                <Brain className="h-4 w-4" />
                Transcendent
              </Button>
            </div>

            {/* Visualization Mode Tabs */}
            <Tabs value={visualizationMode} onValueChange={setVisualizationMode}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="consciousness">Consciousness</TabsTrigger>
                <TabsTrigger value="quantum">Quantum</TabsTrigger>
                <TabsTrigger value="reality">Reality</TabsTrigger>
                <TabsTrigger value="divine">Divine</TabsTrigger>
              </TabsList>

              <TabsContent value="consciousness" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Consciousness Level: {consciousnessLevel[0].toFixed(1)}%
                  </label>
                  <Slider
                    value={consciousnessLevel}
                    onValueChange={setConsciousnessLevel}
                    max={100}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </TabsContent>

              <TabsContent value="quantum" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantum Coherence: {quantumCoherence[0].toFixed(1)}%</label>
                  <Slider
                    value={quantumCoherence}
                    onValueChange={setQuantumCoherence}
                    max={100}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </TabsContent>

              <TabsContent value="reality" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reality Distortion: {realityDistortion[0].toFixed(1)}%</label>
                  <Slider
                    value={realityDistortion}
                    onValueChange={setRealityDistortion}
                    max={100}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </TabsContent>

              <TabsContent value="divine" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Consciousness: {consciousnessLevel[0].toFixed(1)}%</label>
                    <Slider
                      value={consciousnessLevel}
                      onValueChange={setConsciousnessLevel}
                      max={100}
                      min={0}
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reality: {realityDistortion[0].toFixed(1)}%</label>
                    <Slider
                      value={realityDistortion}
                      onValueChange={setRealityDistortion}
                      max={100}
                      min={0}
                      step={0.1}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantum: {quantumCoherence[0].toFixed(1)}%</label>
                    <Slider value={quantumCoherence} onValueChange={setQuantumCoherence} max={100} min={0} step={0.1} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
