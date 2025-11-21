module.exports = {
  apps: [
    {
      name: 'kaspa-nexus-v3',
      cwd: '/var/www/kaspa-nexus-v3',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/kaspa-nexus-v3-error.log',
      out_file: '/var/log/pm2/kaspa-nexus-v3-out.log',
      log_file: '/var/log/pm2/kaspa-nexus-v3-combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
