class StringUtils {
  static async extractNumberFromText(text) {
    return parseInt(text.replace(/,/g, ""), 10);
  }
}

module.exports = StringUtils;
