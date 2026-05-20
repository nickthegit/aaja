const { test, expect } = require('@playwright/test')

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

  test('images are visible after grid renders', async ({ page }) => {
    await page.goto('/festival')

    // Wait for the grid to finish rendering — it starts at opacity:0 and gets .is-ready when done
    await expect(page.locator('.grid-container.is-ready')).toBeVisible({ timeout: 10000 })

    // At least one media item should be visible inside the ready grid
    const firstItem = page.locator('.grid-container.is-ready .item .aaja-media')
    await expect(firstItem.first()).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Festival Page Tabs - Mobile', () => {
  test('can switch year tabs', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
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

  test('images are visible after grid renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/festival')

    await expect(page.locator('.grid-container.is-ready')).toBeVisible({ timeout: 10000 })

    const firstItem = page.locator('.grid-container.is-ready .item .aaja-media')
    await expect(firstItem.first()).toBeVisible({ timeout: 10000 })
  })
})
