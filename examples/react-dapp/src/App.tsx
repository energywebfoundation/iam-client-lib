import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { IAM } from "iam-client-lib";
import { Button, CircularProgress, Typography } from "@material-ui/core";

function App() {
  const iam = useRef<IAM | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDid, setUserDid] = useState<string>("");
  const [loggingInProgress, setLoggingInProgress] = useState<boolean>(false);

  useEffect(() => {
    iam.current = new IAM({
      rpcUrl: "https://volta-rpc.energyweb.org/",
      chainId: 73799
    });

    async function init() {
      setLoggingInProgress(true);
      const { connected = false, did, userClosedModal } = (await iam.current?.initializeConnection()) || {};
      if (userClosedModal) {
        return window.location.reload()
      }
      localStorage.setItem("connected", connected.toString());
      setIsLoggedIn(connected || false);
      setUserDid(did || "");
      setLoggingInProgress(false);
    }

    const alreadyLoggedIn = localStorage.getItem("connected");
    if (alreadyLoggedIn) {
      init();
    }
  }, []);

  const handleLogin = async () => {
    setLoggingInProgress(true);
    const { connected = false, did, userClosedModal } = (await iam.current?.initializeConnection()) || {};
    if (userClosedModal) {
      return window.location.reload()
    }
    localStorage.setItem("connected", connected.toString());
    setIsLoggedIn(connected || false);
    setUserDid(did || "");
    setLoggingInProgress(false);
  };

  const handleLogout = async () => {
    await iam.current?.closeConnection()
    localStorage.removeItem('connected');
    window.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <div>
            <p>Your did:</p>
            <p>{userDid}</p>
            <Button onClick={handleLogout} color="secondary" variant="contained">Log out</Button>
          </div>
        ) : loggingInProgress ? (
          <div>
            <CircularProgress color="secondary" />
            <Typography>Loading...</Typography>
          </div>
        ) : (
          <div>
            <Button color="primary" variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
