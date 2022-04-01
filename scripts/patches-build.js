const fs = require('fs');
/**
 * @description Read the patches from the patches directory
 *
 * @returns {Promise<Array<string>>}
 */
async function getPatches() {
  console.log('Getting patches...');
  return new Promise((resolve, reject) => {
    fs.readdir('./dist/patches', (err, files) => {
      if (err) reject(err);
      console.log('Got patches.');
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
  console.log(`Updating ${file}...`);
  return new Promise((resolve, reject) => {
    fs.readFile(`./dist/patches/${file}`, 'utf8', (err, data) => {
      if (err) reject(err);
      const newData = data.replaceAll('node_modules', '..');
      fs.writeFile(`./dist/patches/${file}`, newData, 'utf8', (err) => {
        if (err) reject(err);
        console.log(`Updated ${file}`);
        resolve();
      });
    });
  });
}

async function main() {
  console.log('Start building patches...');
  const patches = await getPatches();
  return Promise.all(patches.map((patchFile) => updatePatchFile(patchFile)));
}

main().then(() => console.log('Done.'));
