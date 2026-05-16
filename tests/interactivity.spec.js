const { test, expect } = require('@playwright/test');

test('Tabs can switch state', async ({ page }) => {
  await page.goto('http://localhost:3000/festival');
  await page.waitForTimeout(3000); 
  
  // Verify initial active tab is 2024
  const btn2024 = page.locator('button.festival-tab:has-text("2024")');
  await expect(btn2024).toHaveClass(/active/);

  // Click 2023
  const btn2023 = page.locator('button.festival-tab:has-text("2023")');
  await btn2023.click();
  console.log('Clicked 2023');
  
  await page.waitForTimeout(1000);
  
  // Verify 2023 is now active and 2024 is not
  await expect(btn2023).toHaveClass(/active/);
  await expect(btn2024).not.toHaveClass(/active/);
});
