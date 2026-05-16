const { test, expect, devices } = require('@playwright/test');

test.describe('Festival Page Tabs', () => {
  test('Desktop: can switch year tabs', async ({ page }) => {
    await page.goto('http://100.87.225.5:3000/festival');
    await page.waitForTimeout(2000);
    
    // Find the 2023 button
    const btn2023 = page.locator('button:has-text("2023")');
    await expect(btn2023).toBeVisible();
    
    // Check initial state (assuming 2024 is default)
    const btn2024 = page.locator('button:has-text("2024")');
    await expect(btn2024).toHaveClass(/active/);
    await expect(btn2023).not.toHaveClass(/active/);
    
    // Click 2023
    console.log('Clicking 2023 on Desktop...');
    await btn2023.click();
    
    // Verify update
    await expect(btn2023).toHaveClass(/active/);
    await expect(btn2024).not.toHaveClass(/active/);
  });

  test('Mobile: can switch year tabs', async ({ browser }) => {
    const context = await browser.newContext(devices['iPhone 12']);
    const page = await context.newPage();
    await page.goto('http://100.87.225.5:3000/festival');
    await page.waitForTimeout(2000);
    
    const btn2023 = page.locator('button:has-text("2023")');
    await expect(btn2023).toBeVisible();
    
    console.log('Tapping 2023 on Mobile...');
    await btn2023.tap(); // Using tap for mobile
    
    await expect(btn2023).toHaveClass(/active/);
  });
});
