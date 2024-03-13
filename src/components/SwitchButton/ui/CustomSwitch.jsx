"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils";


const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "yespeer yesinline-flex yesh-5 yesw-9 yesshrink-0 yescursor-pointer yesitems-center yesrounded-full yesborder-2 yesborder-transparent yesshadow-sm yestransition-colors focus-visible:yesoutline-none focus-visible:yesring-2 focus-visible:yesring-slate-950 focus-visible:yesring-offset-2 focus-visible:yesring-offset-white disabled:yescursor-not-allowed disabled:yesopacity-50 data-[state=checked]:yesbg-slate-900 data-[state=unchecked]:yesbg-slate-200 dark:focus-visible:yesring-slate-300 dark:focus-visible:yesring-offset-slate-950 dark:data-[state=checked]:yesbg-slate-50 dark:data-[state=unchecked]:yesbg-slate-800",
      className
    )}
    {...props}
    ref={ref}>
    <SwitchPrimitives.Thumb
      className={cn(
        "yespointer-events-none yesblock yesh-4 yesw-4 yesrounded-full yesbg-white yesshadow-lg yesring-0 yestransition-transform data-[state=checked]:yestranslate-x-4 data-[state=unchecked]:yestranslate-x-0 dark:yesbg-slate-950"
      )} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { CustomSwitch }
