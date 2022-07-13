const { execFile } = require('child_process');

const run = () => {
  const bench = execFile(
    'node',
    [`${__dirname}/suites/init/init.js`],
    (err, stdout, stderr) => {
      err = err || stderr;
      if (err) {
        console.error(err);
      }
      console.log(stdout);
    }
  );

  const top = execFile(
    'top',
    ['-b', `-p ${bench.pid}`],
    (err, stdout, stderr) => {
      err = err || stderr;
      if (err) {
        return console.log(err);
      } else {
        return stats(stdout, bench.pid);
      }
    }
  );
  bench.on('exit', () => {
    top.kill();
  });
};

run();

const stats = (logs, pid) => {
  for (let log of logs
    .split(/\r\n|\r|\n/)
    .filter((log) => log.trim().startsWith(pid))) {
    console.log(log);
  }
};
