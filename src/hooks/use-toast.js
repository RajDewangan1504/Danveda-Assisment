

import * as React from "react"
import { Toast, ToastTitle, ToastDescription } from "@/components/ui/toast"

const ToastContext = React.createContext(undefined)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([])

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = React.useCallback(
    (toast) => {
      const id = Date.now().toString()
      const newToast = { ...toast, id }
      setToasts((prev) => [...prev, newToast])

      // Auto-remove toast after duration
      const duration = toast.duration ?? 5000
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 m-4 flex max-h-screen w-full max-w-sm flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              variant={toast.variant}
              onClose={() => removeToast(toast.id)}
            >
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </Toast>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
