const LevelCard = require('./LevelCard.js')

class LevelsList {
  constructor(data) {
    this.dataPalaceholder = {
      levelsList: [{}]
    }

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('level-list');

    this.levelsList = [];



    // levelCard.render().onclick =  () => {
    //   levelCard.setData({
    //     imgSrc: '/src/assets/img/jpg/square/0.jpg', 
    //     levelTitle: 'Level 1',
    //     levelStats: 'Done 0/10',
    //     levelId: 1
    //   });
    // };

    this.setData(data);
  }

  setData(data) {
    console.log(data);
    (data && Object.keys(data).length >= 1) ? this.data = data : this.data = this.dataPalaceholder;
    this.levelsList = [];
    this.rootEl.innerHTML = "";
    this.data.levelsList.forEach((levelData) => {
      let levelCard = new LevelCard();
      levelCard.setData(levelData);
      this.levelsList.push(levelCard);
      this.rootEl.append(levelCard.render());
    });
  }

  render() {
    return this.rootEl;
  }
}

module.exports = LevelsList