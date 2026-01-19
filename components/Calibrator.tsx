'use client'

import { useState, useMemo } from 'react'
import {
  Eye,
  Sun,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  Lightbulb,
  Palette,
} from 'lucide-react'
import {
  VisualConditions,
  ColorVisionDeficiency,
  Prescription,
  CurrentSettings,
  ConditionInfo,
  ColorVisionInfo,
} from '@/lib/types'
import {
  calculateRecommendations,
  generateZedConfig,
  formatZedConfigString,
} from '@/lib/calculator'

const CONDITIONS: ConditionInfo[] = [
  {
    key: 'myopia',
    label: 'Myopia',
    description: 'Nearsightedness - difficulty seeing distant objects',
    icon: '👓',
  },
  {
    key: 'hyperopia',
    label: 'Hyperopia',
    description: 'Farsightedness - difficulty focusing on close objects',
    icon: '🔍',
  },
  {
    key: 'astigmatism',
    label: 'Astigmatism',
    description: 'Blurred vision due to irregular cornea shape',
    icon: '〰️',
  },
  {
    key: 'eyeStrain',
    label: 'Eye Strain',
    description: 'Fatigue after long screen sessions',
    icon: '😫',
  },
  {
    key: 'blurGhosting',
    label: 'Blur / Ghosting',
    description: 'Double images or halo effects',
    icon: '👻',
  },
  {
    key: 'lightSensitivity',
    label: 'Light Sensitivity',
    description: 'Discomfort from bright screens',
    icon: '☀️',
  },
  {
    key: 'visualCrowding',
    label: 'Visual Crowding',
    description: 'Dense text feels overwhelming',
    icon: '📝',
  },
]

