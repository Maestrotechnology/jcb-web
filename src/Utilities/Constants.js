export const baseUrl = 'http://cbe.themaestro.in:8005/vehicle_tracking/'
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const MOBILE_REGEX =
  /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/gm
export const COMPANY_CODE_REGEX = /^'?\p{L}+(?:[' ]\p{L}+)*'?$/u
export const NAME_REGEX = /^[A-Za-z_ ]+$/
export const NUMBER_REGEX = /^[0-9]*$/
export const SPECIAL_CHARACTER_REGEX = /^[A-Za-z0-9 ]+$/
export const toInputUppercase = e => {
  e.target.value = ('' + e.target.value).toUpperCase()
}
export const VEHICLE_NUMBER_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/

export const handleAmountStyle = amt => {
  amt = amt.toString()
  var lastThree = amt.substring(amt.length - 3)
  var otherNumbers = amt.substring(0, amt.length - 3)
  if (otherNumbers != '') lastThree = ',' + lastThree
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
  return res
}
