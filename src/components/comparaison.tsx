import { Check as CheckIcon, X as XIcon, Zap, Palette, Code } from "lucide-react";
import FeatureCard from "./feature-card";

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

      {/* Features Section */}
      <div className="container px-4" id="features">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">Powerful Features</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need to create beautiful skeleton loaders for your applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Fast and Effective"
            description="Generate skeleton loaders in seconds. Focus on building features, not loading states."
            icon={Zap}
          />
          <FeatureCard
            title="Customizable Results"
            description="Tailor your skeletons to match your brand and design system for a more polished loading experience."
            icon={Palette}
          />
          <FeatureCard
            title="Developer Friendly"
            description="Fast and simple, just copy and use in your project, made by developers for developers."
            icon={Code}
          />
        </div>
      </div>
    </>
  );
}