const COLOR_VISION_OPTIONS: ColorVisionInfo[] = [
  { type: 'none', label: 'Normal Color Vision', description: '' },
  {
    type: 'deuteranopia',
    label: 'Deuteranopia',
    description: 'Green-blind (most common)',
  },
  { type: 'protanopia', label: 'Protanopia', description: 'Red-blind' },
  { type: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind (rare)' },
  {
    type: 'achromatopsia',
    label: 'Achromatopsia',
    description: 'Complete color blindness',
  },
]

export default function Calibrator() {
  const [conditions, setConditions] = useState<VisualConditions>({
    myopia: false,
    hyperopia: false,
    astigmatism: false,
    eyeStrain: false,
    blurGhosting: false,
    lightSensitivity: false,
    visualCrowding: false,
  })

  const [colorVision, setColorVision] = useState<ColorVisionDeficiency>({
    type: 'none',
  })

  const [prescription, setPrescription] = useState<Prescription>({
    rightSphere: '',
    rightCylinder: '',
    rightAxis: '',
    leftSphere: '',
    leftCylinder: '',
    leftAxis: '',
  })

  const [currentSettings, setCurrentSettings] = useState<CurrentSettings>({
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 400,
  })

  const [showResults, setShowResults] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showColorVisionDropdown, setShowColorVisionDropdown] = useState(false)

  const toggleCondition = (key: keyof VisualConditions) => {
    setConditions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const recommendations = useMemo(() => {
    return calculateRecommendations(
      conditions,
      colorVision,
      prescription,
      currentSettings
    )
  }, [conditions, colorVision, prescription, currentSettings])

  const zedConfig = useMemo(() => {
    return generateZedConfig(recommendations)
  }, [recommendations])

  const configString = useMemo(() => {
    return formatZedConfigString(zedConfig, recommendations)
  }, [zedConfig, recommendations])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(configString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerate = () => {
    // Auto-detect conditions from prescription
    const rightSph = parseFloat(prescription.rightSphere) || 0
    const leftSph = parseFloat(prescription.leftSphere) || 0
    const avgSphere = (rightSph + leftSph) / 2
    const rightAxis = parseFloat(prescription.rightAxis) || 0
    const leftAxis = parseFloat(prescription.leftAxis) || 0
    const rightCyl = parseFloat(prescription.rightCylinder) || 0
    const leftCyl = parseFloat(prescription.leftCylinder) || 0

    const newConditions = { ...conditions }

    if (avgSphere < -0.5 && !conditions.myopia) {
      newConditions.myopia = true
    }
    if (avgSphere > 0.5 && !conditions.hyperopia) {
      newConditions.hyperopia = true
    }
    if (
      (rightAxis > 0 || leftAxis > 0 || rightCyl !== 0 || leftCyl !== 0) &&
      !conditions.astigmatism
    ) {
      newConditions.astigmatism = true
    }

    setConditions(newConditions)
    setShowResults(true)
  }

  return (
    <div className="space-y-6">
      {/* Visual Conditions */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-400" />
          <h2 className="font-medium text-zinc-100">Visual Conditions</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONDITIONS.map((condition) => (
            <button
              key={condition.key}
              onClick={() => toggleCondition(condition.key)}
              className={`flex flex-col items-start rounded-lg border p-4 text-left transition-all ${
                conditions[condition.key]
                  ? 'border-blue-500/50 bg-blue-500/10'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span>{condition.icon}</span>
                <span className="font-medium text-zinc-100">
                  {condition.label}
                </span>
              </div>
              <span className="text-xs text-zinc-500">
                {condition.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Vision */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5 text-purple-400" />
          <h2 className="font-medium text-zinc-100">Color Vision</h2>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowColorVisionDropdown(!showColorVisionDropdown)}
            className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-left hover:border-zinc-700"
          >
            <div>
              <span className="text-zinc-100">
                {COLOR_VISION_OPTIONS.find((o) => o.type === colorVision.type)
                  ?.label || 'Select...'}
              </span>
              {colorVision.type !== 'none' && (
                <span className="ml-2 text-sm text-zinc-500">
                  {
                    COLOR_VISION_OPTIONS.find((o) => o.type === colorVision.type)
                      ?.description
                  }
                </span>
              )}
            </div>
            <ChevronDown
              className={`h-4 w-4 text-zinc-500 transition-transform ${
                showColorVisionDropdown ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showColorVisionDropdown && (
            <div className="absolute z-10 mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900 py-1 shadow-xl">
              {COLOR_VISION_OPTIONS.map((option) => (
                <button
                  key={option.type}
                  onClick={() => {
                    setColorVision({ type: option.type })
                    setShowColorVisionDropdown(false)
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-zinc-800 ${
                    colorVision.type === option.type ? 'bg-zinc-800' : ''
                  }`}
                >
                  <span className="text-zinc-100">{option.label}</span>
                  {option.description && (
                    <span className="text-sm text-zinc-500">
                      {option.description}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prescription */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h2 className="font-medium text-zinc-100">
              Prescription{' '}
              <span className="text-sm font-normal text-zinc-500">
                (optional)
              </span>
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Right Eye */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-zinc-400">
              Right Eye (OD)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Sphere
                </label>
                <input
                  type="text"
                  value={prescription.rightSphere}
                  onChange={(e) =>
                    setPrescription((p) => ({
                      ...p,
                      rightSphere: e.target.value,
                    }))
                  }
                  placeholder="-2.00"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Cylinder
                </label>
                <input
                  type="text"
                  value={prescription.rightCylinder}
                  onChange={(e) =>
                    setPrescription((p) => ({
                      ...p,
                      rightCylinder: e.target.value,
                    }))
                  }
                  placeholder="-0.75"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Axis</label>
                <input
                  type="text"
                  value={prescription.rightAxis}
                  onChange={(e) =>
                    setPrescription((p) => ({
                      ...p,
                      rightAxis: e.target.value,
                    }))
                  }
                  placeholder="120"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Left Eye */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-zinc-400">
              Left Eye (OS)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Sphere
                </label>
                <input
                  type="text"
                  value={prescription.leftSphere}
                  onChange={(e) =>
                    setPrescription((p) => ({
                      ...p,
                      leftSphere: e.target.value,
                    }))
                  }
                  placeholder="-2.25"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Cylinder
                </label>
                <input
                  type="text"
                  value={prescription.leftCylinder}
                  onChange={(e) =>
                    setPrescription((p) => ({
                      ...p,
                      leftCylinder: e.target.value,
                    }))
                  }
                  placeholder="-0.50"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Axis</label>
                <input
                  type="text"
                  value={prescription.leftAxis}
                  onChange={(e) =>
                    setPrescription((p) => ({ ...p, leftAxis: e.target.value }))
                  }
                  placeholder="70"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Values are processed locally and never stored or transmitted.
        </p>
      </div>

      {/* Current Settings */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sun className="h-5 w-5 text-green-400" />
          <h2 className="font-medium text-zinc-100">
            Current Settings{' '}
            <span className="text-sm font-normal text-zinc-500">(baseline)</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:max-w-md">
          <div>
            <label className="mb-1 block text-xs text-zinc-500">
              Font Size
            </label>
            <input
              type="number"
              value={currentSettings.fontSize}
              onChange={(e) =>
                setCurrentSettings((s) => ({
                  ...s,
                  fontSize: parseInt(e.target.value) || 14,
                }))
              }
              min={10}
              max={32}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">
              Line Height
            </label>
            <input
              type="number"
              value={currentSettings.lineHeight}
              onChange={(e) =>
                setCurrentSettings((s) => ({
                  ...s,
                  lineHeight: parseFloat(e.target.value) || 1.5,
                }))
              }
              min={1}
              max={3}
              step={0.1}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">
              Font Weight
            </label>
            <input
              type="number"
              value={currentSettings.fontWeight}
              onChange={(e) =>
                setCurrentSettings((s) => ({
                  ...s,
                  fontWeight: parseInt(e.target.value) || 400,
                }))
              }
              min={300}
              max={700}
              step={100}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40"
      >
        Generate Recommendations
      </button>

      {/* Results */}
      {showResults && (
        <div className="animate-fade-in space-y-6">
          {/* Recommendation Cards */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-4 font-medium text-zinc-100">
              Recommended Settings
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-zinc-800/50 p-4 text-center">
                <div className="text-xs text-zinc-500">Font Size</div>
                <div className="mt-1 font-mono text-2xl font-semibold text-blue-400">
                  {recommendations.fontSize}
                  <span className="text-sm text-zinc-500">px</span>
                </div>
              </div>
              <div className="rounded-lg bg-zinc-800/50 p-4 text-center">
                <div className="text-xs text-zinc-500">Line Height</div>
                <div className="mt-1 font-mono text-2xl font-semibold text-blue-400">
                  {recommendations.lineHeight}
                </div>
              </div>
              <div className="rounded-lg bg-zinc-800/50 p-4 text-center">
                <div className="text-xs text-zinc-500">Font Weight</div>
                <div className="mt-1 font-mono text-2xl font-semibold text-blue-400">
                  {recommendations.fontWeight}
                </div>
              </div>
              <div className="rounded-lg bg-zinc-800/50 p-4 text-center">
                <div className="text-xs text-zinc-500">Cursor Shape</div>
                <div className="mt-1 font-mono text-2xl font-semibold text-blue-400">
                  {recommendations.cursorShape}
                </div>
              </div>
            </div>
          </div>

          {/* Code Block */}
          <div className="code-block">
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
              <span className="text-sm text-zinc-500">
                ~/.config/zed/settings.json
              </span>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all ${
                  copied
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
              <code dangerouslySetInnerHTML={{ __html: formatCodeHtml(configString) }} />
            </pre>
          </div>

          {/* Font Recommendations */}
          {recommendations.fontRecommendations.length > 0 && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                <h3 className="font-medium text-amber-200">
                  Recommended Fonts for Astigmatism
                </h3>
              </div>
              <p className="mb-3 text-sm text-zinc-400">
                Zed doesn&apos;t support letter spacing directly. These fonts have
                naturally wider character spacing:
              </p>
              <ul className="space-y-1">
                {recommendations.fontRecommendations.map((font, i) => (
                  <li key={i} className="text-sm text-zinc-300">
                    • {font}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Theme Recommendations */}
          {recommendations.themeRecommendations.length > 0 && (
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-400" />
                <h3 className="font-medium text-purple-200">
                  Recommended Themes
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {recommendations.themeRecommendations.map((theme, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
                  >
                    <div className="font-medium text-zinc-100">{theme.name}</div>
                    <div className="text-sm text-zinc-500">{theme.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explanations */}
          {recommendations.explanations.length > 0 && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 font-medium text-zinc-100">
                Why these settings?
              </h3>
              <ul className="space-y-3">
                {recommendations.explanations.map((explanation, i) => (
                  <li
                    key={i}
                    className="border-b border-zinc-800 pb-3 text-sm text-zinc-400 last:border-0 last:pb-0"
                  >
                    {explanation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function formatCodeHtml(code: string): string {
  return code
    .replace(/\/\/.*/g, (match) => `<span class="code-comment">${match}</span>`)
    .replace(
      /"([^"]+)":/g,
      '<span class="code-key">"$1"</span>:'
    )
    .replace(
      /: "([^"]+)"/g,
      ': <span class="code-string">"$1"</span>'
    )
    .replace(
      /: (\d+\.?\d*)/g,
      ': <span class="code-value">$1</span>'
    )
    .replace(
      /: ({[^}]+})/g,
      ': <span class="code-value">$1</span>'
    )
}
