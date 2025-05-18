import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  quote: string
  rating: number
  imageSrc: string
}

export default function TestimonialCard({ name, role, company, quote, rating, imageSrc }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-cyan-100 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-cyan-200">
          <Image src={imageSrc || "/placeholder.svg"} alt={name} width={48} height={48} className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-slate-800">{name}</p>
          <p className="text-sm text-slate-500">
            {role}, {company}
          </p>
        </div>
      </div>
      <div className="flex mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-slate-600 italic">&ldquo;{quote}&rdquo;</p>
    </div>
  )
}
