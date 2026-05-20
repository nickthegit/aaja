const { test, expect, devices } = require('@playwright/test')

test.describe('Festival Page Tabs - Desktop', () => {
  test('can switch year tabs', async ({ page }) => {
    await page.goto('/festival')

    const tabs = page.locator('.festival-tab')
    await expect(tabs.first()).toBeVisible()

    const firstTab = tabs.first()
    const secondTab = tabs.nth(1)

    await expect(firstTab).toHaveClass(/active/)
    await expect(secondTab).not.toHaveClass(/active/)

    await secondTab.click()

    await expect(secondTab).toHaveClass(/active/)
    await expect(firstTab).not.toHaveClass(/active/)
  })
})

test.describe('Festival Page Tabs - Mobile', () => {
  test.use({ ...devices['iPhone 12'] })

  test('can switch year tabs', async ({ page }) => {
    await page.goto('/festival')

    const tabs = page.locator('.festival-tab')
    await expect(tabs.first()).toBeVisible()

    const firstTab = tabs.first()
    const secondTab = tabs.nth(1)

    await expect(firstTab).toHaveClass(/active/)

    await secondTab.tap()

    await expect(secondTab).toHaveClass(/active/)
    await expect(firstTab).not.toHaveClass(/active/)
  })
})
