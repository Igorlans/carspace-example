import {ReactNode} from "react";

const ParagraphTitle = ({ text }: {text: string | ReactNode}) => {
  return (
    <div style={{backgroundColor: '#F8F9FF'}} className="border-customSecondary w-fit">
      <h2 className="font-bold font-norms text-customPrimary uppercase md:text-2xl mb-5 text-lg p-2.5">{text}</h2>
    </div>
  );
};

export default ParagraphTitle;
