"use client"

import { useState, useEffect } from "react"

// Función para mostrar 4 decimales
const formatToFourDecimals = (num) => {
  return num.toFixed(4)
}

// Componente de Icono de Antena
const AntennaIcon = ({ className }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" className={className}>
    <line x1="16" y1="4" x2="16" y2="28" stroke="currentColor" strokeWidth="2" />
    <line x1="8" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="10" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="6" r="2" fill="currentColor" />
  </svg>
)

// Componente de Icono de Calculadora
const CalculatorIcon = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="16" y1="10" x2="16" y2="10" />
    <line x1="12" y1="10" x2="12" y2="10" />
    <line x1="8" y1="10" x2="8" y2="10" />
    <line x1="16" y1="14" x2="16" y2="14" />
    <line x1="12" y1="14" x2="12" y2="14" />
    <line x1="8" y1="14" x2="8" y2="14" />
    <line x1="16" y1="18" x2="16" y2="18" />
    <line x1="12" y1="18" x2="12" y2="18" />
    <line x1="8" y1="18" x2="8" y2="18" />
  </svg>
)

// Componente de Icono de Información
const InfoIcon = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

// Componente de Icono de Usuario
const UserIcon = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

// Componente del Diagrama SVG
const FresnelDiagram = ({ result, distance, frequency }) => (
  <svg
    width="400"
    height="200"
    viewBox="0 0 400 200"
    className="border rounded-lg bg-white shadow-sm w-full max-w-md mx-auto"
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
    <line x1="200" y1="100" x2="200" y2={100 - Math.min(80, result * 2)} stroke="#ef4444" strokeWidth="2" />
    <text x="210" y={100 - Math.min(80, result * 2) / 2} className="text-xs fill-red-600">
      F₁ = {formatToFourDecimals(result)}m
    </text>

    {/* Frequency label */}
    <text x="200" y="180" textAnchor="middle" className="text-xs fill-gray-600">
      Frecuencia: {frequency} GHz
    </text>
  </svg>
)

const calculateFresnel = (distance, frequency, setResult) => {
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

function App() {
  const [distance, setDistance] = useState("")
  const [frequency, setFrequency] = useState("")
  const [result, setResult] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const clearInputs = () => {
    setDistance("")
    setFrequency("")
    setResult(null)
  }

  useEffect(() => {
    if (distance && frequency) {
      calculateFresnel(distance, frequency, setResult)
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
                <AntennaIcon className="text-teal-600" />
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
          <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-teal-600 text-white rounded-t-lg p-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <CalculatorIcon className="h-5 w-5" />
                Calculadora
              </h2>
              <p className="text-blue-100 text-sm mt-1">Ingrese los valores para calcular la zona de Fresnel</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
                  Distancia (D) en kilómetros
                </label>
                <input
                  id="distance"
                  type="number"
                  placeholder="Ej: 10.5"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                  Frecuencia (f) en GHz
                </label>
                <input
                  id="frequency"
                  type="number"
                  placeholder="Ej: 2.4"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => calculateFresnel(distance, frequency, setResult)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  <CalculatorIcon className="h-4 w-4" />
                  Calcular
                </button>
                <button
                  onClick={clearInputs}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Limpiar
                </button>
              </div>

              {result !== null && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700 mb-1">
                        {formatToFourDecimals(result)} metros
                      </div>
                      <div className="text-sm text-green-600">Radio de la primera zona de Fresnel (F₁)</div>
                    </div>
                  </div>

                  {/* Interactive Fresnel Zone Diagram */}
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-lg border-2 border-teal-200">
                    <h3 className="font-semibold text-gray-700 mb-4 text-center">
                      Visualización de la Zona de Fresnel
                    </h3>
                    <div className="flex justify-center">
                      <FresnelDiagram result={result} distance={distance} frequency={frequency} />
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
                <div className="text-center text-lg font-mono bg-white p-3 rounded border">F₁ = 8.656 × √(D/f)</div>
              </div>
            </div>
          </div>

          {/* Explanation Card */}
          <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-emerald-600 text-white rounded-t-lg p-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <InfoIcon className="h-5 w-5" />
                ¿Cómo usar esta calculadora?
              </h2>
            </div>
            <div className="p-6 space-y-4">
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
                    El resultado se calcula automáticamente y muestra el <strong>radio</strong> de la primera zona de
                    Fresnel en metros.
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

              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {showExplanation ? "Ocultar" : "Ver"} explicación técnica
              </button>

              {showExplanation && (
                <div className="bg-gray-50 p-4 rounded-lg border space-y-2">
                  <h4 className="font-semibold text-gray-700">Explicación técnica:</h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>F₁ = Radio de la primera zona de Fresnel en metros</li>
                    <li>D = Distancia total del enlace en kilómetros</li>
                    <li>f = Frecuencia de operación en GHz</li>
                    <li>8.656 = Constante derivada de la fórmula original</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with creator info */}
        <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="p-4">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <UserIcon className="h-4 w-4" />
              <span className="text-sm">
                Creado por: <strong>Gonzalo Spernanzoni</strong> - Calculadora de Zona de Fresnel v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
