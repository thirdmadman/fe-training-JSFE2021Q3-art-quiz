import LevelCard from './components/main/LevelCard';
import PathBus from '../services/PathBus';

export default class LevelsList {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('level-list');

    this.levelsList = [];
  }

  setData(data) {
    if (data) {
      this.levelsList = [];
      this.rootEl.innerHTML = '';
      data.levelsList.forEach((levelData) => {
        const levelCard = new LevelCard();
        levelCard.setData(levelData);
        this.levelsList.push(levelCard);
        if (!levelData.getIsLocked()) {
          levelCard.render().onclick = () => {
            PathBus.setCurrentPath(`/game/level/${levelData.getId()}`);
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
