const testData = require("../testData/testData");
const logger = require("../../framework/utils/logger");
const config = require("../../framework/utils/config");
const testCasesStatus = require("../../framework/utils/testCasesStatuses");
const MainPage = require("../pageobjects/mainPage");
const url = require("../../framework/constants/urls");
const browserKeys = require("../../framework/constants/browserKeys");
const Browser = require("../../framework/utils/browser");
const { expect } = require("chai");

describe("Todo task", () => {
  before(async function () {
    logger.info("Starting test suite");
    Browser.openUrl(url.urls.baseURL);
    expect(
      await MainPage.isUniqueElementVisible(config.config.waitforTimeout)
    ).to.be.true;
  });

  beforeEach(async function () {
    const tasks = await MainPage.getAllTasks();
    if (tasks && tasks.length > 0) {
      for (let task of tasks) {
        await MainPage.removeTask(task);
      }
    }
    const testCaseName = this.currentTest.title;
    logger.info(`Test case starts: ${testCaseName}`);
  });

  afterEach(async function () {
    if (this.currentTest.state === testCasesStatus.failed) {
      logger.error(`Test failed: ${this.currentTest.title}`);
    }
  });

  // Positive Checks
  logger.info("Running positive checks");

  it("Selected element verification", async () => {
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);

    await MainPage.checkboxSelection();
    expect(await MainPage.getElementTextDecoration()).to.include(
      testData.testDataValues.textDecoration
    );
  });

  it("1 task adding and 1 task removing using 'X'", async () => {
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    expect(await MainPage.getTasksNumber()).to.equal(
      testData.testDataValues.oneTaskNumber
    );
    await MainPage.removeTask();
    expect(await MainPage.taskIsHidden()).to.be.true;
  });

  it("5 tasks adding and 5 tasks removing using 'X'", async () => {
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    expect(await MainPage.getTasksNumber()).to.equal(
      testData.testDataValues.fiveTasksNumber
    );

    await MainPage.removeTask();
    await MainPage.removeTask();
    await MainPage.removeTask();
    await MainPage.removeTask();
    await MainPage.removeTask();
    expect(await MainPage.taskIsHidden()).to.be.true;
  });

  it("5 tasks adding and 5 tasks removing using 'Clear completed'", async () => {
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);

    await MainPage.checkboxesSelection();
    expect(await MainPage.getTasksNumber()).to.equal(
      testData.testDataValues.zeroTaskNumber
    );

    await MainPage.removeSelectedTasks();
    expect(await MainPage.taskIsHidden()).to.be.true;
  });

  it("2 tasks adding and 1 task removing using 'Clear completed'", async () => {
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);

    await MainPage.checkboxSelection();
    expect(await MainPage.getTasksNumber()).to.equal(
      testData.testDataValues.oneTaskNumber
    );

    await MainPage.removeSelectedTasks();
    expect(await MainPage.taskIsHidden()).to.be.false;
    expect(await MainPage.getTasksNumber()).to.equal(
      testData.testDataValues.oneTaskNumber
    );
  });

  it("Edit verification", async () => {
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    const taskName = await MainPage.getTaskName();

    await MainPage.doubleClickOnTaskName();
    await MainPage.editTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    const editedTaskName = await MainPage.getTaskName();
    expect(editedTaskName).not.to.equal(taskName);
  });

  // Negative Checks
  logger.info("Running negative checks");

  it("Empty task adding", async () => {
    await MainPage.enterTaskName(testData.testDataValues.emptyData);
    await Browser.sendKeys(browserKeys.keys.enter);
    expect(await MainPage.taskIsHidden()).to.be.true;
  });

  it("Task adding with already added name", async () => {
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.enterTaskName(MainPage.taskName);
    await Browser.sendKeys(browserKeys.keys.enter);
    expect(await MainPage.taskIsHidden()).to.be.false;
    expect(await MainPage.getTasksNumber()).to.equal(
      testData.testDataValues.twoTaskNumber
    );
  });

  it("Task adding with the same name as deleted task has", async () => {
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    await MainPage.removeTask();

    await MainPage.enterTaskName(MainPage.taskName);
    await Browser.sendKeys(browserKeys.keys.enter);

    expect(await MainPage.taskIsHidden()).to.be.false;
    expect(await MainPage.getTasksNumber()).to.equal(
      testData.testDataValues.oneTaskNumber
    );
  });

  it("Long name task adding (more than 256 symbols)", async () => {
    await MainPage.enterLongTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    expect(await MainPage.taskIsHidden()).to.be.false;
    expect(await MainPage.getTasksNumber()).to.equal(
      testData.testDataValues.oneTaskNumber
    );
  });

  it("Long name task adding (special symbols and not Latin letters)", async () => {
    await MainPage.enterSpecialAndNotLatinTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    expect(await MainPage.taskIsHidden()).to.be.false;
    expect(await MainPage.getTasksNumber()).to.equal(
      testData.testDataValues.oneTaskNumber
    );
  });

  it("Task name removing", async () => {
    await MainPage.enterTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);

    await MainPage.doubleClickOnTaskName();
    await MainPage.clearTaskName();
    await Browser.sendKeys(browserKeys.keys.enter);
    expect(await MainPage.taskIsHidden()).to.be.false;
  });
});
