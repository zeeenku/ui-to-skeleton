import FeatureCard from "./feature-card";
import { Zap, Palette, Code } from "lucide-react";

export function Features(){
    return (
        <div className="px-4 max-w-6xl lg:px-16" id="features">
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
    );
}