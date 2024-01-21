"use client"
import {useTranslations} from "use-intl";
import {createTranslator} from 'next-intl';
import messages from '@/messages/ru.json';


export const t: any = (toTranslate: string) => {

  var tt = (tr: string) => {return};
  try {
    tt = useTranslations("mediaHosting");
  } catch (error) {
    // console.log('Messages', messages);
    tt = createTranslator({locale: 'ru', namespace: 'mediaHosting', messages: messages});
  }

  return tt(toTranslate);
};
