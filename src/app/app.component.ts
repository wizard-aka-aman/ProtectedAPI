import { Component } from '@angular/core';
import { ApikeyService } from './services/apikey.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'API Key Manager';
  name = '';
  ips = '';
  created: any;
  verifyApiId: string = '';
  displaytoken: any;
  tooken: string = '';
  displayHello: string = '';
  allowedIPToken: string = '';
  
  // UI state management
  isCreating = false;
  isVerifying = false;
  isTesting = false;
  showVerifySection = false;
  showTestSection = false;
  copiedToken = false;

  userLoggedInIp :string= ''

  constructor(private svc: ApikeyService) {}

  async create() { 

    const dto = {
      name: this.name,
      allowedIps: this.ips.split(',').map(s => s.trim()).filter(Boolean)
    };
    
    this.isCreating = true;
    if(dto.allowedIps.length == 0){
       await this.svc.GetIP().subscribe(
        (res: any) => {
          console.log(res);
          this.userLoggedInIp = res.ip;
          dto.allowedIps.push(res.ip);
          this.svc.create(dto).subscribe(
      res => {
        this.created = res;
        this.verifyApiId = res.id;
        this.showVerifySection = true;
        this.isCreating = false;
      },
      err => {
        console.error(err);
        alert('Error creating API key');
        this.isCreating = false;
      }
    );
        },
        err => {
          console.error(err);
          // alert('Error getting IP');
          this.isCreating = false;
        }
      );
    }else{

     this.svc.create(dto).subscribe(
      res => {
        this.created = res;
        this.verifyApiId = res.id;
        this.showVerifySection = true;
        this.isCreating = false;
      },
      err => {
        console.error(err);
        alert('Error creating API key');
        this.isCreating = false;
      }
    );
    }

    console.log(dto);
    
    
    
  }

  verify() {
    if (!this.verifyApiId.trim()) {
      alert('Please enter an API ID');
      return;
    }

    this.isVerifying = true;
    
    this.svc.verify(this.verifyApiId).subscribe(
      (res: any) => {
        this.displaytoken = res;
        this.tooken = res.token;
        this.allowedIPToken = res.token;
        this.showTestSection = true;
        this.isVerifying = false;
      },
      err => {
        console.error(err);
        alert('Error verifying API key');
        this.isVerifying = false;
      }
    );
  }

  showHello() {
    if (!this.allowedIPToken.trim()) {
      alert('Please enter a token');
      return;
    }

    this.isTesting = true;
    
    this.svc.getHello(this.allowedIPToken,this.userLoggedInIp).subscribe(
      (res: any) => {
        console.log(res);
        this.displayHello = res;
        this.isTesting = false;
      },
      err => {
        console.log(err);
        alert('Error testing API');
        this.isTesting = false;
      }
    );
  }

  copyToken() {
    navigator.clipboard.writeText(this.tooken).then(() => {
      this.copiedToken = true;
      setTimeout(() => this.copiedToken = false, 2000);
    });
  }

  reset() {
    this.name = '';
    this.ips = '';
    this.created = null;
    this.verifyApiId = '';
    this.displaytoken = null;
    this.tooken = '';
    this.displayHello = '';
    this.allowedIPToken = '';
    this.showVerifySection = false;
    this.showTestSection = false;
  }
}