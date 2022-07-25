const fs = require('fs');

const cleanDocs = () => {
  console.log(`[Info] cleaning docs`);

  try {
    fs.unlinkSync('./docs/index.md');
    console.log(`[Info] index file deleted`);
  } catch (error) {
    console.warn(`[Warn] cleaning docs: ${error?.message}`);
  }

  try {
    fs.unlinkSync('./docs/LICENSE');
    console.log(`[Info] license file deleted`);
  } catch (error) {
    console.warn(`[Warn] cleaning docs: ${error?.message}`);
  }

  try {
    fs.rmSync('./docs/api', { recursive: true });
    console.log(`[Info] api directory deleted`);
  } catch (error) {
    console.warn(`[Warn] cleaning docs: ${error?.message}`);
  }

  console.log(`[Info] docs cleaned`);
};

const copyToDocs = () => {
  console.log(`[Info] copying readme to docs`);
  fs.copyFileSync('./README.md', './docs/index.md');
  console.log(`[Info] readme copied`);

  console.log(`[Info] copying license to docs`);
  fs.copyFileSync('./LICENSE', './docs/LICENSE');
  console.log(`[Info] license copied`);
};

const adjustDocsIndex = () => {
  console.log(`[Info] adjusting docs index`);
  let content = fs.readFileSync('./docs/index.md', 'utf8');

  content = content.replace(
    '/docs/images/EnergyWeb_logo.png',
    'images/EnergyWeb_logo.png'
  );

  content = content.replace(/\(\.\/docs\/guides\/\w+\.md\)/g, function (match) {
    return match.replace('docs/', '');
  });

  fs.writeFileSync('./docs/index.md', content);
  console.log(`[Info] docs index adjusted`);
};

const bootstrapDocs = () => {
  console.log(`[Info] bootstrapping docs`);

  cleanDocs();
  copyToDocs();
  adjustDocsIndex();

  console.log(`[Info] docs bootstrapped`);
  console.log(
    `[Info] don't forgot to run \`typedoc --plugin typedoc-plugin-markdown --hideBreadcrumbs true\` to generate the API docs`
  );
};

bootstrapDocs();
