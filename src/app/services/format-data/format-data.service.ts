import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDataService {
  formatSsn(newSsn: string): string {
    const numbers = newSsn.replace(/\D/g, '');
    const char = { 3: '-', 5: '-' };
    newSsn = '';
    for (let i = 0; i < numbers.length; i++) {
      newSsn += (char[i] || '') + numbers[i];
    }
    return newSsn;
  }

  formatDate(date: string): string {
    const parsedDate = new Date(date);

    const dateOfMonth = parsedDate.getDate() < 10 ? `0${parsedDate.getDate()}` : parsedDate.getDate();
    const monthOfYear = parsedDate.getMonth() < 10 ? `0${parsedDate.getMonth() + 1}` : parsedDate.getMonth() + 1;
    const year = parsedDate.getFullYear();

    return `${monthOfYear}/${dateOfMonth}/${year}`;
  }

  dateFormat(value: string) {
    // const t = new Date(value);

    const day = value.substr(8, 2);
    const month = value.substr(5, 2);
    const year = value.substr(0, 4);
    // const date = ('0' + t.getDate()).slice(-2);
    // const month = ('0' + (t.getMonth() + 1)).slice(-2);
    // const year = t.getFullYear();
    return `${month}/${day}/${year}`;
  }

  dateFormatFromBiometrics(value: string) {
    const month = value.substr(0, 2);
    const day = value.substr(3, 2);
    const year = value.substr(6, 4);

    return `${month}/${day}/${year}`;
  }

  formatDateOnInput(date: any): string {
    if (date.length === 2 || date.length === 5) {
      return date + '/';
    }
  }

  formatCurrency(amount: number | string) {
    let currency = amount.toString();
    if (currency.charAt(0) === '$' || currency.includes(',')) {
      currency = this.undoCurrencyFormat(currency);
    }
    const currencyArray = currency.split('');
    currencyArray.reverse();
    for (let i = 0; i < currencyArray.length; i++) {
      if ((i + 1) % 4 === 0) {
        currencyArray.splice(i, 0, ',');
      }
    }
    currencyArray.reverse();
    return `\$${currencyArray.join('')}`;
  }

  undoCurrencyFormat(currency: string): string {
    currency = currency.split(',').join('');
    currency = currency.replace('\$', '');
    return currency;
  }
  formatPhoneNumber(entry) {
    const match = entry
      .replace(/\D+/g, '').replace(/^1/, '')
      .match(/([^\d]*\d[^\d]*){1,10}$/)[0];
    const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
    const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : '';
    const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : '';
    return `${part1}${part2}${part3}`;
  }

  removeCharcFromField(field) {
    const htmlElement = document.getElementById(field);
    // Listen for input event on numInput.
    if (htmlElement != null){
      htmlElement.onkeydown =  (e) => {
        if (!((e.keyCode > 95 && e.keyCode < 123) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8)) {
          return false;
        }
      };
    }
  }
}
