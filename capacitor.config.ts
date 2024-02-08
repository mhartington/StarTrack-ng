import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.startrack.app',
  appName: 'Star Track',
  webDir: 'dist/browser',
  backgroundColor: '#000000FF',
  server: {
    allowNavigation: ['*'],
  },
  plugins: {
    LocalNotifications: {},
    Keyboard: { resize: 'none', style: 'dark' },
  },
};

export default config;
