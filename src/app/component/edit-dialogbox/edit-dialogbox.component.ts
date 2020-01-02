import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { HttpHeaderService } from 'src/app/service/http-header.service';

@Component({
  selector: 'app-edit-dialogbox',
  templateUrl: './edit-dialogbox.component.html',
  styleUrls: ['./edit-dialogbox.component.scss']
})
export class EditDialogboxComponent implements OnInit {
  vehicleData : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditDialogboxComponent>, private dataService: DataService,private httpHeaderService : HttpHeaderService) { }
  'name' = new FormControl(this.data.vehicle.vehicleName);
  'number' = new FormControl(this.data.vehicle.vehicleNumber);
  ngOnInit() {
  }

  update() {
    this.vehicleData = {
      "vehicleName" : this.name.value,
      "vehicleNumber" : this.number.value
    };

    this.httpHeaderService.putRequest("vehicle/" + this.data.vehicle.vehicleId,this.vehicleData).subscribe(
      (response: any) => {
        if (response.responseCode === 1000) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Vehicle updated ", "Close", { duration: 3000 });
        }
      },
      error => {
        this.snackBar.open("Vehicle updation failed", "Close", { duration: 3000 });
      }
    );
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
