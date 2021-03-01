import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-example',
    templateUrl: './form-example.component.html',
    styleUrls: ['./form-example.component.scss']
})
export class FormExampleComponent implements OnInit {

    form: FormGroup;
    visibilityOption;
    visibilityOptions;

    customers: Array<any>;
    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            options: ['PUBLIC']
        });
        this.visibilityOptions = [
            { value: 'PUBLIC', checked: true, label: 'APP.FORM.VISIBILITY.PUBLIC', disabled: false },
            { value: 'PRIVATE', checked: false, label: 'APP.FORM.VISIBILITY.PRIVATE', disabled: false }
        ];
        this.visibilityOption = this.visibilityOptions[0].value;
        this.customers = [{ name: 'jack' }, { name: 'tom' }];
    }

    ngOnInit(): void {

    }
    submit() {

    }
    visibilityChange(event) {
        this.visibilityOption = event.value;
    }
    customersChange(data) {
        this.customers = data;
    }
}
