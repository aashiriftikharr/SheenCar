import * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleTabsProps {
  options: string[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function ToggleTabs({
  options,
  value,
  onValueChange,
  className,
}: ToggleTabsProps) {
  return (
    <div
      className={cn(
        "flex w-[331px] sm:w-[433.45px] h-[42px] sm:h-[55px] gap-[10px] sm:gap-[13.1px] rounded-[8px] sm:rounded-[10.48px] p-[4px] sm:p-[5.24px] bg-[#EEEEEE]",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onValueChange(option)}
          className={cn(
            "flex-1 font-poppins text-[14px] leading-[100%] text-center",
            value === option
              ? "bg-[#003A2F] text-[#EEEEEE] border border-[#003A2F] rounded-[6px] sm:rounded-[7.86px] w-[98px] sm:w-[128.33px] h-[34px] sm:h-[44.52px]"
              : "text-[#171616]"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
