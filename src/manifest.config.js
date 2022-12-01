import { defineManifest } from '@crxjs/vite-plugin';
import { version, name, description } from '../package.json';

const [major, minor, patch, label = '0'] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.mode === 'development' ? name : 'Magento Form Filler',
  description: `${description.split('. ')[0]}.`,
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  permissions: ['activeTab', 'storage', 'scripting'],
  action: {
    default_title: 'Click to fill out form',
    default_icon: {
      19: 'src/images/logo_19.png',
      48: 'src/images/logo_48.png',
      128: 'src/images/logo_128.png',
    },
    default_popup: 'src/popup.html',
  },
  background: {
    service_worker: 'src/background.js',
    type: 'module',
  },
  options_page: 'src/options.html',
  icons: {
    48: 'src/images/logo_48.png',
    128: 'src/images/logo_128.png',
  },
}));
