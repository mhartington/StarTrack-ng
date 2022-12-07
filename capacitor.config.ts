import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.startrack.app',
  appName: 'Star Track',
  bundledWebRuntime: false,
  webDir: 'dist/browser',
  backgroundColor: '#000000FF',
  plugins: {
    LocalNotifications: {
    },
    Keyboard: {
      resize: 'none',
      style: 'dark',
    },
  },
};

export default config;
