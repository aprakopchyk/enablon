class ArrayUtils {
  static generateTaskName() {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const taskName = Array.from({ length: 10 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
    return taskName;
  }

  static generateLongTaskName() {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const longTaskName = Array.from({ length: 257 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
    return longTaskName;
  }

  static generateSpecialAndNonLatinTaskName() {
    const specialChars = "!@#$%^&*()_+{}:\"<>?~\\-=[];',.";
    const nonLatinChars = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    const combinedChars = specialChars + nonLatinChars;
    const specialAndNonLatinTaskName = Array.from({ length: 100 }, () =>
      combinedChars.charAt(Math.floor(Math.random() * combinedChars.length))
    ).join("");
    return specialAndNonLatinTaskName;
  }
}

module.exports = ArrayUtils;
