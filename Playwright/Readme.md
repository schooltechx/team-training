# Playwright


## Install

- ติดตั้ง [LetxPath](https://chrome.google.com/webstore/detail/letxpath/bekehlnepmijedippfibbmbglglbmlgk) ใน chrome เพื่อดู selector สำหรับการทดสอบได้งายขึ้น 

- ติดตั้ง Playwright [ตามในเวป](https://playwright.dev/docs/intro) สำหรับผู้เริ่มใช้ให้ติดตั้งบน วินโดว์หรือ macOS เพราะจะได้ลองใช้แบบมีหน้าจอ Graphic ถ้าเป็นการใช้แบบไม่มีหน้าจอให้เห็นจะเรียกว่า headless เหมาะกับการทดสอบผ่านสคริปต์ CI/CD 
``` bash
mkdir Playwright
cd Playwright
npm init playwright@latest
Need to install the following packages:
  create-playwright@1.17.131
Ok to proceed? (y) y
Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
√ Do you want to use TypeScript or JavaScript? · TypeScript
√ Where to put your end-to-end tests? · tests
√ Add a GitHub Actions workflow? (y/N) · false
√ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
Initializing NPM project (npm init -y)…
Wrote to C:\dev\frappet\team-training\Playwright\package.json:

{
  "name": "playwright",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}


Installing Playwright Test (npm install --save-dev @playwright/test)…

added 3 packages, and audited 4 packages in 4s

found 0 vulnerabilities
Installing Types (npm install --save-dev @types/node)…

added 2 packages, and audited 6 packages in 2s

found 0 vulnerabilities
Downloading browsers (npx playwright install)…
Removing unused browser at C:\Users\sorawit_frappet\AppData\Local\ms-playwright\ffmpeg-1008
Downloading Chromium 120.0.6099.28 (playwright build v1091) from https://playwright.azureedge.net/builds/chromium/1091/chromium-win64.zip
122 Mb [====================] 100% 0.0s
Chromium 120.0.6099.28 (playwright build v1091) downloaded to C:\Users\sorawit_frappet\AppData\Local\ms-playwright\chromium-1091
Downloading FFMPEG playwright build v1009 from https://playwright.azureedge.net/builds/ffmpeg/1009/ffmpeg-win64.zip
1.4 Mb [====================] 100% 0.0s
FFMPEG playwright build v1009 downloaded to C:\Users\sorawit_frappet\AppData\Local\ms-playwright\ffmpeg-1009
Downloading Firefox 119.0 (playwright build v1429) from https://playwright.azureedge.net/builds/firefox/1429/firefox-win64.zip
80.5 Mb [====================] 100% 0.0s
Firefox 119.0 (playwright build v1429) downloaded to C:\Users\sorawit_frappet\AppData\Local\ms-playwright\firefox-1429
Downloading Webkit 17.4 (playwright build v1944) from https://playwright.azureedge.net/builds/webkit/1944/webkit-win64.zip
46.4 Mb [====================] 100% 0.0s
Webkit 17.4 (playwright build v1944) downloaded to C:\Users\sorawit_frappet\AppData\Local\ms-playwright\webkit-1944
Writing playwright.config.ts.
Writing tests\example.spec.ts.
Writing tests-examples\demo-todo-app.spec.ts.
Writing package.json.
✔ Success! Created a Playwright Test project at C:\dev\frappet\team-training\Playwright      

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - .\playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭
```

ไฟล์ [playwright.config.ts](./playwright.config.ts) ให้เพิ่ม headless:false เพื่อให้แสดง Browser ให้เห็น(default เป็น headless)

```
export default defineConfig({
  ...
  use: {
    headless:false,
    ...
  }
})
...
```
ในโฟลเดอร์ tests ลบตัวอย่างออกแล้วสร้าง [login.spec.ts](./tests/login.spec.ts) เป็นตัวอย่างการใช้งาน
ทดสอบบน chromium และ แสดงรายงานการทดสอบ
```
# ถ้า clone มาเรียกคำสั่งนี้ก่อน เพื่อติดตั้ง driver
npx playwright install
npx playwright test --project=chromium
npx playwright show-report

```


## อ่านเพิ่มเติม

- [Playwright Selector](https://playwright.dev/docs/api/class-selectors)
- [Complete Playwright Testing Tutorial | An End to End Playwright with TypeScript Course 🎭| LambdaTest
](https://www.youtube.com/watch?v=wawbt1cATsk&list=PLZMWkkQEwOPlS6BSWWqaAIrSNf_Gw4MQ1)