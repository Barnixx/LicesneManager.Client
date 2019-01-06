import {Deserializable} from './deserializable';

export class License implements Deserializable<License> {

  id: string;
  ip: string;
  hwid: string;
  key: string;
  createdAt: Date;
  modifyDate: Date;
  status: string;

  deserialize(input: any): License {


    return this;
  }


}
