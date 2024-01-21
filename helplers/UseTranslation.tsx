'use client'
import {useTranslations} from "use-intl";

const UseTranslation = ({translate, namespace}: {translate: string, namespace?: string}) : string => {
    const t = useTranslations(namespace)
    return t(translate);
};

export default UseTranslation;