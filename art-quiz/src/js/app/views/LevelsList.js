const LevelCard = require('./components/main/LevelCard.js');
const PathBus = require('../services/PathBus');
class LevelsList {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('level-list');

    this.levelsList = [];
  }

  setData(data) {
    if (data) {
      console.log(data);
      this.levelsList = [];
      this.rootEl.innerHTML = '';
      data.levelsList.forEach((levelData) => {
        let levelCard = new LevelCard();
        levelCard.setData(levelData);
        this.levelsList.push(levelCard);
        if (!levelData.isLocked) {
          levelCard.render().onclick = () => {
            PathBus.setCurrentPath('/game/level/' + levelData.id);
          };
        }
  
        this.rootEl.append(levelCard.render());
      });
    }

  }

  render() {
    return this.rootEl;
  }
}

module.exports = LevelsList;
