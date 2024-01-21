const countryPhoneCode = '998';
const providerPhoneCode: { [key: string]: number } = {
    '90': 7,
    '91': 7,
    '92': 7,
    '93': 7,
    '94': 7,
    '95': 7,
    '96': 7,
    '97': 7,
    '98': 7,
    '99': 7,
    '50': 7
};

const phoneNumberLengthWOCountry = 9;

export function checkPhoneUz(phone: string){

  // Trimming string
  var phoneNumber = String(phone.replace(/[^\d]/g, ''));

  if(phoneNumber[0] === '0' && phoneNumber[1] === '0'){
      phoneNumber = phoneNumber.slice(2);
  }

  // Checks for country code
  var countryCodeCheck = (phoneNumber.search(countryPhoneCode) === 0) && (phoneNumber.length > countryPhoneCode.length + phoneNumberLengthWOCountry);
  if(countryCodeCheck){
      phoneNumber = phoneNumber.slice(countryPhoneCode.length);
  }

  // Check for provider code
  var realProviderPhoneCode = Object.keys(providerPhoneCode).filter((code) => {
      return phoneNumber.search(code) === 0 || (phoneNumber.search(code) === 1 && phoneNumber[0] === '0');
  });

  var providerKey = null;
  if(realProviderPhoneCode.length > 0){
      providerKey = realProviderPhoneCode[0];
      var sliceLen = 0;
      if(providerKey[0] !== phoneNumber[0]){
          sliceLen = 1;
      }
      phoneNumber = phoneNumber.slice(realProviderPhoneCode[0].length + sliceLen);

      // Check for final length
      // var providerPhoneCodeLength = varName && varName in providerPhoneCode ? providerPhoneCode[String(varName)] : 0;
      var providerPhoneCodeLength = 7;
      if(providerKey in providerPhoneCode){
        providerPhoneCodeLength = providerPhoneCode[<string>providerKey];
      }
      if(phoneNumber.length !== providerPhoneCodeLength){
        // error.html('Invalid number format')
        // return false;
        return [phoneNumber, true];
      }

      phoneNumber = countryPhoneCode + providerKey + phoneNumber;
  } else {
    // error.html('Invalid number format')
    // return false;
    return [phoneNumber, true];
  }


  return [phoneNumber, true];
}
