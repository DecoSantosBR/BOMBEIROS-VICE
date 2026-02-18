#!/usr/bin/env node

/**
 * Script de start inteligente para Railway
 * Detecta qual serviço rodar baseado na variável de ambiente SERVICE_TYPE
 * 
 * Uso:
 * - Serviço Web: SERVICE_TYPE=web node start.js
 * - Serviço Bot: SERVICE_TYPE=bot node start.js
 */

const { spawn } = require('child_process');
const path = require('path');

const SERVICE_TYPE = process.env.SERVICE_TYPE || 'web';

console.log('='.repeat(60));
console.log('🚀 Railway Start Script');
console.log('='.repeat(60));
console.log('SERVICE_TYPE:', SERVICE_TYPE);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('='.repeat(60));

let scriptPath;

if (SERVICE_TYPE === 'bot') {
  scriptPath = path.join(__dirname, 'dist', 'bot-standalone.js');
  console.log('🤖 Starting Discord Bot...');
} else {
  scriptPath = path.join(__dirname, 'dist', 'index.js');
  console.log('🌐 Starting Web Server...');
}

console.log('Script path:', scriptPath);
console.log('='.repeat(60));

// Spawn do processo Node.js
const child = spawn('node', [scriptPath], {
  stdio: 'inherit',
  env: process.env,
});

child.on('error', (error) => {
  console.error('❌ Failed to start service:', error);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`❌ Service exited with code ${code} and signal ${signal}`);
    process.exit(code || 1);
  }
  console.log('✅ Service exited successfully');
  process.exit(0);
});

// Encaminhar sinais de terminação
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, forwarding to child process...');
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, forwarding to child process...');
  child.kill('SIGINT');
});
