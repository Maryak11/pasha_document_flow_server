const CyrillicToTranslit = require("cyrillic-to-translit-js");
const cyrillicToTranslit = new CyrillicToTranslit();

const translit = (str) => {
  return cyrillicToTranslit.transform(str);
};

const asyncFilter = async (arr, callback) => {
  const fail = Symbol();
  return (
    await Promise.all(arr.map(async (item) => ((await callback(item)) ? item : fail)))
  ).filter((i) => i !== fail);
};

const translitFileName = (file) => {
  const fullname = translit(file)
    .toLowerCase()
    .replace(/[^\d\wа-яё_.]+/gi, "");
  const filename =
    fullname.split(".").slice(0, -1).join(".").slice(0, 80) + "." + fullname.split(".").pop();
  return filename;
};

const prepareDescription = (str) => {
  const parsed = str.replace(/\s+/g, " ").substring(0, 160).split(" ");

  parsed.splice(-1, 1);

  while (parsed.join(" ").length > 156) {
    parsed.splice(-1, 1);
  }

  parsed.push("...");
  return parsed.join(" ");
};

module.exports = {
  translit,
  asyncFilter,
  translitFileName,
  prepareDescription
}
