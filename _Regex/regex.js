export default {
    DIGITS: /^[0-9]+$/,
    ALPHABETIC_CHARACTERS: /^[a-zA-Z]+$/,
    ALPHA_NUMERIC_CHARACTERS: /^[a-zA-Z0-9]+$/,
    EMAIL: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
    IDNO: /^[A-Z]{1}[0-9]{9}$/,
    PERMITNO: /^[A-Z]{2}[0-9]{8}$/,
    EMPLOYEEID: /^[a-zA-Z0-9]{1,10}$/,
    VERSION: /^(\d{1,4}\.){1,3}\d{1,4}$/,
    PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*["!#$%&'()\-=^~|¥`@{}[\]:*;+_/?.>,<])[A-Za-z\d"!#$%&'()\-=^~|¥`@{}[\]:*;+_/?.>,<]{8,16}$/,
    MOBILE: /^09\d{8}$/,
    PHONE: /^(\d{2,3}(-| )?|\(\d{2,3}\) ?)\d{3,4}(-| )?\d{4}$/,
    DATE: /^[0-9]{4}[\/]{1}[0-9]{2}[\/]{1}0-9]{2}$/,
    TIME: /^[0-9]{2}[\:]{1}[0-9]{2}$/,
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(:[\d]{2,5})?(\/[\w\?\=\.-]*)*\/?$/,
    YOUTUBE: /^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/,
    LATITUDE: /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/,
    LONGITUDE: /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/,
    ID_NUMBER: /^[A-Z]{1}[1-2]{1}[0-9]{8}$/,
    RESIDENT_NUMBER: /^[A-Z]{1}[A-Z0-9]{1}[0-9]{8}$/,
    PASSPORT_NUMBER: /^[A-Z0-9]{5,17}$/,
    VALIDLOGIN_NUMBER: /^[A-Za-z0-9]{8}/,
    EMPLOYEE_NUMBER: /^[0-9]{6}/,
    NUMBERFLOAT: /^(([0-9]+|0)\.([0,5]{1,1})$)|^([^0][0-9]+|0)$/,
  }
  