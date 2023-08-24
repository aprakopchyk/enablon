const logger = require("../framework/utils/logger");

class BaseElement {
  constructor(locator, name) {
    if (this.constructor == BaseElement) {
      throw new Error("Abstracted classes cant be instantiated");
    }
    this.locator = locator;
    this.name = name;
  }

  async getElement() {
    try {
      const element = await $(this.locator);
      logger.info(`Element: ${this.name} was fetched`);
      return element;
    } catch (error) {
      logger.error(`Element: ${this.name} can't be found`);
      throw error;
    }
  }

  async getAllElements() {
    try {
      const elements = await $$(this.locator);
      logger.info(`Elements: ${this.name} were fetched`);
      return elements;
    } catch (error) {
      logger.error(`Elements: ${this.name} can't be found`);
      throw error;
    }
  }

  async waitForDisplayed(timeout) {
    const element = await this.getElement();
    try {
      await element.waitForDisplayed({ timeout });
      logger.info(`Element: ${this.name} was found and is displayed`);
      return true;
    } catch (error) {
      logger.error(`Element: ${this.name} was not found`);
      return false;
    }
  }

  async waitForElementToBeNotDisplayed(timeout) {
    const element = await this.getElement();
    try {
      await element.waitForDisplayed({ timeout, reverse: true });
      logger.info(`Element: ${this.name} was not found and is not displayed`);
      return true;
    } catch (error) {
      logger.error(`Element: ${this.name} is still displayed`);
      return false;
    }
  }

  async click() {
    try {
      const element = await this.getElement();
      logger.info(`Clicking on element: ${this.name}`);
      return element.click();
    } catch (error) {
      logger.error(`Error clicking on element: ${this.name}`);
      throw error;
    }
  }

  async clickOnAllElements() {
    try {
      const elements = await this.getAllElements();
      logger.info(`Clicking on elements: ${this.name}`);
      for (let element of elements) {
        await element.click();
      }
    } catch (error) {
      logger.error(`Error clicking on elements: ${this.name}`);
      throw error;
    }
  }

  async doubleClick() {
    try {
      const element = await this.getElement();
      logger.info(`Double clicking on element: ${this.name}`);
      return element.doubleClick();
    } catch (error) {
      logger.error(`Error during double clicking on element: ${this.name}`);
      throw error;
    }
  }

  async moveTo() {
    try {
      const element = await this.getElement();
      logger.info(`Moving to element: ${this.name}`);
      return element.moveTo();
    } catch (error) {
      logger.error(`Error moving to element: ${this.name}`);
      throw error;
    }
  }

  async getText() {
    try {
      const element = await this.getElement();
      logger.info(`Getting the text of element: ${this.name}`);
      return element.getText();
    } catch (error) {
      logger.error(`Error getting text from element: ${this.name}`);
      throw error;
    }
  }

  async getCSSProperty(value) {
    try {
      const element = await this.getElement();
      logger.info(`Getting the CSS of element: ${this.name}`);
      return element.getCSSProperty(value);
    } catch (error) {
      logger.error(`Error getting CSS property from element: ${this.name}`);
      throw error;
    }
  }
}

module.exports = BaseElement;
