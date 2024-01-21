import {FC} from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {FullProduct} from "@/types/product";

interface QuestionsProps {
    questions: FullProduct['questions']
}

const Questions: FC<QuestionsProps> = ({questions}) => {
    if (!questions?.length) return;
    const productQuestions = questions.filter(item => item.productId)
    const generalQuestions = questions.filter(item => !item.productId)
    return (
        <div className='pt-4 max-w-[1100px]'>
            <Accordion type="single" collapsible className="w-full">
                {
                    productQuestions.map(question => (
                        <AccordionItem value={`item-${question.id}`}>
                            <AccordionTrigger className='font-norms font-bold text-base md:text-xl text-left'>
                                {question.question}
                            </AccordionTrigger>
                            <AccordionContent className="font-norms text-base">
                                {question.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                    
                }
                {
                    generalQuestions.map(question => (
                        <AccordionItem value={`item-${question.id}`}>
                            <AccordionTrigger className='font-norms font-bold text-base md:text-xl text-left'>
                                {question.question}
                            </AccordionTrigger>
                            <AccordionContent className="font-norms text-base">
                                {question.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                    
                }
            </Accordion>
        </div>
    )
}

export default Questions