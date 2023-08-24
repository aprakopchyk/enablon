class StringUtils {
  static extractNumberFromText(text) {
    return parseInt(text.replace(/\D/g, ""), 10);
  }
}

module.exports = StringUtils;
