"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, Info, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function FresnelCalculator() {
  const [distance, setDistance] = useState("")
  const [frequency, setFrequency] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const calculateFresnel = () => {
    const d = Number.parseFloat(distance)
    const f = Number.parseFloat(frequency)

    if (d > 0 && f > 0) {
      // Fórmula: F₁ = 8.656 × √(D/f)
      const fresnelRadius = 8.656 * Math.sqrt(d / f)
      setResult(fresnelRadius)
    } else {
      setResult(null)
    }
  }

  const clearInputs = () => {
    setDistance("")
    setFrequency("")
    setResult(null)
  }

  useEffect(() => {
    if (distance && frequency) {
      calculateFresnel()
    }
  }, [distance, frequency])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <div className="w-8 h-8 flex items-center justify-center">
                {/* Simple antenna icon */}
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-teal-600">
                  <line x1="16" y1="4" x2="16" y2="28" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="2" />
                  <line x1="10" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" />
                  <circle cx="16" cy="6" r="2" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              Calculadora de Zona de Fresnel
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Herramienta para calcular el radio de la primera zona de Fresnel en enlaces de radiocomunicaciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Calculator Card */}
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculadora
              </CardTitle>
              <CardDescription className="text-blue-100">
                Ingrese los valores para calcular la zona de Fresnel
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="distance" className="text-sm font-medium">
                  Distancia (D) en kilómetros
                </Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="Ej: 10.5"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="text-lg"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-sm font-medium">
                  Frecuencia (f) en GHz
                </Label>
                <Input
                  id="frequency"
                  type="number"
                  placeholder="Ej: 2.4"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="text-lg"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateFresnel} className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular
                </Button>
                <Button onClick={clearInputs} variant="outline">
                  Limpiar
                </Button>
              </div>

              {result !== null && (
                <>
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-center">
                      <div className="text-2xl font-bold text-green-700 mb-1">{result.toFixed(4)} metros</div>
                      <div className="text-sm text-green-600">Radio de la primera zona de Fresnel (F₁)</div>
                    </AlertDescription>
                  </Alert>

                  {/* Interactive Fresnel Zone Diagram */}
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-lg border-2 border-teal-200">
                    <h3 className="font-semibold text-gray-700 mb-4 text-center">
                      Visualización de la Zona de Fresnel
                    </h3>
                    <div className="flex justify-center">
                      <svg
                        width="400"
                        height="200"
                        viewBox="0 0 400 200"
                        className="border rounded-lg bg-white shadow-sm"
                      >
                        {/* Background grid */}
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="400" height="200" fill="url(#grid)" />

                        {/* Fresnel Zone Ellipse */}
                        <ellipse
                          cx="200"
                          cy="100"
                          rx="180"
                          ry={Math.min(80, result * 2)}
                          fill="rgba(20, 184, 166, 0.2)"
                          stroke="rgba(20, 184, 166, 0.6)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />

                        {/* Line of Sight */}
                        <line x1="40" y1="100" x2="360" y2="100" stroke="#374151" strokeWidth="2" />
                        <text x="200" y="90" textAnchor="middle" className="text-xs fill-gray-600">
                          Línea Vista
                        </text>

                        {/* Left Tower */}
                        <rect x="35" y="60" width="10" height="40" fill="#dc2626" />
                        <rect x="30" y="50" width="20" height="10" fill="#dc2626" />
                        <line x1="40" y1="50" x2="40" y2="30" stroke="#374151" strokeWidth="2" />
                        <circle cx="40" cy="30" r="3" fill="#fbbf24" />

                        {/* Right Tower */}
                        <rect x="355" y="60" width="10" height="40" fill="#dc2626" />
                        <rect x="350" y="50" width="20" height="10" fill="#dc2626" />
                        <line x1="360" y1="50" x2="360" y2="30" stroke="#374151" strokeWidth="2" />
                        <circle cx="360" cy="30" r="3" fill="#fbbf24" />

                        {/* Distance labels */}
                        <line x1="40" y1="130" x2="360" y2="130" stroke="#6b7280" strokeWidth="1" />
                        <line x1="40" y1="125" x2="40" y2="135" stroke="#6b7280" strokeWidth="1" />
                        <line x1="360" y1="125" x2="360" y2="135" stroke="#6b7280" strokeWidth="1" />
                        <text x="200" y="145" textAnchor="middle" className="text-xs fill-gray-600">
                          Distancia: {distance} km
                        </text>

                        {/* Fresnel radius indicator */}
                        <line
                          x1="200"
                          y1="100"
                          x2="200"
                          y2={100 - Math.min(80, result * 2)}
                          stroke="#ef4444"
                          strokeWidth="2"
                        />
                        <text x="210" y={100 - Math.min(80, result * 2) / 2} className="text-xs fill-red-600">
                          F₁ = {result.toFixed(4)}m
                        </text>

                        {/* Frequency label */}
                        <text x="200" y="180" textAnchor="middle" className="text-xs fill-gray-600">
                          Frecuencia: {frequency} GHz
                        </text>
                      </svg>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      El área azul representa la zona de Fresnel que debe mantenerse libre de obstáculos
                    </p>
                  </div>
                </>
              )}

              {/* Formula Display */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-700 mb-2">Fórmula utilizada:</h3>
                <div className="text-center">
                  <img
                    src="/fresnel-formula.png"
                    alt="Fórmula de Fresnel: F₁[m] = 8.656 × √(D[km]/f[GHz])"
                    className="mx-auto max-w-full h-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Explanation Card */}
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                ¿Cómo usar esta calculadora?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Paso 1:</h3>
                  <p className="text-gray-600 text-sm">
                    Ingrese la <strong>distancia</strong> entre las dos antenas en kilómetros. Por ejemplo: 5.2 km
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Paso 2:</h3>
                  <p className="text-gray-600 text-sm">
                    Ingrese la <strong>frecuencia</strong> de operación en GHz. Por ejemplo: 2.4 GHz (WiFi), 5.8 GHz,
                    etc.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Paso 3:</h3>
                  <p className="text-gray-600 text-sm">
                    El resultado se calcula automáticamente y muestra el <strong>radio</strong>
                    de la primera zona de Fresnel en metros.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h3 className="font-semibold text-teal-700 mb-2">¿Qué es la Zona de Fresnel?</h3>
                <p className="text-teal-600 text-sm">
                  Es el área alrededor de la línea visual entre dos antenas que debe mantenerse libre de obstáculos para
                  garantizar una buena comunicación por radio. Se recomienda mantener al menos el 60% de esta zona
                  despejada.
                </p>
              </div>

              <Button onClick={() => setShowExplanation(!showExplanation)} variant="outline" className="w-full">
                {showExplanation ? "Ocultar" : "Ver"} explicación técnica
              </Button>

              {showExplanation && (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg border space-y-2">
                    <h4 className="font-semibold text-gray-700">Explicación técnica:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>F₁ = Radio de la primera zona de Fresnel en metros</li>
                      <li>D = Distancia total del enlace en kilómetros</li>
                      <li>f = Frecuencia de operación en GHz</li>
                      <li>8.656 = Constante derivada de la fórmula original</li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer with creator info */}
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <User className="h-4 w-4" />
              <span className="text-sm">
                Creado por: <strong>Gonzalo Spernanzoni</strong> - Calculadora de Zona de Fresnel v1.0
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
