import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  ctaText: string
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  ctaText,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-xl ${isPopular ? "border-2 border-cyan-500 shadow-lg shadow-cyan-100" : "border border-slate-200 shadow-md"} bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-slate-500">/month</span>}
      </div>
      <p className="text-slate-600 mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${isPopular ? "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/20" : "bg-white border border-cyan-500 text-cyan-700 hover:bg-cyan-50"}`}
      >
        {ctaText}
      </Button>
    </div>
  )
}
