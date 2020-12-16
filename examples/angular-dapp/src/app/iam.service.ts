import { Injectable } from '@angular/core';
import { CacheServerClient, IAM } from 'iam-client-lib';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IamService {
  readonly iam: IAM;

  constructor() {
    const cacheClient = new CacheServerClient({
      url: "https://volta-iam-cacheserver.energyweb.org/"
    });

    this.iam = new IAM({
      rpcUrl: "https://volta-rpc.energyweb.org",
      chainId: 73799,
      cacheClient
    });
  }
}

