import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-new-customer',
    templateUrl: './new-customer.component.html',
    styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

    @Input() customer;
    @Input() customerIndex;
    @Input() readonly = false;

    @Output() customerChange = new EventEmitter();
    @Output() customerRemove = new EventEmitter();


    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.customer && changes.customer.firstChange) {
            this.form = this.formBuilder.group({
                name: [{ value: this.customer ? this.customer.name : '', disabled: this.readonly }, [Validators.required]]
            });
            this.form.valueChanges.subscribe(data => {
                this.customerChange.emit(data);
            })
        }
    }
    removeCustomer() {
        this.customerRemove.emit({ customer: this.customer, index: this.customerIndex });
    }
    submit() {

    }
}
