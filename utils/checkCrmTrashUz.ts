const proxyUrl = "http://sleeksoul.site/api/methods.php?method=make_request";

export async function checkCrmTrashUz(apiUrl: string, apiKey: string, phone: string | boolean, ordersCount:number = 2){

  // const filter = {
  //   extendedStatus: [
  //     'trash'
  //   ],
  //   customer: phone
  // };
  //
  // const requestData = new URLSearchParams({
  //     filter: filter,
  //     apiKey: apiKey
  // });

  // var url = String(apiUrl).concat('?').concat(requestData.toString());
  var params = String("apiKey=").concat(apiKey).concat('&filter[extendedStatus][0]=trash&filter[customer]=').concat(String(phone));
  var url = String(apiUrl).concat('?').concat(params);
  // console.log('Trash URL:', url);

  // 10002 == CURLOPT_URL
  // 19913 == CURLOPT_RETURNTRANSFER
  // 10023 == CURLOPT_HTTPHEADER
  // const proxyRequestData = new URLSearchParams({
  //   curl_opts: {
  //     10002: url,
  //     19913: true,
  //     10023: ['Content-Type: application/x-www-form-urlencoded']
  //   }
  // });

  const proxyRequestData = String('curl_opts[19913]=1&curl_opts[10023][0]=Content-Type: application/x-www-form-urlencoded&curl_opts[10002]=').concat(encodeURIComponent(url));
  // console.log('Trash request data:', proxyRequestData);

  const proxyRequestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: proxyRequestData,
  };

  const fetch = await import('node-fetch')
  const response = await fetch.default(proxyUrl, proxyRequestOptions);
  // console.log('proxy response raw', response);
  // console.log('proxy response raw text', await response.text());
  const responseData = await response.json();

  // console.log('proxy response', responseData);

  var trashCond = false;
  if(responseData !== null && typeof responseData === 'object' && 'orders' in responseData && typeof responseData['orders'] === 'object' && Array.isArray(responseData['orders'])){
    trashCond = responseData?.orders?.length >= ordersCount;
  }

  return trashCond;

}
