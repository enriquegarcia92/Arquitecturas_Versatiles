import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  const base_config_routes = process.env[`VITE_BASE_ROUTES`];
  const base_config_port = process.env[`VITE_BASE_PORT`]
  return {
    plugins: [react()],
    server: {
      port: parseInt(base_config_port as string, 10),
    },
    base: base_config_routes // Use the environment variable
  };
});