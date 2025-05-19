'use client'

import { useState } from "react"
import { Facebook, Link, Twitter, MessageCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onToast?: (message: string) => void
}

export default function ShareDialog({ open, onOpenChange, onToast }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    onToast?.("Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const text = "Check out this awesome skeleton loader generator tool! #UItoSkeleton #WebDev"
    const url = window.location.href
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank")
    onOpenChange(false)
  }

  const shareOnFacebook = () => {
    const url = window.location.href
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
    onOpenChange(false)
  }

  const shareOnReddit = () => {
    const title = "UI to Skeleton - Generate Skeleton Loaders from UI Components"
    const url = window.location.href
    window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, "_blank")
    onOpenChange(false)
  }

  const shareOnWhatsApp = () => {
    const text = "Check out this awesome skeleton loader generator tool!"
    const url = window.location.href
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  <path d="..." />
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
                className="flex-1 flex items-center gap-2 h-12 justify-center"
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
