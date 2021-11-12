const translate = require("@vitalets/google-translate-api");
const imagesData = require("./assets/json/images.json");
const fs = require("fs");
const { resolve } = require("path");

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//Add translation to images.json

const createTranslate = (imagesDataArray) => {
  let result = Promise.all(
    imagesDataArray.map(async (el) => {
      let result = { ...el };
      let translationObj = await translate(`${el.author}: ${el.name}`, { from: "ru", to: "en" });
      let translationAuthor = translationObj.text.split(": ")[0];
      let translationName = capitalizeFirstLetter(translationObj.text.split(": ")[1]);

      result.author = {en: translationAuthor, ru: el.author};
      result.name = {en: translationName, ru: el.name};
      return result;
    })
  );
  return result;
};

const finalPath = resolve(__dirname, "./assets/json/");
createTranslate(imagesData.data).then((result) => {
  fs.writeFile(finalPath + '/imagesTranslated.json', JSON.stringify({data: result}), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
  console.log(result);
});


//Reame to normal id's full size images
const imageDirPath = resolve(__dirname, "./assets/img/jpg/full/");
const files = fs.readdirSync(imageDirPath);
files.forEach((file) => fs.rename(imageDirPath + `/${file}`, imageDirPath + `/${file.replace("full", "")}`, (err) => console.log(err)));
