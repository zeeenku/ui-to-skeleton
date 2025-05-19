"use client"

import { Facebook, Link, Twitter, MessageCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useSkeletonStore } from "@/lib/store"
import { useState } from "react"

export default function ShareDialog() {
  const { shareDialogOpen, setShareDialogOpen, setShowToast } = useSkeletonStore()
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setShowToast(true, "Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const text = "Check out this awesome skeleton loader generator tool! #UItoSkeleton #WebDev"
    const url = window.location.href
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
    setShareDialogOpen(false)
  }

  const shareOnFacebook = () => {
    const url = window.location.href
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
    setShareDialogOpen(false)
  }

  const shareOnReddit = () => {
    const title = "UI to Skeleton - Generate Skeleton Loaders from UI Components"
    const url = window.location.href
    window.open(
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      "_blank",
    )
    setShareDialogOpen(false)
  }

  const shareOnWhatsApp = () => {
    const text = "Check out this awesome skeleton loader generator tool!"
    const url = window.location.href
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank")
    setShareDialogOpen(false)
  }

  return (
    <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share UI to Skeleton</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-center py-6 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                onClick={shareOnTwitter}
              >
                <Twitter className="h-5 w-5 text-blue-500" />
                <span>Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-center py-6 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-200"
                onClick={shareOnFacebook}
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                <span>Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-center py-6 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                onClick={shareOnReddit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-orange-500"
                  fill="currentColor"
                >
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
                <span>Reddit</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 justify-center py-6 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                onClick={shareOnWhatsApp}
              >
                <MessageCircle className="h-5 w-5 text-green-500" />
                <span>WhatsApp</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex-1 flex items-center gap-2 justify-center"
                onClick={handleCopyLink}
              >
                <Link className="h-4 w-4" />
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
