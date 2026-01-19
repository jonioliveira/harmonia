import {
  VisualConditions,
  ColorVisionDeficiency,
  Prescription,
  CurrentSettings,
  Recommendations,
  ZedConfig,
  ThemeRecommendation,
} from './types'

export function calculateRecommendations(
  conditions: VisualConditions,
  colorVision: ColorVisionDeficiency,
  prescription: Prescription,
  currentSettings: CurrentSettings
): Recommendations {
  let fontSize = Math.max(currentSettings.fontSize, 14)
  let lineHeight = currentSettings.lineHeight
  let fontWeight = currentSettings.fontWeight
  let cursorShape: 'bar' | 'block' | 'underline' = 'bar'
  let letterSpacing = 0

  const explanations: string[] = []
  const fontRecommendations: string[] = []
  const themeRecommendations: ThemeRecommendation[] = []

  // Parse prescription values
  const rightSph = parseFloat(prescription.rightSphere) || 0
  const leftSph = parseFloat(prescription.leftSphere) || 0
  const avgSphere = (rightSph + leftSph) / 2

  const rightCyl = parseFloat(prescription.rightCylinder) || 0
  const leftCyl = parseFloat(prescription.leftCylinder) || 0
  const avgCylinder = Math.abs((rightCyl + leftCyl) / 2)

  const rightAxis = parseFloat(prescription.rightAxis) || 0
  const leftAxis = parseFloat(prescription.leftAxis) || 0
  const hasAstigmatismFromRx = rightAxis > 0 || leftAxis > 0 || avgCylinder > 0

  // MYOPIA adjustments (negative sphere)
  if (conditions.myopia || avgSphere < -0.5) {
    const severity = Math.abs(Math.min(avgSphere, 0))
    
    if (severity >= 6) {
      fontSize = Math.max(fontSize, 22)
      explanations.push(
        `High myopia (${avgSphere.toFixed(2)}D): Font size increased to 22px to maintain comfortable reading distance without leaning forward`
      )
    } else if (severity >= 3) {
      fontSize = Math.max(fontSize, 19)
      explanations.push(
        `Moderate-high myopia (${avgSphere.toFixed(2)}D): Font size increased to 19px`
      )
    } else if (severity >= 1) {
      fontSize = Math.max(fontSize, 17)
      explanations.push(
        `Moderate myopia (${avgSphere.toFixed(2)}D): Font size set to 17px for comfortable viewing`
      )
    } else {
      fontSize = Math.max(fontSize, 16)
      explanations.push(
        `Mild myopia: Minimum font size of 16px recommended`
      )
    }
    
    cursorShape = 'block'
    explanations.push(
      `Block cursor enabled for easier tracking with myopia`
    )
  }

  // HYPEROPIA adjustments (positive sphere)
  if (conditions.hyperopia || avgSphere > 0.5) {
    const severity = Math.max(avgSphere, 0)
    
    if (severity >= 3) {
      fontSize = Math.max(fontSize, 20)
      explanations.push(
        `High hyperopia (+${avgSphere.toFixed(2)}D): Font size increased to 20px to reduce accommodation strain during near work`
      )
    } else if (severity >= 1.5) {
      fontSize = Math.max(fontSize, 18)
      explanations.push(
        `Moderate hyperopia (+${avgSphere.toFixed(2)}D): Font size set to 18px`
      )
    } else {
      fontSize = Math.max(fontSize, 17)
      explanations.push(
        `Mild hyperopia: Font size set to 17px for near-focus comfort`
      )
    }
    
    lineHeight = Math.max(lineHeight, 1.6)
    explanations.push(
      `Line height increased to 1.6 for better near-focus comfort with hyperopia`
    )
  }

  // ASTIGMATISM adjustments
  if (conditions.astigmatism || hasAstigmatismFromRx) {
    const severity = avgCylinder > 0 ? avgCylinder : 1
    
    if (severity >= 2) {
      letterSpacing = 0.6
      lineHeight = Math.max(lineHeight, 1.8)
      explanations.push(
        `High astigmatism (${severity.toFixed(2)}D cylinder): Letter spacing 0.6px and line height 1.8 to prevent character blur and ghosting`
      )
    } else if (severity >= 1) {
      letterSpacing = 0.4
      lineHeight = Math.max(lineHeight, 1.7)
      explanations.push(
        `Moderate astigmatism (${severity.toFixed(2)}D cylinder): Letter spacing 0.4px helps separate similar characters like c/e, r/n, 0/O`
      )
    } else {
      letterSpacing = 0.3
      lineHeight = Math.max(lineHeight, 1.6)
      explanations.push(
        `Astigmatism detected: Letter spacing 0.3px reduces character overlap`
      )
    }
    
    fontSize = Math.max(fontSize, 16)
    
    // Font recommendations for astigmatism
    fontRecommendations.push('IBM Plex Mono - excellent character distinction')
    fontRecommendations.push('JetBrains Mono - wider spacing, clear shapes')
    fontRecommendations.push('Fira Code - good default spacing')
    fontRecommendations.push('Input Mono - customizable width variants')
  }

  // EYE STRAIN adjustments
  if (conditions.eyeStrain) {
    fontSize = Math.max(fontSize, currentSettings.fontSize + 1)
    lineHeight = Math.max(lineHeight, 1.6)
    explanations.push(
      `Eye strain: +1px font size and line height ≥1.6 for "breathable" code that reduces scanning effort`
    )
  }

  // BLUR/GHOSTING adjustments
  if (conditions.blurGhosting) {
    fontSize = Math.max(fontSize, currentSettings.fontSize + 1)
    
    if (!conditions.lightSensitivity) {
      fontWeight = Math.max(fontWeight, 500)
      explanations.push(
        `Blur/Ghosting: Medium font weight (500) improves edge definition and reduces perceived double images`
      )
    }
    
    cursorShape = 'block'
    explanations.push(
      `Block cursor for better visibility when experiencing blur or ghosting effects`
    )
  }

  // LIGHT SENSITIVITY - override heavy weights
  if (conditions.lightSensitivity) {
    fontWeight = 400
    explanations.push(
      `Light sensitivity: Font weight kept at 400 (normal) to reduce perceived glare from heavier text. Consider using a dark theme.`
    )
    
    themeRecommendations.push({
      name: 'Solarized Dark',
      reason: 'Lower contrast, easier on sensitive eyes',
      zedName: 'Solarized Dark',
    })
    themeRecommendations.push({
      name: 'Gruvbox Dark',
      reason: 'Warm tones, reduced blue light',
      zedName: 'Gruvbox Dark',
    })
  }

  // VISUAL CROWDING adjustments
  if (conditions.visualCrowding) {
    letterSpacing = Math.max(letterSpacing, 0.5)
    lineHeight = Math.max(lineHeight, 1.7)
    explanations.push(
      `Visual crowding: Letter spacing ≥0.5px and line height ≥1.7 creates breathing room when dense code feels overwhelming`
    )
  }

  // COLOR VISION DEFICIENCY - Theme recommendations
  if (colorVision.type !== 'none') {
    switch (colorVision.type) {
      case 'deuteranopia':
        explanations.push(
          `Deuteranopia (green-blind): Recommending themes that avoid red/green distinction for syntax highlighting`
        )
        themeRecommendations.push({
          name: 'Solarized Dark',
          reason: 'Uses blue/yellow contrast instead of red/green',
          zedName: 'Solarized Dark',
        })
        themeRecommendations.push({
          name: 'One Dark',
          reason: 'Good blue/orange/purple separation',
          zedName: 'One Dark',
        })
        themeRecommendations.push({
          name: 'GitHub Dark',
          reason: 'Distinct hues beyond red/green spectrum',
          zedName: 'GitHub Dark',
        })
        themeRecommendations.push({
          name: 'Catppuccin Macchiato',
          reason: 'High contrast with colorblind-friendly palette',
          zedName: 'Catppuccin Macchiato',
        })
        break
        
      case 'protanopia':
        explanations.push(
          `Protanopia (red-blind): Recommending themes with strong blue/yellow contrast`
        )
        themeRecommendations.push({
          name: 'Solarized Dark',
          reason: 'Designed with colorblind users in mind',
          zedName: 'Solarized Dark',
        })
        themeRecommendations.push({
          name: 'Nord',
          reason: 'Cool blue tones, minimal red reliance',
          zedName: 'Nord',
        })
        break
        
      case 'tritanopia':
        explanations.push(
          `Tritanopia (blue-blind): Recommending themes with strong red/green contrast`
        )
        themeRecommendations.push({
          name: 'Monokai',
          reason: 'Strong warm colors, less blue dependency',
          zedName: 'Monokai',
        })
        themeRecommendations.push({
          name: 'Dracula',
          reason: 'Pink/green/orange palette',
          zedName: 'Dracula',
        })
        break
        
      case 'achromatopsia':
        explanations.push(
          `Achromatopsia (complete color blindness): Recommending high-contrast themes that work in grayscale`
        )
        themeRecommendations.push({
          name: 'High Contrast',
          reason: 'Maximum contrast, works without color',
          zedName: 'Ayu Dark',
        })
        break
    }
  }

  return {
    fontSize: Math.round(fontSize),
    lineHeight: Math.round(lineHeight * 10) / 10,
    fontWeight,
    cursorShape,
    letterSpacing,
    explanations,
    fontRecommendations,
    themeRecommendations,
  }
}

