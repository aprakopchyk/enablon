const ArrayUtils = require("../../framework/utils/arrayUtils");
const StringUtils = require("../../framework/utils/stringUtils");
const BasePage = require("../../framework/basePage");
const Label = require("../../framework/commonElements/label");
const Input = require("../../framework/commonElements/input");
const Link = require("../../framework/commonElements/link");
const Checkbox = require("../../framework/commonElements/checkbox");
const Button = require("../../framework/commonElements/button");

class MainPage extends BasePage {
  constructor() {
    super(
      new Label("//section[contains(@class, 'todoapp')]", "Page identificator")
    );
    this.inputField = new Input(
      "//input[contains(@class, 'new-todo')]",
      "Input field"
    );
    this.addedTask = new Input("//div[@class='view']/label", "Added task");
    this.editedTask = new Input(
      "//input[contains(@class, 'edit')]",
      "Edited task"
    );
    this.removeIcon = new Link(
      "//button[contains(@class, 'destroy')]",
      "Remove X icon"
    );
    this.tasksAmount = new Label(
      "//span[contains(@class, 'todo-count')]/strong",
      "Tasks amount"
    );
    this.toggleCheckbox = new Checkbox(
      "//input[@class='toggle' and @type='checkbox']",
      "Toggle checkbox"
    );
    this.clearCompletedButton = new Button(
      "//button[contains(@class, 'clear')]",
      "Clear link"
    );
  }

  async enterTaskName(value) {
    if (!value) {
      this.taskName = await ArrayUtils.generateTaskName();
      await this.inputField.setValue(this.taskName);
    } else {
      await this.inputField.setValue(value);
    }
  }

  async enterLongTaskName() {
    this.taskName = await ArrayUtils.generateLongTaskName();
    await this.inputField.setValue(this.taskName);
  }

  async enterSpecialAndNotLatinTaskName() {
    this.taskName = await ArrayUtils.generateSpecialAndNonLatinTaskName();
    await this.inputField.setValue(this.taskName);
  }

  async getTaskName() {
    return await this.addedTask.getText();
  }

  async editTaskName() {
    this.taskName = await ArrayUtils.generateTaskName();
    await this.editedTask.setValue(this.taskName);
  }

  async clearTaskName() {
    this.taskName = await ArrayUtils.generateTaskName();
    await this.editedTask.clearValue(this.taskName);
  }

  async removeTask(value) {
    if (!value) {
      await this.addedTask.moveTo();
      await this.removeIcon.click();
    } else {
      await value.moveTo();
      await this.removeIcon.click();
    }
  }

  async getAllTasks() {
    return await this.addedTask.getAllElements();
  }

  async getTasksNumber() {
    const tasksAmountText = await this.tasksAmount.getText();
    return StringUtils.extractNumberFromText(tasksAmountText);
  }

  async taskIsHidden() {
    return await this.addedTask.waitForElementToBeNotDisplayed();
  }

  async checkboxesSelection() {
    await this.toggleCheckbox.clickOnAllElements();
  }

  async checkboxSelection() {
    await this.toggleCheckbox.click();
  }

  async removeSelectedTasks() {
    await this.clearCompletedButton.click();
  }

  async doubleClickOnTaskName() {
    await this.addedTask.doubleClick();
  }

  async getElementTextDecoration() {
    const textDecoration = await this.addedTask.getCSSProperty(
      "text-decoration"
    );
    return textDecoration.value;
  }
}

module.exports = new MainPage();
