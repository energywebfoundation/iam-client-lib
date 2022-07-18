const fs = require('fs');
const logger = require('../src/config/logger.config');
/**
 * @description Read the patches from the patches directory
 *
 * @returns {Promise<Array<string>>}
 */
async function getPatches() {
  const logger = logger.getLogger();
  logger.info('Getting patches...');
  return new Promise((resolve, reject) => {
    fs.readdir('./dist/patches', (err, files) => {
      if (err) reject(err);
      logger.info('Got patches.');
      resolve(files);
    });
  });
}

/**
 * @description Updates the patchFile so that `patch-package` can notice them from node_modules directory
 *
 * @param {string} file - Path to the patch file
 * @returns {Promise<void>}
 */
async function updatePatchFile(file) {
  const logger = logger.getLogger();
  logger.info(`Updating ${file}...`);
  return new Promise((resolve, reject) => {
    fs.readFile(`./dist/patches/${file}`, 'utf8', (err, data) => {
      if (err) reject(err);
      const newData = data.replaceAll('node_modules', '..');
      fs.writeFile(`./dist/patches/${file}`, newData, 'utf8', (err) => {
        if (err) reject(err);
        logger.info(`Updated ${file}`);
        resolve();
      });
    });
  });
}

async function main() {
  logger.getLogger().info('Start building patches...');
  const patches = await getPatches();
  return Promise.all(patches.map((patchFile) => updatePatchFile(patchFile)));
}

main().then(() => logger.getLogger().info('Done.'));
