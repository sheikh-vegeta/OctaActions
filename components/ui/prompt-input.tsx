"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface PromptInputProps {
  isLoading?: boolean
  value: string
  onValueChange: (value: string) => void
  maxHeight?: number | string
  onSubmit?: () => void
  children?: React.ReactNode
  className?: string
}

interface PromptInputTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  disableAutosize?: boolean
  className?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
}

interface PromptInputActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

interface PromptInputActionProps {
  tooltip?: React.ReactNode
  children?: React.ReactNode
  className?: string
  side?: "top" | "bottom" | "left" | "right"
  disabled?: boolean
}

const PromptInputContext = React.createContext<{
  isLoading: boolean
  value: string
  onValueChange: (value: string) => void
  textareaRef: React.RefObject<HTMLTextAreaElement>
  handleSubmit: () => void
}>({} as any)

const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  ({
    isLoading = false,
    value,
    onValueChange,
    maxHeight = 240,
    onSubmit,
    children,
    className,
    ...props
  }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const handleSubmit = React.useCallback(() => {
      if (onSubmit) {
        onSubmit()
      }
    }, [onSubmit])

    return (
      <PromptInputContext.Provider
        value={{
          isLoading,
          value,
          onValueChange,
          textareaRef,
          handleSubmit,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "relative flex w-full flex-col overflow-hidden rounded-lg border bg-background p-1.5",
            className
          )}
          {...props}
        >
          <div
            className="scrollbar-thumb-rounded-md flex max-h-[--prompt-input-max-height] w-full flex-1 flex-col overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
            style={{ "--prompt-input-max-height": `${maxHeight}px` } as React.CSSProperties}
          >
            {children}
          </div>
        </div>
      </PromptInputContext.Provider>
    )
  }
)
PromptInput.displayName = "PromptInput"

const PromptInputTextarea = React.forwardRef<
  HTMLTextAreaElement,
  PromptInputTextareaProps
>(({ disableAutosize, className, onKeyDown, disabled = false, ...props }, ref) => {
  const { isLoading, value, onValueChange, textareaRef, handleSubmit } = React.useContext(PromptInputContext)

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onValueChange(e.target.value)
  }

  React.useEffect(() => {
    if (textareaRef.current && !disableAutosize) {
      textareaRef.current.style.height = "0"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value, disableAutosize])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }

    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  return (
    <textarea
      ref={ref || textareaRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={isLoading || disabled}
      className={cn(
        "resize-none bg-transparent px-2 py-2.5 outline-none placeholder:text-muted-foreground/60 disabled:opacity-50",
        disableAutosize ? "h-auto" : "absolute inset-0 w-full",
        className
      )}
      {...props}
    />
  )
})
PromptInputTextarea.displayName = "PromptInputTextarea"

const PromptInputActions = React.forwardRef<
  HTMLDivElement,
  PromptInputActionsProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex select-none flex-wrap items-center justify-between gap-1.5 px-1.5 pb-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
PromptInputActions.displayName = "PromptInputActions"

const PromptInputAction = ({
  tooltip,
  children,
  className,
  side = "top",
  disabled = false,
  ...props
}: PromptInputActionProps) => {
  const { isLoading } = React.useContext(PromptInputContext)

  if (!tooltip) {
    return <>{children}</>
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100} {...props}>
        <TooltipTrigger asChild disabled={isLoading || disabled}>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} className={cn("max-w-[260px] text-xs", className)}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
PromptInputAction.displayName = "PromptInputAction"

const PromptInputSubmit = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, disabled, ...props }, ref) => {
  const { isLoading, value, handleSubmit } = React.useContext(PromptInputContext)

  return (
    <Button
      ref={ref}
      size="icon"
      disabled={isLoading || disabled || !value.trim()}
      onClick={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className={cn("h-8 w-8 shrink-0", className)}
      {...props}
    >
      {children}
    </Button>
  )
})
PromptInputSubmit.displayName = "PromptInputSubmit"

export { PromptInput, PromptInputTextarea, PromptInputActions, PromptInputAction, PromptInputSubmit }
