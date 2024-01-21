import {ReactNode} from "react";

const PageTitle = ({ title }: {title: string | ReactNode}) => {
  return (
    <div className="md:my-[50px] mb-[30px]">
      <h2
        className="justify-self-end font-dela text-xl md:text-3xl text-customPrimary uppercase mb-3"
      >
        {title}
      </h2>
      <div className="bg-white border-b-[1px] border-[#2C334A]">

      </div>
    </div>
  );
};

export default PageTitle;
