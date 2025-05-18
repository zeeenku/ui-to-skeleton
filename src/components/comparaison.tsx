import { Check as CheckIcon, X as XIcon } from "lucide-react";

export function Comparaison() {
  return (
    <>
      <div className="w-full lg:px-16 max-w-6xl mx-auto px-4 relative">
        <div className="bg-white p-8 rounded-xl border border-cyan-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Say Goodbye to Ugly Loaders</h2>
          <p className="text-slate-600 text-lg mb-4">
            No more spinning wheels or bouncing dots. Create beautiful, content-aware skeleton loaders that
            enhance your user experience in moments, not hours.
          </p>

          {/* Grouped flex container */}
          <div className="flex flex-wrap ">
            <div className="flex-col flex w-full md:w-1/2 mt-6 gap-6">
            {/* ❌ XIcon items */}
            {[
              {
                title: "Ugly Spinners",
                description: "Generic loaders that don't match your UI"
              },
              {
                title: "Hours of Coding",
                description: "Wasting time on loading states"
              },
              {
                title: "Design Flaws",
                description: "No visual context, slow performance, and high bounce rate."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 bg-red-100 rounded-full p-1">
                  <XIcon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
            </div>
                        <div className="flex-col flex w-full md:w-1/2 mt-6 gap-6">

            {/* ✅ CheckIcon items */}
            {[
              {
                title: "Beautiful Skeletons",
                description: "Content-aware loaders that match your design"
              },
              {
                title: "Moments to Generate",
                description: "Create loaders in seconds, not hours"
              },
              {
                title: "Better UX",
                description: "Branded look and reduced cognitive load."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 rounded-full p-1">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
