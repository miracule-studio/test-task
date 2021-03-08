import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";

export interface Message {
    email: string;
    phone: string;
    notes: string;
}

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
    message: Message;
    /**
     * FormBuilder, FormControls
     */
    emailControl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);
    phoneControl = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[- +()0-9]+')
    ]);
    notesControl = new FormControl('', [
        Validators.required,
        Validators.minLength(12)
    ]);
    options = this.fb.group({
        email: this.emailControl,
        phone : this.phoneControl,
        notes: this.notesControl
    });

    constructor( private fb: FormBuilder ) { }

    /**
     * Get errors
     */
    getErrorEmailModel() {
        if (this.emailControl.hasError('required')) {
            return "The field Email can\'t be empty";
        }
        return this.emailControl.hasError('email') ? "Field Email doesn\'t correct" : '';
    }
    getErrorPhoneName() {
        if (this.phoneControl.hasError('required')) {
            return "The field Phone can\'t be empty";
        }
        if (this.phoneControl.hasError('minLength')) {
          return "min 8";
        }
        return this.phoneControl.hasError('pattern') ? "Phone number isn\'t valid" : '';
    }
    getErrorNotesName() {
        if (this.notesControl.hasError('required')) {
            return "The field Notes can\'t be empty";
        }
        return this.notesControl.hasError('minlength') ? "min 10" : '';
    }

    /**
     * Send Message
     */
    onSend(): void {
        console.log(this.options.value);
        this.clearForm();
    }
    /**
     * And clear FormBuilder
     */
    clearForm(): void {
        this.options.reset({email: '',phone: '', notes: ''});
        Object.keys(this.options.controls).forEach(key => {
            this.options.get(key).setErrors(null) ;
        });
        console.log(this.options);
    }

}
