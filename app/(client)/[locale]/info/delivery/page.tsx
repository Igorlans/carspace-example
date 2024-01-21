import PageTitle from "../_components/PageTitle";
import ParagraphTitle from "../_components/ParagraphTitle";
import {languageInputValues} from "@/types/types";
import UseTranslation from "@/helplers/UseTranslation";

const DeliveryPage = async ({params}: { params: { locale: languageInputValues } }) => {


    return (
        <div className="container">
            <PageTitle title={<UseTranslation translate={'pageTitle'} namespace={'delivery'} />}/>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle1'} namespace={'delivery'} />}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr1'} namespace={'delivery'} />
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle2'} namespace={'delivery'} />}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr2'} namespace={'delivery'} />
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle3'} namespace={'delivery'} />}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr3'} namespace={'delivery'} />
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle4'} namespace={'delivery'} />}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr4'} namespace={'delivery'} />
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle5'} namespace={'delivery'} />}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr5'} namespace={'delivery'} />
            </p>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr6'} namespace={'delivery'} />
            </p>
        </div>
    );
};

export default DeliveryPage;
