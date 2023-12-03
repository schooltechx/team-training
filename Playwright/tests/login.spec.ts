import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
  await page.goto('https://edm.frappet.synology.me');
  await expect(page).toHaveTitle("Sign in to EDM");
  await page.fill("input[name='username']","oom")
  await page.fill("input[name='password']","oom")
  await page.click("input[name='login']")
  await page.waitForTimeout(5000)
  await page.click("(//div[@role='toolbar']//button)[1]")
  await page.waitForTimeout(2000)
  await page.click("//div[text()='Logout']")
  await page.waitForTimeout(4000)
  await expect(page).toHaveTitle("Sign in to EDM");
});
