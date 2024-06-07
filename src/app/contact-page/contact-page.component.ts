import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {
 // email=document.getElementById('email');

// isValidEmail(email:string) {
//   const regex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/
//   return regex.test(email)
// }

// if (isValidEmail=='false'){

// }
contactForm!:FormGroup

ngOnInit(){
  this.contactForm=new FormGroup({
    fullName:new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    subject:new FormControl('',Validators.required),
  })
}
 
  sendInfo(){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Sent",
      showConfirmButton: false,
      timer: 1000
    });

  }
}

