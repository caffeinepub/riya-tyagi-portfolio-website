/**
 * Admin Token Generator for Caffeine Portfolio
 * 
 * This script generates a secure admin token that can be used to provision
 * admin access to the Messages page.
 * 
 * Usage:
 * 1. Run this script to generate a token
 * 2. Copy the generated URL
 * 3. Open the URL in your browser while logged in with Internet Identity
 * 4. The token will be stored in your session and you'll have admin access
 * 
 * Security Notes:
 * - The token is passed via URL hash fragment (not query params)
 * - Hash fragments are not sent to servers or logged in access logs
 * - The token is automatically removed from the URL after extraction
 * - The token is stored in sessionStorage for the duration of your session
 */

import crypto from 'crypto';

function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

function main() {
  const token = generateSecureToken(32);
  
  console.log('\n=================================================');
  console.log('🔐 Caffeine Admin Token Generator');
  console.log('=================================================\n');
  
  console.log('Your admin token has been generated:\n');
  console.log(`Token: ${token}\n`);
  
  console.log('To provision admin access:\n');
  console.log('Option 1 (Recommended - Auto-inject via UI):');
  console.log('  1. Log in to your app with Internet Identity');
  console.log('  2. Navigate to the Messages page');
  console.log('  3. Click the "Enable Admin Access" button');
  console.log('  4. The token will be automatically configured\n');
  
  console.log('Option 2 (Manual - URL hash):');
  console.log('  1. Log in to your app with Internet Identity');
  console.log('  2. Navigate to: https://your-app.com/messages#caffeineAdminToken=' + token);
  console.log('  3. The token will be stored in your session\n');
  
  console.log('Security Features:');
  console.log('  ✓ Hash fragments are not sent to servers');
  console.log('  ✓ Not logged in server access logs');
  console.log('  ✓ Not sent in HTTP Referer headers');
  console.log('  ✓ Automatically cleared from URL after extraction');
  console.log('  ✓ Stored in sessionStorage for session duration\n');
  
  console.log('=================================================\n');
}

main();