export function generateZedConfig(recommendations: Recommendations): ZedConfig {
  const config: ZedConfig = {
    buffer_font_size: recommendations.fontSize,
    buffer_line_height:
      recommendations.lineHeight === 1.5
        ? 'comfortable'
        : { custom: recommendations.lineHeight },
    buffer_font_weight: recommendations.fontWeight,
    cursor_shape: recommendations.cursorShape,
  }

  if (recommendations.fontRecommendations.length > 0) {
    // Suggest the first font recommendation
    const firstFont = recommendations.fontRecommendations[0].split(' - ')[0]
    config.buffer_font_family = firstFont
  }

  if (recommendations.themeRecommendations.length > 0) {
    config.theme = recommendations.themeRecommendations[0].zedName
  }

  return config
}

export function formatZedConfigString(
  config: ZedConfig,
  recommendations: Recommendations
): string {
  const lines: string[] = []
  
  lines.push('// Add to ~/.config/zed/settings.json')
  
  if (recommendations.letterSpacing > 0) {
    lines.push('')
    lines.push(`// Note: Zed doesn't support letter_spacing (would need ${recommendations.letterSpacing}px)`)
    lines.push('// Consider using a font with wider character spacing:')
    recommendations.fontRecommendations.slice(0, 3).forEach((font) => {
      lines.push(`//   • ${font}`)
    })
  }
  
  lines.push('')
  lines.push('{')
  lines.push(`  "buffer_font_size": ${config.buffer_font_size},`)
  
  const lineHeightValue =
    typeof config.buffer_line_height === 'string'
      ? `"${config.buffer_line_height}"`
      : JSON.stringify(config.buffer_line_height)
  lines.push(`  "buffer_line_height": ${lineHeightValue},`)
  
  lines.push(`  "buffer_font_weight": ${config.buffer_font_weight},`)
  lines.push(`  "cursor_shape": "${config.cursor_shape}"`)
  
  if (config.buffer_font_family) {
    lines[lines.length - 1] += ','
    lines.push(`  "buffer_font_family": "${config.buffer_font_family}"`)
  }
  
  if (config.theme) {
    lines[lines.length - 1] += ','
    lines.push(`  "theme": "${config.theme}"`)
  }
  
  lines.push('}')
  
  return lines.join('\n')
}
