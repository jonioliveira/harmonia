import Calibrator from "@/components/Calibrator";
import { Eye, Github, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-400">
              <Eye className="h-4 w-4" />
              <span>Ergonomic Editor Calibration</span>
            </div>

            <h1 className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Harmonia Vision
              <span className="block text-blue-400">for developers</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Personalized editor settings for visual comfort. Whether you have
              myopia, astigmatism, or color vision deficiency, this tool
              provides recommendations to reduce eye strain during long coding
              sessions.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Privacy-first: all calculations run locally
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Based on optometry research
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <Calibrator />
      </div>

      {/* Info Sections */}
      <section className="border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-semibold text-zinc-100">
            How It Works
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <span className="text-lg font-bold">1</span>
              </div>
              <h3 className="mb-2 font-medium text-zinc-100">
                Select Conditions
              </h3>
              <p className="text-sm text-zinc-400">
                Choose the visual conditions that affect you. Each condition
                triggers specific adjustments based on optometry research.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <span className="text-lg font-bold">2</span>
              </div>
              <h3 className="mb-2 font-medium text-zinc-100">
                Add Prescription (Optional)
              </h3>
              <p className="text-sm text-zinc-400">
                Enter your glasses prescription for more precise
                recommendations. Values are processed locally and never stored.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <span className="text-lg font-bold">3</span>
              </div>
              <h3 className="mb-2 font-medium text-zinc-100">
                Copy to Zed Config
              </h3>
              <p className="text-sm text-zinc-400">
                Get a ready-to-use JSON snippet for your Zed settings file.
                Includes font and theme recommendations where applicable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Explained */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-semibold text-zinc-100">
            Understanding the Adjustments
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 p-6">
              <h3 className="mb-2 font-medium text-zinc-100">
                Myopia (Nearsightedness)
              </h3>
              <p className="text-sm text-zinc-400">
                Increases font size (16-22px based on severity) and enables
                block cursor. Larger text reduces the need to lean toward the
                screen and decreases ciliary muscle strain.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-6">
              <h3 className="mb-2 font-medium text-zinc-100">Astigmatism</h3>
              <p className="text-sm text-zinc-400">
                Increases letter spacing (0.2-0.6px) to separate characters.
                Astigmatism causes characters to blur together, especially
                similar shapes like c/e, r/n, 0/O.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-6">
              <h3 className="mb-2 font-medium text-zinc-100">
                Eye Strain / Fatigue
              </h3>
              <p className="text-sm text-zinc-400">
                Adds +1px to font size and ensures line height is at least 1.6x.
                Adequate spacing between lines reduces scanning effort during
                long sessions.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-6">
              <h3 className="mb-2 font-medium text-zinc-100">
                Light Sensitivity
              </h3>
              <p className="text-sm text-zinc-400">
                Keeps font weight at 400 (normal), overriding heavier
                recommendations. Heavier fonts appear brighter and can cause
                discomfort.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-6">
              <h3 className="mb-2 font-medium text-zinc-100">
                Color Vision Deficiency
              </h3>
              <p className="text-sm text-zinc-400">
                Recommends themes with appropriate color contrast for your
                specific type. Deuteranopia users benefit from blue/yellow
                themes like Solarized.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 p-6">
              <h3 className="mb-2 font-medium text-zinc-100">
                Visual Crowding
              </h3>
              <p className="text-sm text-zinc-400">
                Increases letter spacing to at least 0.5px and line height for
                better separation. Creates visual breathing room when dense code
                feels overwhelming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-zinc-800 bg-amber-500/5">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <p className="text-center text-sm text-amber-200/80">
            <strong>Important:</strong> This tool is designed to improve visual
            comfort while coding. It is not a substitute for professional eye
            care. If you experience persistent eye strain, headaches, or vision
            problems, please consult an optometrist or ophthalmologist.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-500">
              Based on{" "}
              <a
                href="https://github.com/AgusRdz/harmonia-vision"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 underline underline-offset-4 hover:text-zinc-300"
              >
                Harmonia Vision
              </a>{" "}
              by AgusRdz
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/jonifreeman/harmonia-zed"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300"
              >
                <Github className="h-4 w-4" />
                Source
              </a>
              <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                Made with <Heart className="h-3 w-3 text-red-500" /> for
                developers with glasses
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
