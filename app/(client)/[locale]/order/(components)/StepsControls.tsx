"use client"

import { FC } from 'react'

import type { activeStepType } from './Steps'
import { ActiveStep } from './Steps'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import "./style.css"

interface StepsControlsProps {
    activeStep: activeStepType;
    setActiveStep: (step: activeStepType) => void;
    isFormValid: boolean
}

const StepsControls: FC<StepsControlsProps> = ({ activeStep, setActiveStep, isFormValid }) => {
    const stepStyle = 
          activeStep === ActiveStep.data ? "data--active" :
          activeStep === ActiveStep.done ? "done--active" : "";
    const t = useTranslations("steps")
    return (
      <div className={cn('steps-wrpper flex items-center justify-between md:max-w-[50%] mx-auto font-norms', stepStyle )}>
          <div className='flex flex-col items-center font-bold cursor-pointer  '
            onClick={() => setActiveStep(ActiveStep.product)}
          >
              <div className={cn("w-11 h-11 flex flex-col items-center justify-center text-center rounded-full text-white", activeStep === ActiveStep.product || activeStep === ActiveStep.data || activeStep === ActiveStep.done ? "bg-customPrimary" : "bg-lightGray")}>
                1
              </div>
              <div className='text-xs md:text-base'>{t("products")}</div>
          </div>
          <div className='flex flex-col items-center font-bold cursor-pointer  '
            onClick={() => setActiveStep(ActiveStep.data)}
          >
              <div className={cn("w-11 h-11 flex flex-col items-center justify-center text-center rounded-full text-white", activeStep === ActiveStep.data || activeStep === ActiveStep.done ? "bg-customPrimary" : "bg-lightGray")}>
                2
              </div>
              <div className='text-xs md:text-base text-center'>{t("yourData")}</div>
          </div>
          <div className='flex flex-col items-center font-bold cursor-pointer'
          style={{cursor: isFormValid ? "pointer" : "default"}}
            onClick={() => {
              if (!isFormValid) return
              setActiveStep(ActiveStep.done)
            }}
          >
              <div className={cn("w-11 h-11 flex flex-col items-center justify-center text-center rounded-full text-white", activeStep === ActiveStep.done ? "bg-customPrimary" : "bg-lightGray")}>
                3
              </div>
              <div className='text-xs md:text-base text-center'>{t("orderDone")}</div>
          </div>
      </div>
    )
}

export default StepsControls