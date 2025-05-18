import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export default function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-cyan-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-cyan-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}
