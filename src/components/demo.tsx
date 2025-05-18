import DemoAnimation from "./demo-animation";

export function Demo(){
    return (
        <div className="w-full max-w-6xl mx-auto px-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-20 blur-xl rounded-xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-cyan-100 p-6">
                  <div className="absolute top-3 right-3 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                    Live Demo
                  </div>
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">See it in action</h3>
                  <div className="mt-2">
                    <DemoAnimation />
                  </div>
                </div>
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-cyan-100 p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-slate-800">How it works</h3>
                      <ol className="space-y-3 text-left text-slate-600">
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
                            1
                          </span>
                          <span>Paste your UI component code</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
                            2
                          </span>
                          <span>Customize skeleton appearance</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
                            3
                          </span>
                          <span>Generate your skeleton loader</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
                            4
                          </span>
                          <span>Copy the code and use it in your project</span>
                        </li>
                      </ol>
                    </div>
                    <div className="mt-6">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="UI to Skeleton Demo"
                        className="w-full h-auto rounded-md border border-slate-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
}