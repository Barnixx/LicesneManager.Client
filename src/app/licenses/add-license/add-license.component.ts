import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {License} from '../../shared/models/license';
import {LicenseComponent} from '../license/license.component';
import {LicenseService} from '../shared/license.service';
import {Router} from '@angular/router';

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
              private licenseService: LicenseService, @Inject(MAT_DIALOG_DATA) public data: LicenseDialogData,
              private router: Router) {
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
      if (error.status === 404) {
        this.router.navigate(['sign-in']);
      }
    });
  }

}
