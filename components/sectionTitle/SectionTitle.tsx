import { FC } from 'react'

interface SectionTitleProps {
    align?: "left" | "center" | "right"
    className?: string;
    children: React.ReactNode
}

const SectionTitle: FC<SectionTitleProps> = ({ children, className, align = "center" }) => {
  return (
    <h2 className={`section-title font-dela text-xl md:text-3xl text-customPrimary uppercase w-full pb-4 md:pb-6 ${className}`}
    >
        { children }
    </h2>
  )
}

export default SectionTitle