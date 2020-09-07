import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { without,findIndex } from 'lodash';



@Component({
  selector: 'app-root',
  // this is just a definition of where the html file for this component is
  templateUrl: './app.component.html'
  // you can actually load several CSS files by filling out this array
})
export class AppComponent implements OnInit{
  // the title of angular interface,
  title = 'Wiswdom Pet Medicine';
  // create object to hold contents of json file
  theList: object [];
  modifiedList: object [];
  orderBy: string;
  orderType: string;
  lastIndex: number;

  deleteApt(theApt: object) {
    this.theList = without(this.theList,theApt);
    this.modifiedList = without(this.theList,theApt);
  }

  addApt(theApt: any) {
    theApt.aptId = this.lastIndex;
    this.theList.unshift(theApt);
    this.modifiedList.unshift(theApt);
    this.lastIndex++;
  }

  updateApt(aptInfo){
    let aptIndex: number;
    let modifiedIndex: number; 
    aptIndex = findIndex(this.theList, { aptId: aptInfo.theApt.aptId});
    modifiedIndex = findIndex(this.modifiedList, { aptId: aptInfo.theApt.aptId});

    this.theList[aptIndex][aptInfo.labelName] = aptInfo.newValue;
    this.modifiedList[modifiedIndex][aptInfo.labelName] = aptInfo.newValue;

  }

  searchApt(theQuery:string){
    this.modifiedList = this.theList.filter(eachItem => { 
      return(
        eachItem['petName'].toLowerCase().includes(theQuery.toLowerCase()) || 
        eachItem['ownerName'].toLowerCase().includes(theQuery.toLowerCase()) || 
        eachItem['aptNotes'].toLowerCase().includes(theQuery.toLowerCase())
        );
      });
      this.sortItems();
  }

  sortItems() {
    let order: number;
    if(this.orderType == 'asc') {
      order =1;
    } 
    else{
      order =-1;
    }
    this.modifiedList.sort((a,b) => { 
    if( a[this.orderBy].toLowerCase() < b[this.orderBy].toLowerCase() ) { return -1 * order; }
    if( a[this.orderBy].toLowerCase() > b[this.orderBy].toLowerCase() ) { return 1 * order; }
  }); 
  }

  orderApt(orderObj){
    this.orderBy = orderObj.orderBy;
    this.orderType = orderObj.orderType;
    this.sortItems();
  }

  constructor(private http: HttpClient) { 
    this.orderBy = 'petName';
    this.orderType = 'asc';



  }

  ngOnInit(): void {
    this.lastIndex = 0;
    this.http.get<Object[]>('../assets/data.json').subscribe(data => {
    // create variable that can be passed on to subcomponents
    this.theList = data.map((item:any) => { item.aptId = this.lastIndex++;
    return item; }) ;
    this.modifiedList = data;
    this.sortItems();
  });

}

}
