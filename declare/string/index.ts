import { toNonAccentVietnamese } from '@common';

/* eslint-disable no-extend-native */
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.changeAlias = function () {
  let str = this + '';
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  );
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  return str;
};

String.prototype.searchText = function name(source: string[]) {
  try {
    const lowerSearch = toNonAccentVietnamese(this.toLowerCase());
    const regex = new RegExp(lowerSearch);

    for (const sourceText of source) {
      if (sourceText && regex.test(toNonAccentVietnamese(sourceText.toLowerCase()))) {
        return true;
      }
    }
  } catch (error) {}
  return false;
};

String.prototype.removeHtmlTag = function () {
  return this.replace(/<\/?[^>]+(>|$)/g, '');
};

String.prototype.isEmpty = function () {
  return this.trim().length === 0;
};

String.prototype.removeChar = function () {
  return this.replace(/\D/g, '');
};

String.prototype.getURL = function () {
  const detectUrls =
    /((?:[a-z]+:\/\/)?(?:(?:[a-z0-9\-]+\.)+(?:[a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(?::[0-9]{1,5})?(?:\/[a-z0-9_\-.~]+)*(?:\/(?:[a-z0-9_\-.]*)(?:\?[a-z0-9+_\-.%=&amp;]*)?)?(?:#[a-zA-Z0-9!$&'(?:)*+.=-_~:@/?]*)?)(?:\s+|$)/;
  return this.split(detectUrls).filter((v) => detectUrls.test(v));
};

String.prototype.replaceAll = function (searchValue: string, replaceValue: string) {
  return this.split(searchValue).join(replaceValue);
};

String.prototype.lessThanTen = function () {
  if (isNaN(this)) {
    return '';
  }
  return this < 10 ? '0' + this : this;
};

String.prototype.formatThousandNumber = function name(jumpStep = 3, splitChar = ' ') {
  return this.replace(/\B(?=(\d{4})+(?!\d))/g, splitChar);
};

String.prototype.getUrlParams = function (key: string): string {
  // return new URLSearchParams(this).get(key)
  // this = this.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(this);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export {};