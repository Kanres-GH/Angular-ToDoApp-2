import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { TasksService } from '../services/tasks.service';
// import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

// interface Status {
//   value: string;
//   viewValue: string;
// }


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  taskForm: FormGroup;

  // range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });

  status: string[] = [
    'Pending',
    'Ready For Development',
    'Developing',
    'Testing',
    'Deploy'
  ]

  constructor(
    private _fb: FormBuilder,
    private _taskService: TasksService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ) {
    this.taskForm = this._fb.group({
      taskName: '',
      dateCreate: '',
      dateFinish: '',
      statusName: ''
    });
  }

  ngOnInit(): void {
    this.taskForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.taskForm.valid) {
      if(this.data) {
        this._taskService.updateTask(this.data.id, this.taskForm.value).subscribe({
          next: (val: any) => {
            // alert('Task details are updated!');
            this._coreService.openSnackBar('Task details are updated!', 'Done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._taskService.addTask(this.taskForm.value).subscribe({
          next: (val: any) => {
            // alert('Task added successfully!');
            this._coreService.openSnackBar('Task added successfully!', 'Done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
      
    }
  }
}
