import Ctl from 'ipfsd-ctl';
import path from 'path';
import ipfsHttpModule from 'ipfs-http-client';
import { IpfsConfig } from '../../src';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ipfsd: any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function spawnIpfsDaemon(): Promise<any> {
  const ipfsBin = path.resolve(
    __dirname,
    '../../',
    'node_modules/.bin',
    'jsipfs'
  );
  ipfsd = await Ctl.createController({
    type: 'js',
    disposable: true,
    test: true,
    ipfsBin,
    ipfsHttpModule,
  });
  return ipfsd.apiAddr;
}

export async function shutDownIpfsDaemon(): Promise<void> {
  return ipfsd && ipfsd.stop();
}

export function getE2eIpfsConfig(): IpfsConfig {
  const projectId = '2DD5GcJRpMeuqMoKsgT95AQ8OI3';
  const projectSecret = '842995992aa1edd763196b30d727a45d';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  return {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  };
}
