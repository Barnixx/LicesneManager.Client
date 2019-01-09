import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {License} from '../../shared/models/license';
import {LicenseComponent} from '../license/license.component';
import {LicenseService} from '../shared/license.service';

interface LicenseDialogData {
  license: License;
  edit: boolean;
}

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.css']
})
export class AddLicenseComponent implements OnInit {

  showSpinner = false;

  constructor(private dialogRef: MatDialogRef<LicenseComponent>,
              private licenseService: LicenseService, @Inject(MAT_DIALOG_DATA) public data: LicenseDialogData) {
    console.log('in dialog', data);
  }

  ngOnInit() {
  }

  submit() {
    this.showSpinner = true;
    this.licenseService.update(this.data.license).subscribe(() => {
      this.dialogRef.close(true);
      this.showSpinner = false;
    }, error => {
      console.log(error);
    });
    console.log('data to send', this.data.license);
  }

}
