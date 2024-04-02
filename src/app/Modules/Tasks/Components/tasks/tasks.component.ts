import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { DropdownFilterOptions, DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { TasksService } from '../../Services/TasksService';
import { authService } from '../../../Shared/Services/Auth';
import { InputTextModule } from 'primeng/inputtext';
import {Table, TableModule} from 'primeng/table';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { addTask } from '../../Models/addTask';
import { DatePipe } from '@angular/common';
import { ChatService } from '../../../Chat/Services/ChatService';
import { deleteTask } from '../../Models/deleteTask';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule, DialogModule, FormsModule,ReactiveFormsModule,InputTextareaModule,
    MessageModule, ButtonModule, TabViewModule,DropdownModule, InputTextModule, TableModule,CalendarModule, DatePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent  implements OnInit  {
  loader: boolean = true;
  allTasks:any=[];
  DisplayAddPopUp: boolean=false;
  TaskPopUp:boolean=false;
  formAddTask!:UntypedFormGroup;
  Task:any;
  message_content:any;
  selectedfriend:any;
  friends:any=[];
  assignee:any;
  message_success_hidden:boolean=true;
  message_error_hidden:boolean=true;
  AddTaskButtonDisabled:boolean=false;
  UpdateTaskButtonDisabled:boolean=false;
  DeleteTaskButtonDisabled:boolean=false;
  priorities: any[] = [];
  statusList: any[] = [];
  selectedPriority:any;
  selectedStatus:any;
  isAssigneeHidden:boolean=true;
  datePipe: DatePipe = new DatePipe('en-US'); 
  dt: any;
  
  constructor(private router: Router,private tasksService: TasksService, private auth:authService,private ChatService: ChatService,private formBuilder: UntypedFormBuilder) { 
    this.formAddTask = this.formBuilder.group({
      name: [, Validators.required],
      description: [, Validators.required],
      status: [, Validators.required],
      username: [, Validators.required],
      priority: [, Validators.required],
      dueDate: [, Validators.required],
    });
    this.priorities = [
      { name: 'Low' },
      { name: 'Medium' },
      { name: 'High' }
    ];
    this.statusList = [
      { name: 'Assigned' },
      { name: 'InProgress' },
      { name: 'Done' }
    ];
  }
  ngOnInit(): void {

    this.loader=true;

  this.tasksService.getAllTasks().subscribe(res=>{
      if(res!=null){
        this.allTasks = res;
      }
      else{
        this.allTasks=null;
        
      }
    },err=>{
      console.log(err);
      this.allTasks=null;
     
  });

  this.ChatService.friendsList().subscribe(data=>{
    this.friends = data
  });

  this.loader=false;

  }
  viewTask(Task:any)
  {
    this.formAddTask.reset();
    this.TaskPopUp=true;
    this.Task=Task;
    
  }
  async UpdateTask(Task:any){
    this.UpdateTaskButtonDisabled=true;
    this.Task=Task;
    this.assignee='';
    if(this.selectedStatus =="Assigned")
    {
      this.assignee=this.selectedfriend;
    }
    let data:addTask={
      taskId:this.Task.id,
      taskName:this.Task.name,
      taskDesc:this.Task.description,
      priority:this.Task.priority,
      status:this.selectedStatus,
      dueDate: this.Task.dueDate,
      username:this.assignee
    }
      this.tasksService.AddTask(data).subscribe(res=>{
        if(res == "Success"){
          this.message_content=res;
          this.message_success_hidden=false;
        }
        else{
          this.message_content=res;
          this.message_error_hidden=false;
        }
      });
      //await new Promise(f => setTimeout(f, 2000));
      this.TaskPopUp=false;
      this.UpdateTaskButtonDisabled=false;
      this.resetFields();
  }
  async AddTask(){
    debugger;
    this.AddTaskButtonDisabled=true;
    
    const dateValue: Date = this.formAddTask.controls['dueDate'].value;
    //const shortDate: string = this.datePipe.transform(dateValue, 'shortDate') || '';
    const shortDate: string = this.datePipe.transform(dateValue, 'dd/MM/yyyy') || '';

    let data:addTask={
      taskId:0,
      taskName:this.formAddTask.controls['name'].value,
      taskDesc:this.formAddTask.controls['description'].value,
      priority:this.formAddTask.controls['priority'].value,
      status:'New',
      dueDate: shortDate.toString(),//this.formAddTask.controls['dueDate'].value
      username:''
    }
      this.tasksService.AddTask(data).subscribe(res=>{
        if(res == "Success"){
          this.message_content=res;
          this.message_success_hidden=false;
        }
        else{
          this.message_content=res;
          this.message_error_hidden=false;
        }
      });
      this.AddTaskButtonDisabled=false;
      //await new Promise(f => setTimeout(f, 2000));
      this.DisplayAddPopUp=false;
      this.resetFields();
  }
  onStatusSelectionChange(event: any) {
    
    if(this.selectedStatus != null &&  this.selectedStatus == "Assigned")
    {
      this.isAssigneeHidden = false;
    }
    else
    {
      this.isAssigneeHidden =true;
    }
    
    
  }
  async DeleteTask(Task:any){
    debugger;
    this.DeleteTaskButtonDisabled=true;
    this.Task=Task;
    let data:deleteTask={ taskId:this.Task.id};
      this.tasksService.DeleteTask(data).subscribe(res=>{
        if(res == "Success"){
          this.message_content=res;
          this.message_success_hidden=false;
        }
        else{
          this.message_content=res;
          this.message_error_hidden=false;
        }
      });
      //await new Promise(f => setTimeout(f, 2000));
      this.TaskPopUp=false;
      this.DeleteTaskButtonDisabled=false;
      this.resetFields();
  }
  resetFields(){
  
    this.message_content="";
    this.message_success_hidden=true;
    this.message_error_hidden=true;
    this.formAddTask.reset();
    location.reload();
  }
  applyFilterGlobal($event:any, stringVal:any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
