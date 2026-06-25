const fs = require('fs');
const path = require('path');

class ScreenshotPage {
    constructor(driver) {
        this.driver = driver;
        this.screenshotDir = path.join(__dirname, '..', 'screenshots', 'current');
    }

    async takeFullScreenshot(filename) {
        const screenshot = await this.driver.takeScreenshot();
        const screenshotPath = path.join(this.screenshotDir, filename);
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        return screenshotPath;
    }
}
module.exports = ScreenshotPage;