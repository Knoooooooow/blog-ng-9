import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-customer-new-list',
    templateUrl: './customer-new-list.component.html',
    styleUrls: ['./customer-new-list.component.scss']
})
export class CustomerNewListComponent implements OnInit {

    @Input() customers;
    @Output() customersChange = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    createCustomer(){
        this.customers.push({name:'test'});
    }
    customerChange(data,i) {
        this.customers[i].name = data.name;
        this.customersChange.emit(this.customers);
    }
    customerRemove(data) {
        this.customers.splice(data.index, 1);
        this.customersChange.emit(this.customers);
    }
}
