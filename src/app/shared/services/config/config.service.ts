import {Injectable} from '@angular/core';
import configJson from 'src/assets/config.json';
import {Config} from './config';

const configUrl = 'assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() {
  }

  getConfig() {
    return <Config>configJson;
  }
}
