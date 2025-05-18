import Image from "next/image" 


export default function SupportedTools() {
  return (
    <div className="py-8">
      <h3 className="text-center text-slate-500 text-sm uppercase tracking-wider mb-6">
        Works with your favorite tools
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {/* React */}
        <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
         <Image src="/tools/react.png" alt="react logo" width={40} height={40} className="w-8 md:w-10" />
        </div>
        {/* Tailwind */}
        <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
         <Image src="/tools/tailwind.png" alt="tailwind logo" width={40} height={40} className="w-8 md:w-10" />
        </div>
        {/* Ts */}
        <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
         <Image src="/tools/ts.png" alt="ts logo" width={40} height={40} className="w-7 md:w-9" />
        </div>
        {/* Js */}
        <div className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
         <Image src="/tools/js.png" alt="js logo" width={40} height={40} className="w-7 md:w-9" />
        </div>
      </div>
    </div>
  )
}
