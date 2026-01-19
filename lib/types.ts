export interface VisualConditions {
  myopia: boolean
  hyperopia: boolean
  astigmatism: boolean
  eyeStrain: boolean
  blurGhosting: boolean
  lightSensitivity: boolean
  visualCrowding: boolean
}

export interface ColorVisionDeficiency {
  type: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'achromatopsia'
}

export interface Prescription {
  rightSphere: string
  rightCylinder: string
  rightAxis: string
  leftSphere: string
  leftCylinder: string
  leftAxis: string
}

export interface CurrentSettings {
  fontSize: number
  lineHeight: number
  fontWeight: number
}

export interface Recommendations {
  fontSize: number
  lineHeight: number
  fontWeight: number
  cursorShape: 'bar' | 'block' | 'underline'
  letterSpacing: number
  explanations: string[]
  fontRecommendations: string[]
  themeRecommendations: ThemeRecommendation[]
}

export interface ThemeRecommendation {
  name: string
  reason: string
  zedName: string
}

export interface ZedConfig {
  buffer_font_size: number
  buffer_line_height: string | { custom: number }
  buffer_font_weight: number
  cursor_shape: string
  buffer_font_family?: string
  theme?: string
}

export interface ConditionInfo {
  key: keyof VisualConditions
  label: string
  description: string
  icon: string
}

export interface ColorVisionInfo {
  type: ColorVisionDeficiency['type']
  label: string
  description: string
}
