import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  showForm: boolean;

  @Output() addEvt = new EventEmitter();

  faPlus = faPlus;

  toggleAptDisplay() {
    this.showForm = !this.showForm;
  }

  handleAdd(formInfo: any) {
    const tempItem: object = {
      petName: formInfo.petName,
      ownerName: formInfo.ownerName,
      aptDate: formInfo.aptDate + ' ' + formInfo.aptTime,
      aptNotes: formInfo.aptNotes
    };
    this.addEvt.emit(tempItem);
    this.showForm = !this.showForm;
  }

  constructor() {
    this.showForm = true;
  }

  ngOnInit() {}
}