import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NftService } from 'src/app/services/nft.service';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { NFT } from 'src/app/models/nft';
import { ContractService } from 'src/app/services/contract.service';

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
  uploadedImage: any = null;
  nft = new NFT()


  constructor(private messageService: MessageService, 
    private contractService: ContractService, 
    private nftService: NftService, private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.createForm();
  }

   insertData(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    
    this.nft.name = this.form.get('name')?.value
    this.nft.description = this.form.get('description')?.value
    this.nft.price = this.form.get('price')?.value

    if(this.uploadedImage !== null){
            let file = this.uploadedImage
            const filename = this.uploadedImage.name
            let formdata = new FormData()
            formdata.append("file", file)
            //formdata.append("name", filename)
            
            console.log(formdata)
                this.nftService.uploadImage(formdata).subscribe(res =>{
                  console.log(res);
                  this.nft.imageCover = filename
            })
    }
    console.log("Upload test")

    var tokenId = this.contractService.mintNFT(this.nft, this.uploadedImage.name);
    
    var tokenIdString = tokenId?.toString();

    console.log(tokenIdString);
    
    var ownerId: any = this.contractService.getOwner(tokenIdString)

    var ownerIdString = ownerId?.toString()

    console.log(ownerIdString);

    this.nft.ownerId = "0xE382a60d1Cb077FD388417EB944aF3E4c42D08db"

    this.nftService.saveNFT(this.nft).subscribe(res =>{
      console.log(res);
      this.dt = res;
      if(this.dt.status = true){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'NFT Uploaded' });
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed To Upload' });
      }

      this.submitted = false;
      this.nft = new NFT()
      this.form.get('name')?.reset();
      this.form.get('price')?.reset();
      this.form.get('description')?.reset();
    })
  }

  get f(){
    return this.form.controls;
  }

  createForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  onUpload = (event : Event) =>{
    const target = event.target as HTMLInputElement;
    let fileList: FileList | null = target.files;
    if(fileList){
            this.uploadedImage = fileList[0];
            console.log(fileList[0])  
    }
        this.messageService.add({ severity: 'info', 
        summary: 'Success', detail: 'Image Uploaded' });
    }

    
}
