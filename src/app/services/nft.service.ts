import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NFT } from '../models/nft';

@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor(private httpClient: HttpClient) { }

  getAllNFT(){
    return this.httpClient.get('http://127.0.0.1:8081/api/nfts');
  }

  getOneNFT(id: any){
    return this.httpClient.get('http://127.0.0.1:8081/api/nfts/'+id);
  }

  saveNFT(nft: any){
    return this.httpClient.post('http://127.0.0.1:8081/api/nfts', nft);
  }

  updateNFT(id: any, nft: any){
    return this.httpClient.put('http://127.0.0.1:8081/api/nfts/'+id, nft);
  }

  deleteNFT(id: any){
    return this.httpClient.get('http://127.0.0.1:8081/api/nfts/'+id);
  }
}
