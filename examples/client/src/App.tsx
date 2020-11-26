import React, { useState } from 'react'
import './App.css'
import { IAM, CacheServerClient } from 'iam-client-lib'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

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

type User = {
  did: string
  verifiedRoles: Role[]
}

function App() {
  const [roles, setRoles] = useState<Role[]>([])

  const handleLogin = async () => {
    const { did } = await iam.initializeConnection({useMetamaskExtension: false})
    if (!did) {
      console.log("unable to retrieve DID")
      return
    }
    const signer = iam.getSigner()
    const latestBlock = await signer?.provider?.getBlockNumber()
    const claim = await iam.createPublicClaim({
      data: { blockNumber: latestBlock },
    })
    const { data } = await axios.post<{ token: string }>('/login', {
      claim,
    })
    const config = {
      headers: { Authorization: `Bearer ${data.token}` },
    }
    const { data: roles } = await axios.get<Role[]>('/roles', config)
    const { data: user } = await axios.get<User>('/user', config)

    setRoles(roles)
  }
  return (
    <div className="App">
      <header className="App-header">
        {roles && roles.length > 0 ? (
          <>
            <Typography>User roles:</Typography>
            {roles.map(({ name, namespace }) => (
              <p key={namespace}>{`${name} at ${namespace}`}</p>
            ))}
          </>
        ) : null}
        <Button variant="contained" color="primary" onClick={handleLogin}>
          login
        </Button>
      </header>
    </div>
  )
}

export default App
