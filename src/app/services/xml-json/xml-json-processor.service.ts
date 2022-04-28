import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XmlJsonProcessorService {

  constructor() { }

  xmlToJson(xml: any): any{
    if (xml !== undefined){
      const json :any = {};
      for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
        const key = res[1] || res[3];
        const value = res[2] && this.xmlToJson(res[2]);
        json[key] = ((value && Object.keys(value).length) ? value : res[2]) || null;
      }
      return json;
    }
    return {};
  }

  plainObjectToXml(data: any): string{
    let xmlObject = '<settings>';
    Object.keys(data).forEach((key) => {
      const xmlNode = this.xmlNode(key, data[key]);
      xmlObject += xmlNode;
    });
    return `${xmlObject}</settings>`;
  }

  xmlNode(key: string, value: string): string{
    return `<${key}>${value}</${key}>`;
  }
}
