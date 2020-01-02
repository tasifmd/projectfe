import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaderService } from 'src/app/service/http-header.service';
import { DataService } from 'src/app/service/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditDialogboxComponent } from '../edit-dialogbox/edit-dialogbox.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vehicles : any[];
  message : any;
  displayedColumns: string[] = ['Name', 'Number','Edit','Delete'];
  'name' = new FormControl('');
  'number' = new FormControl('');
  createData : any;
  constructor(private router: Router, private httpHeaderService: HttpHeaderService,private dataService: DataService,private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (response: any) => {
        this.message = response;
        this.getVehicles();
      }
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  getVehicles() {
    console.log("Inside get vehicle")
    this.httpHeaderService.getRequest("vehicle").subscribe(
      (response : any) => {
        this.vehicles = response;
      }
    );
  }

  create() {
    this.createData = {
      "vehicleName" : this.name.value,
      "vehicleNumber" : this.number.value
    }; 
    this.httpHeaderService.postRequest("vehicle", this.createData).subscribe(
      (response: any) => {
        if (response.responseCode === 1000) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Vehicle ceated ", "Close", { duration: 3000 });
        }
      },
      error => {
        this.snackBar.open("Vehicle creation failed", "Close", { duration: 3000 });
      }
    );
  }
  update(element) {
    console.log("Inside update vehicle");
    const dialogRef = this.dialog.open(EditDialogboxComponent, {
      width: '600px', height: '350px',
      data: {
        vehicle: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  delete(element) { 
    console.log("Inside delete")
    this.httpHeaderService.deleteRequest("vehicle/"+element.vehicleId).subscribe(
      (response: any) => {
        if (response.responseCode === 1000) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Vehicle deleted ", "Close", { duration: 3000 });
        }
      },
      error => {
        this.snackBar.open("Vehicle deletion failed", "Close", { duration: 3000 });
      }
    );
    }
}
