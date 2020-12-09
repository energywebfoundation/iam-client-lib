import React, { useState } from 'react'
import './App.css'
import './Login.css'
import { IAM, CacheServerClient } from 'iam-client-lib'
import axios from 'axios'
import logo from './assets/logo.svg'
import metamaskLogo from './assets/metamask-logo.svg'
import walletconnectIcon from './assets/wallet-connect-icon.svg'
import Spinner from './components/Spinner'

const cacheClient = new CacheServerClient({ url: 'https://volta-iam-cacheserver.energyweb.org/' })

const iam = new IAM({
  rpcUrl: 'https://volta-rpc.energyweb.org',
  chainId: 73799,
  cacheClient,
})

type Role = {
  name: string
  namespace: string
}

function App() {
  const [roles, setRoles] = useState<Role[]>([])
  const [did, setDID] = useState<string>('')
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const verifyIdentity = async function () {
    const signer = iam.getSigner();
    const latestBlock = await signer?.provider?.getBlockNumber();
    const claim = await iam.createPublicClaim({
      data: { blockNumber: latestBlock }
    });
    const { data } = await axios.post<{ token: string }>(
      "https://did-auth-demo.energyweb.org/login",
      {
        claim
      }
    );
    const config = {
      headers: { Authorization: `Bearer ${data.token}` }
    };
    const { data: roles } = await axios.get<Role[]>(
      "https://did-auth-demo.energyweb.org/roles",
      config
    );
    setRoles(roles);
  }

  const login = async function (initOptions?: {
    useMetamaskExtension: boolean;
  }) {
    setIsLoading(true);
    const { did } = await iam.initializeConnection(initOptions);
    if (did) {
      setDID(did)
      try {
        await verifyIdentity();
      } catch (err) {
        console.error(err)
      }
    }
    setIsLoading(false);
  }

  const loginWithWalletConnect = async function () {
    setIsLoading(true);
    const { did } = await iam.initializeConnection();
    if (did) {
      setDID(did)
      try {
        await verifyIdentity();
      } catch (err) {
        console.error(err)
      }
    }
    setIsLoading(false);
  }

  const logout = function () {
    setDID('');
  }

  let loginJsx
  if (isLoading) {
    loginJsx =
     (
      <div>
        <Spinner />
        <span>
          Loading... (Please sign messages using your connected wallet)
        </span>
      </div>
    )
  }
  else if (did) {
    loginJsx = (
      <div>
        <p>Hello user!</p>
        <p>
          Your decentralised identifier: <br/> 
          <strong>{did}</strong>
        </p>
        {roles && roles.length > 0 ? (
          <div className="rolesContainer">
            <p>These are your validated roles:</p>
            {roles.map(({ name, namespace }) => (
              <p key={namespace}><strong>{`${name}`}</strong>{` at ${namespace}`}</p>
            ))}
          </div>
        )
          : (
            <div>
              You do not have any issued role at the moment, please login into switchboard and search for
              apps, orgs to enrol.
            </div>
          )}
        <div className="logoutContainer">
          <button onClick={logout} className="button">
            <span>Logout</span>
          </button>
        </div >
      </div >
    )
  }
  else {
    loginJsx = (
      <div className="container">
        <button className="button" onClick={async () => await loginWithWalletConnect()}>
          <img alt="walletconnect logo" className="walletconnect" src={walletconnectIcon} />
          <span>Login with Wallet Connect</span>
        </button>
        <button className="button" onClick={async () => await login({ useMetamaskExtension: true })}>
          <img alt="metamask logo" className="metamask" src={metamaskLogo} />
          <span>Login with Metamask</span>
        </button>
      </div>
    )
  }
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>IAM showcase app</h2>
        {loginJsx}
    </div >
  )
}

export default App
