const { spawn } = require('child_process');
const net = require('net');

const PORT = 8544;
const STARTUP_TIMEOUT_MS = 60000;

/**
 * @description Resolves once something accepts TCP connections on the port
 *
 * @param {number} port - Port to probe
 * @returns {Promise<void>}
 */
function waitForPort(port) {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const socket = net.connect(port, '127.0.0.1');
      socket.once('connect', () => {
        socket.destroy();
        resolve();
      });
      socket.once('error', () => {
        socket.destroy();
        if (Date.now() > deadline) {
          reject(new Error(`Local chain did not start on port ${port}`));
        } else {
          setTimeout(attempt, 250);
        }
      });
    };
    attempt();
  });
}

/**
 * @description Starts a local Hardhat chain (configured in hardhat.config.js), runs the given command against it
 * and stops the chain when the command exits. Without a command the chain keeps running until the process is interrupted.
 *
 * Usage: node scripts/run-with-local-chain.js ["<command>"]
 */
async function main() {
  const command = process.argv.slice(2).join(' ');
  const chain = spawn(
    process.execPath,
    [
      require.resolve('hardhat/internal/cli/cli'),
      'node',
      '--hostname',
      '127.0.0.1',
      '--port',
      String(PORT),
    ],
    {
      stdio: command ? 'ignore' : 'inherit',
      env: { ...process.env, HARDHAT_DISABLE_TELEMETRY_PROMPT: 'true' },
    }
  );

  const stop = (code) => {
    chain.kill();
    process.exit(code);
  };
  process.on('SIGINT', () => stop(130));
  process.on('SIGTERM', () => stop(143));
  chain.on('exit', (code) => {
    console.error(`Local chain exited with code ${code}`);
    process.exit(code || 1);
  });

  await waitForPort(PORT);
  console.log(`Local chain listening on http://127.0.0.1:${PORT}`);

  if (!command) return;

  const child = spawn(command, { shell: true, stdio: 'inherit' });
  child.on('exit', (code, signal) => stop(signal ? 1 : code ?? 1));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
