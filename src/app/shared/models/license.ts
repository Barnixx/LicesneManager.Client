import {Deserializable} from './deserializable';

export class License implements Deserializable<License> {

  id: string;
  ip: string;
  hwid: string;
  key: string;
  _createdAt: Date;
  _modifyDate: Date;
  status: string;


  deserialize(input: any): License {


    return this;
  }

  get createdAt(): Date | string {
    return this._createdAt;
  }

  set createdAt(date: string | Date) {
    if (date instanceof Date) {
      this._createdAt = date;
    } else {
      this._createdAt = new Date(date + 'Z');
    }
  }

  get modifyDate(): Date | string {
    if (this._modifyDate instanceof Date) {
      return this._modifyDate;
    } else {
      return null;
    }
  }

  set modifyDate(date: string | Date) {
    if (date instanceof Date) {
      this._modifyDate = date;
    } else if (!(date == null || date.trim() === '')) {
      this._modifyDate = new Date(date + 'Z');
    }
  }



}
