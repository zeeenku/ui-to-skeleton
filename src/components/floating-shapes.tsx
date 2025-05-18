export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left shape */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>

      {/* Top right shape */}
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow"></div>

      {/* Bottom left shape */}
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-fast"></div>

      {/* Center shape */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-float"></div>
    </div>
  )
}
