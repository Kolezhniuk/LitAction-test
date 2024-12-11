import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ui';
  _router = inject(Router);
  _route = inject(ActivatedRoute);
  botName = 'Unknown Bot';
  did = 'Unknown DID';
  // signature = 'Unknown Signature';
  msg = JSON.parse('{}');

  info = '';

  loading = false;

  signatureVerified = false;
  registration: { developerDid: string } = { developerDid: '' };
  signer!: any;

  get ethers() {
    return (window as any)['ethers'];
  }

  private readonly _url = ``;
  // private readonly _url =  `http://localhost:4001`;

  //  sig = ethers.utils.joinSignature(JSON.parse(signature));
  async ngOnInit(): Promise<void> {
    this.loading = true;
    const provider = new this.ethers.providers.Web3Provider(
      (window as any)['ethereum']
    );
    this.signer = provider.getSigner();
    const urlParams = new URLSearchParams(window.location.search);
    this.botName = urlParams.get('name') || this.botName;
    this.did = urlParams.get('did') || this.did;
    const signature = urlParams.get('signature') ?? '{}';
    this.msg = JSON.parse(urlParams.get('msg') || this.msg);
    const signedMsg = urlParams.get('signedMsg') ?? '';

    this.signatureVerified = await this.validateSignature(signature, signedMsg);
    this.registration = await this.checkDeveloperRegistered();
    this.loading = false;
  }

  async checkDeveloperRegistered(): Promise<any> {
    try {
      const response = await fetch(
        `${this._url}/api/checkBind?did=${this.did}`
      );
      const data = await response.json();

      console.log('checkDeveloperRegistered', data);

      return data;
    } catch (e) {
      console.error(e);
      return { developerDid: '' };
    }
  }

  proofClick(): void {
    window.open(
      'https://amoy.polygonscan.com/address/0xd624033f5fF0495e200615dD1FbC7101C328fDbF',
      '_blank'
    );
  }

  async validateSignature(
    signatureJson: string,
    signedMsg: string
  ): Promise<boolean> {
    const resp = await fetch(
      `https://resolver.privado.id/1.0/identifiers/${this.did}`
    );
    const didDoc = await resp.json();

    const { r, s } = JSON.parse(signatureJson);

    const sigs = [
      {
        r,
        s,
        v: 27,
      },
      {
        r,
        s,
        v: 28,
      },
    ].map((s) => this.ethers.utils.joinSignature(s));

    const vm = didDoc.didDocument.verificationMethod.find(
      (vm: { type: string; controller: any }) =>
        vm.type === 'EcdsaSecp256k1RecoveryMethod2020' &&
        vm.controller === this.did
    );

    if (!vm) {
      throw new Error('No verification method found');
    }

    const ethAddress = vm.blockchainAccountId.split(':').pop();

    const recoveredAddresses = sigs.map((s) =>
      this.ethers.utils.recoverAddress(signedMsg, s)
    );

    const result = recoveredAddresses.find(
      (r) => ethAddress.toLowerCase() === r.toLowerCase()
    );

    console.log('ethAddress', ethAddress, 'recoveredAddress', result);
    this.info = `Signature created at ${new Date(
      this.msg.timeStamp
    ).toISOString()} on behalf of <b>@${
      this.msg.from
    }</b><br>Owner:<b>${result}</b>`;
    return Boolean(result);
  }

  async signMessage(): Promise<void> {
    const response = await fetch(
      `${this._url}/api/auth-request?from=${this.did}`
    );
    const { url } = await response.json();
    console.log('URL', url);
    window.open(url, '_blank');
  }
}
