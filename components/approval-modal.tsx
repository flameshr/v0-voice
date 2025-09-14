"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, X, Mail } from "lucide-react"

interface ApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  onApprove: () => void
  onReject: () => void
  action: string
  details: string
  data: any
}

export function ApprovalModal({ isOpen, onClose, onApprove, onReject, action, details, data }: ApprovalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-primary" />
            <span>Approve {action}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{details}</p>

          {data && (
            <Card className="p-4 bg-muted/50">
              <div className="space-y-2 text-sm">
                <div>
                  <strong>To:</strong> {data.to}
                </div>
                <div>
                  <strong>Subject:</strong> {data.subject}
                </div>
                <div className="pt-2">
                  <strong>Message:</strong>
                  <div className="mt-1 p-2 bg-background rounded text-xs leading-relaxed whitespace-pre-wrap">
                    {data.body}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onReject} className="flex items-center space-x-2 bg-transparent">
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </Button>
          <Button onClick={onApprove} className="flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <span>Send Email</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
