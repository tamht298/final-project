import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../_services/user.service';
import {UserAccount} from '../../../models/user-account';
import {UserProfile} from '../../../models/user-profile';
import {PageResult} from '../../../models/page-result';
import {switchMap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {FileUploadComponent} from '../../../shared/file-upload/file-upload.component';
import {UploadFileService} from '../../../_services/upload-file.service';
import {IntakeService} from '../../../_services/intake.service';
import {Intake} from '../../../models/intake';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  showModalAdd = false;
  rfAddUser: FormGroup;
  @Output() usersAddOutput = new EventEmitter<PageResult<UserAccount>>();
  @Input() active = false;
  @Input() tabTitle: string;
  // @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;
  openTab = 1;
  pageResult: PageResult<UserAccount>;
  userExcelFile: any;
  intakes: Intake[] = [];

  userImportSuccess: UserAccount[] = [];
  userTotal: number;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private toast: ToastrService,
              private uploadFileService: UploadFileService, private intakeService: IntakeService) {
  }

  get username() {
    return this.rfAddUser.get('username');
  }

  get firstName() {
    return this.rfAddUser.get('firstName');
  }

  get lastName() {
    return this.rfAddUser.get('lastName');
  }

  get email() {
    return this.rfAddUser.get('email');
  }

  ngOnInit(): void {
    this.intakeService.getIntakeList().subscribe(data => {
      this.intakes = data;
    });

    this.rfAddUser?.reset(this.rfAddUser.value);
    this.rfAddUser = this.fb.group({
      username: ['', {
        validators: [Validators.required, Validators.minLength(6)],
        asyncValidators: [this.userService.validateUsername()],
        updateOn: 'blur'
      }],
      email: ['', {
        validators: [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        asyncValidators: [this.userService.validateEmail()],
        updateOn: 'blur'
      }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  toggleModalAdd() {
    this.showModalAdd = !this.showModalAdd;
  }

  closeModal() {
    this.showModalAdd = false;
    this.rfAddUser.reset();
    this.openTab = 1;
    this.userTotal = 0;
  }

  onSubmit() {
    const profile = new UserProfile(this.firstName.value, this.lastName.value);
    const user: UserAccount = new UserAccount(this.username.value, this.email.value, profile);

    this.userService.addUser(user)
      .pipe(switchMap(res => this.userService.getUserList(0, 20)))
      .subscribe(res => {
        this.closeModal();
        this.showSuccess();
        this.pageResult = res;
        this.usersAddOutput.emit(this.pageResult);
      });
  }

  showSuccess() {
    this.toast.success('Người dùng đã được tạo mới!', 'Thành công',);
  }

  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  importExcelUser() {
    this.uploadFileService.uploadUsersByExcel(this.userExcelFile).subscribe(res => {
      this.userImportSuccess = res.data;
      this.userTotal = res.userTotal;
      console.log(this.userImportSuccess);
      this.toast.success('Đã import danh sách user', 'Thành công');
    });
  }

  getExcel(file) {
    this.userExcelFile = file;
  }
}
