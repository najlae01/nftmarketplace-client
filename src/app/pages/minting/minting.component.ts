import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NftService } from 'src/app/services/nft.service';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-minting',
  templateUrl: './minting.component.html',
  styleUrls: ['./minting.component.css'],
  providers: [MessageService]
})
export class MintingComponent  implements OnInit {

  id: any;
  form!: FormGroup;
  files: any;
  dt: any;
  submitted: any = false;
  paletteIcon = faPalette;
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService, private toastr: ToastrService, private nftService: NftService, private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.createForm();
  }

   insertData(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    const formData = new FormData();
    formData.append("name", this.form.get('name')?.value);
    formData.append("description", this.form.get('description')?.value);
    formData.append("price", this.form.get('price')?.value);
    //formData.append("imageCover", this.files, this.files.name);
    console.log("Bonjour - Insertion test")
    this.nftService.saveNFT(formData).subscribe(res =>{
      console.log(res);
      this.dt = res;
      if(this.dt.status = true){
        this.toastr.success(JSON.stringify(this.dt.message), '', {
          timeOut: 2000,
          progressBar: true
        })
      }else{
        this.toastr.error(JSON.stringify(this.dt.message), '', {
          timeOut: 2000,
          progressBar: true
        })
      }
      this.submitted = false;
      this.form.get('name')?.reset();
      this.form.get('price')?.reset();
      this.form.get('description')?.reset();
    })
  }

  get f(){
    return this.form.controls;
  }

  /*uploadImage(event: any){
    this.files = event.target.files[0];
    console.log(this.files);
  }*/

  createForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      //imageCover: [null, Validators.required]
      
    })
  }

  onUpload(event: any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
}
