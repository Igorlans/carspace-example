import PageTitle from "../_components/PageTitle";
import ParagraphTitle from "../_components/ParagraphTitle";
import {languageInputValues} from "@/types/types";
import UseTranslation from "@/helplers/UseTranslation";

const DeliveryPage = async ({params}: { params: { locale: languageInputValues } }) => {

    return (
        <div className="container">

            <PageTitle title={<UseTranslation translate={'pageTitle'} namespace={'privacyPolicy'}/>}/>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle1'} namespace={'privacyPolicy'}/>}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr1'} namespace={'privacyPolicy'}/>
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle2'} namespace={'privacyPolicy'}/>}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr2'} namespace={'privacyPolicy'}/>
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle3'} namespace={'privacyPolicy'}/>}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr3'} namespace={'privacyPolicy'}/>
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle4'} namespace={'privacyPolicy'}/>}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr4'} namespace={'privacyPolicy'}/>
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle5'} namespace={'privacyPolicy'}/>}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr5'} namespace={'privacyPolicy'}/>
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle6'} namespace={'privacyPolicy'}/>}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr6'} namespace={'privacyPolicy'}/>
            </p>
            <ParagraphTitle text={<UseTranslation translate={'sectionTitle7'} namespace={'privacyPolicy'}/>}/>
            <p className="mb-12 leading-7">
                <UseTranslation translate={'sectionDescr7'} namespace={'privacyPolicy'}/>
            </p>
        </div>
    );
};

export default DeliveryPage;
