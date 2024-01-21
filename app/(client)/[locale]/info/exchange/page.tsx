import PageTitle from "../_components/PageTitle";
import ParagraphTitle from "../_components/ParagraphTitle";
import UseTranslation from "@/helplers/UseTranslation";
const ExchangePage = () => {
  return (
    <div className="container">
      <PageTitle title={<UseTranslation translate={'pageTitle'} namespace={'exchange'}/>} />
      <ParagraphTitle text={<UseTranslation translate={'sectionTitle'} namespace={'exchange'}/>} />
      <p className="mb-12 leading-7">
          <UseTranslation translate={'sectionDescr1'} namespace={'exchange'}/>
      </p>
      <ParagraphTitle text={<UseTranslation translate={'sectionTitle2'} namespace={'exchange'}/>} />
      <p className="mb-12 leading-7">
          <UseTranslation translate={'sectionDescr2'} namespace={'exchange'}/>
      </p>
      <ParagraphTitle text={<UseTranslation translate={'sectionTitle3'} namespace={'exchange'}/>}/>
      <p className="mb-12 leading-7">
          <UseTranslation translate={'sectionDescr3'} namespace={'exchange'}/>
      </p>
      <ParagraphTitle text={<UseTranslation translate={'sectionTitle4'} namespace={'exchange'}/>} />
      <p className="mb-12 leading-7">
          <UseTranslation translate={'sectionDescr4'} namespace={'exchange'}/>
      </p>
      <ParagraphTitle text={<UseTranslation translate={'sectionTitle5'} namespace={'exchange'}/>} />
      <p className="mb-12 leading-7">
          <UseTranslation translate={'sectionDescr5'} namespace={'exchange'}/>
      </p>
    </div>
  );
};

export default ExchangePage;
