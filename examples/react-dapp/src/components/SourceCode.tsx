import React from 'react'
import './SourceCode.css'
import githubLogo from '../assets/GitHub-Mark-32px.png'

function SourceCode() {
    return (
      <div className="source-code">
        <p>Source code:</p>
        <a href="https://github.com/energywebfoundation/iam-client-lib/tree/develop/examples/react-dapp">
          <img src={githubLogo}/>
        </a>
      </div>
    )
}

export default SourceCode