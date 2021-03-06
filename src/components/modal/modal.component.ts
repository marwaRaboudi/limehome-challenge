import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() data: any;
  @Output() modalEvent = new EventEmitter<string>();
  displayForm = false;
  bookForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    roomPreference: [''],
    chekInDate: ['', [Validators.required]],
    chekOutDate: ['', [Validators.required]],
  });
  roomPreferences: any[] = [
    {
      name: 'Standard',
      value: 'standard'
    },
    {
      name: 'Deluxe',
      value: 'deluxe'
    },
    {
      name: 'Suite',
      value: 'suite'
    }
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  openModal(): void {
    this.displayForm = false;
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.add('open');
    }
  }

  closeModal(): void {
    this.bookForm.reset();
    this.displayForm = false;
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.classList.remove('open');
    }
    this.modalEvent.emit('modalClosed');
  }

  showForm(): void {
    this.displayForm = true;
  }

  onSubmit(): void {
    console.log(this.bookForm.value);
    this.closeModal();
    this.showToast();
  }

  showToast(): void {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.className = 'show';
      setTimeout(() => {
        toast.className = toast.className.replace('show', '');
      }, 3000);
    }
  }

}
