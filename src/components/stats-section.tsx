export default function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      <div className="bg-white rounded-xl border border-cyan-100 p-6 text-center shadow-md hover:shadow-lg transition-shadow">
        <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">10k+</div>
        <p className="text-slate-600 text-sm">Skeletons Generated</p>
      </div>
      <div className="bg-white rounded-xl border border-cyan-100 p-6 text-center shadow-md hover:shadow-lg transition-shadow">
        <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">5k+</div>
        <p className="text-slate-600 text-sm">Happy Developers</p>
      </div>
      <div className="bg-white rounded-xl border border-cyan-100 p-6 text-center shadow-md hover:shadow-lg transition-shadow">
        <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">98%</div>
        <p className="text-slate-600 text-sm">Satisfaction Rate</p>
      </div>
      <div className="bg-white rounded-xl border border-cyan-100 p-6 text-center shadow-md hover:shadow-lg transition-shadow">
        <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24/7</div>
        <p className="text-slate-600 text-sm">Developer Support</p>
      </div>
    </div>
  )
}
