const getCustomFields = async () => {

    const apiUrl = 'https://uzshopping.retailcrm.ru/api/v5/custom-fields';

    const requestOptions = {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-KEY': '3B5GFyjM1veHAbkBKB6EMefW41bvjUlf'
        },
        // body: requestData,
    };

    try {
        const fetch = await import('node-fetch')
        const response = await fetch.default(apiUrl, requestOptions);

        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }

        const responseData = await response.json();

        //@ts-ignore
        console.log(JSON.stringify(responseData, null, 4))
        return responseData;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
}


getCustomFields()