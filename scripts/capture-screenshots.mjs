import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const baseUrl = 'http://localhost:3000';
  const screenshotsDir = join(__dirname, '..', 'docs', 'screenshots');

  const pages = [
    { name: 'dashboard', path: '/dashboard', title: 'Dashboard' },
    { name: 'campaigns', path: '/campaigns', title: 'Campaigns' },
    { name: 'reports', path: '/reports', title: 'Reports' },
    { name: 'integrations', path: '/integrations', title: 'Integrations' },
    { name: 'settings', path: '/settings', title: 'Settings' }
  ];

  console.log('📸 Capturing screenshots...\n');

  // Capture light mode screenshots
  for (const pageInfo of pages) {
    console.log(`Capturing ${pageInfo.title} (Light Mode)...`);
    await page.goto(`${baseUrl}${pageInfo.path}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for animations
    await page.screenshot({
      path: `${screenshotsDir}/${pageInfo.name}-light.png`,
      fullPage: false
    });
  }

  // Toggle to dark mode
  console.log('\n🌙 Switching to dark mode...\n');
  await page.goto(`${baseUrl}/dashboard`);
  await page.waitForLoadState('networkidle');

  // Click the theme toggle button
  await page.click('[aria-label="Toggle theme"]');
  await page.waitForTimeout(500);

  // Capture dark mode screenshots
  for (const pageInfo of pages) {
    console.log(`Capturing ${pageInfo.title} (Dark Mode)...`);
    await page.goto(`${baseUrl}${pageInfo.path}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for animations
    await page.screenshot({
      path: `${screenshotsDir}/${pageInfo.name}-dark.png`,
      fullPage: false
    });
  }

  // Capture a campaign detail page
  console.log('\n📋 Capturing Campaign Detail page...\n');
  await page.goto(`${baseUrl}/campaigns`);
  await page.waitForLoadState('networkidle');
  await page.click('[aria-label="Toggle theme"]'); // Switch back to light mode
  await page.waitForTimeout(500);
  await page.goto(`${baseUrl}/campaigns/1`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: `${screenshotsDir}/campaign-detail-light.png`,
    fullPage: false
  });

  await browser.close();
  console.log('\n✅ All screenshots captured successfully!\n');
}

captureScreenshots().catch(console.error);
