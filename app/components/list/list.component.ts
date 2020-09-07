import { Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ObservableLike } from 'rxjs';

library.add(faTimes);

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {

  @Input() aptList;
  @Output() deleteEvent = new EventEmitter();
  @Output() updateEvt = new EventEmitter();

  faTimes = faTimes;

  handleDelete(theApt: object) {
    this.deleteEvent.emit(theApt);

  }

  handleUpdate(theApt: object, labelName: string, newValue: string){
    this.updateEvt.emit({ theApt: theApt, labelName: labelName, newValue: newValue });
  }

  


}
