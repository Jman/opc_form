import AdmZip from 'adm-zip';
import { readFile } from 'fs/promises';
// import { version } from '../package.json' assert { type: 'json' };

async function loadJson(path) {
  const url = new URL(path, import.meta.url);
  const json = await readFile(url);
  return JSON.parse(json);
}

async function createZipArchive(input, output) {
  const zip = new AdmZip();
  try {
    zip.addLocalFolder(input);
    zip.writeZip(output);
    console.log(`Created ${output} successfully`);
  } catch (error) {
    console.log(`Something went wrong. ${error}`);
  }
}

const { version } = await loadJson('../package.json');
console.log(version);
createZipArchive('dist', `${version}.zip`);
