# Harmonia Vision for Zed

Ergonomic Zed editor calibrator for visual comfort, readability, and reduced eye strain. A port of [Harmonia Vision](https://github.com/AgusRdz/harmonia-vision) by AgusRdz for the Zed editor.

## Features

- **Visual Profile Assessment** - Select conditions that affect your vision (myopia, astigmatism, eye strain, light sensitivity, etc.)
- **Optional Prescription Input** - Enter your glasses prescription (Sphere/Cylinder/Axis) for more accurate recommendations
- **Color Vision Deficiency Support** - Includes deuteranopia, protanopia, tritanopia, and achromatopsia with theme recommendations
- **Smart Recommendations** - Get personalized Zed settings based on your visual profile
- **Privacy-First** - All calculations run locally in your browser, no data is stored or transmitted

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/harmonia-zed.git
cd harmonia-zed

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/harmonia-zed)

## Settings Adjusted

Harmonia Vision for Zed can recommend the following settings:

| Setting | Description | Range |
|---------|-------------|-------|
| `buffer_font_size` | Font size in pixels | 14-22px |
| `buffer_line_height` | Line height | comfortable to 1.8x |
| `buffer_font_weight` | Font weight | 400-500 |
| `cursor_shape` | Cursor shape | bar, block, underline |
| `buffer_font_family` | Recommended font | Based on conditions |
| `theme` | Color theme | Based on color vision |

### Zed Limitations

Zed doesn't currently support:
- `letter_spacing` - Workaround: use fonts with naturally wider spacing (IBM Plex Mono, JetBrains Mono)

## How the Algorithm Works

### Myopia (Nearsightedness)
- Increases font size based on sphere value severity (16-22px)
- Enables block cursor for easier tracking

### Hyperopia (Farsightedness)
- Increases font size for near-work comfort (17-20px)
- Increases line height for better focus

### Astigmatism
- Recommends fonts with wider character spacing
- Increases line height to prevent line blur

### Eye Strain
- Adds +1px to baseline font size
- Ensures line height ≥1.6 for "breathable" code

### Light Sensitivity
- Keeps font weight at 400 to reduce glare
- Recommends dark themes

### Color Vision Deficiency
- Deuteranopia/Protanopia: Recommends blue/yellow themes (Solarized)
- Tritanopia: Recommends red/green themes (Monokai)
- Achromatopsia: Recommends high-contrast themes

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Credits

- Original [Harmonia Vision](https://github.com/AgusRdz/harmonia-vision) by [AgusRdz](https://github.com/AgusRdz)
- Algorithm based on optometry research and real-world comfort profiles

## License

MIT License - see [LICENSE](LICENSE) for details.

## Disclaimer

This tool is designed to improve visual comfort while coding. It is **NOT** a substitute for professional eye care. If you experience persistent eye strain, headaches, or vision problems, please consult an optometrist or ophthalmologist.
