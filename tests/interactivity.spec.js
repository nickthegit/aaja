const { test, expect } = require('@playwright/test')

test('Festival tabs update active state on click', async ({ page }) => {
  await page.goto('/festival')

  const tabs = page.locator('.festival-tab')
  await expect(tabs.first()).toBeVisible()

  const firstTab = tabs.first()
  const secondTab = tabs.nth(1)

  await expect(firstTab).toHaveClass(/active/)

  await secondTab.click()

  await expect(secondTab).toHaveClass(/active/)
  await expect(firstTab).not.toHaveClass(/active/)
})
