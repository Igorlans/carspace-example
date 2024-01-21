const apiTokenPR = "6390400899:AAHcoy6n3oAvN67niHpMJhEXJbFwkTJf54c";
const chatId = "431836830";

export default async function sendTelegram(data: string): Promise<any> {

    const url = `https://api.telegram.org/bot${apiTokenPR}/sendMessage?chat_id=${chatId}&text=${data}`;
    const sendUrl = encodeURI(url);
    console.log(sendUrl);
    try {
        const res = await fetch(sendUrl)
        if (!res.ok) throw new Error("Error");
        return res;
    } catch (e) {
        console.log(e);
        throw e;
    }
}