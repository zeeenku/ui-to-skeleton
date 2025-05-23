import { Button } from "../../../components/ui/button";
import Link from "next/link"
import Image from "next/image" 
export function Footer(){
    return (
    <footer className="border-t w-full px-4 lg:px-16 py-12 mt-5 bg-white relative z-10">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="./logo.svg" width={24} height={24} alt="UI to Skeleton Demo" className="h-6 w-6 text-cyan-500" />
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                  UI to Skeleton
                </span>
              </div>
              <p className="text-slate-500 max-w-md mb-4">
                An open-source tool to help developers create beautiful skeleton loaders for their UI components.
              </p>
              <div className="flex gap-4 mb-6">
                <Link
                  href="https://x.com/_zenku__"
                  target="_blank"
                  className="text-slate-400 hover:text-cyan-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/zeeenku"
                  target="_blank"
                  className="text-slate-400 hover:text-cyan-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Link>
                <Link
                  href="https://discord.com/users/_zenku__"
                  target="_blank"
                  className="text-slate-400 hover:text-cyan-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </Link>
              </div>
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} UI to Skeleton. All rights reserved.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/studio" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Skeleton Studio
                  </Link>
                </li>
                 <li>
                  <Link href="/" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Faq
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://github.com/zeeenku/ui-to-skeleton/issues/new" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Report an Issue
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-use" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Terms of use
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 sm:gap-2 sm:text-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-cyan-200">
                    <Image
                    src="/dev/small.jpg"
                    alt="Developer"
                    width={48}
                    height={48}
                    className="object-cover"
                    />
                </div>
                <div className="sm:text-start">
                    <p className="font-medium text-slate-800 text-sm sm:text-base">
                    made <Link className="underline" href="https://dev.zeenku.com">@zeenku</Link>  by Zakariaa Enajjachi 
                    </p>
                    <p className="text-xs text-slate-500 sm:text-sm">Fullstack Developer</p>
                </div>
            </div>
            <div className="mt-4 md:mt-0">
                <Button
                    asChild
                    variant="outline"
                    className="border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                    >
                    <a
                        href="mailto:enajjachi.zakariaa@gmail.com?subject=New%20Project%20Inquiry&body=Hi%20there%2C%0A%0AI%27d%20like%20to%20discuss%20a%20new%20project%20with%20you.%20Here%20are%20some%20details%3A%0A%0A%5BAdd%20your%20project%20details%20here%5D%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contact Developer
                    </a>
                </Button>
            </div>
          </div>
        </div>
      </footer>
    );
}