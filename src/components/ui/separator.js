

import * as React from "react"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef(function Separator(props, ref) {
  const { className, ...rest } = props

  return (
    <div
      ref={ref}
      className={cn("shrink-0 bg-border h-[1px] w-full", className)}
      {...rest}
    />
  )
})

Separator.displayName = "Separator"

export { Separator }
