export default class SideBar {
  constructor(data) {
    this.data = data;
    this.isHidden = false;

    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('sidebar');

    this.sidebarContainer = document.createElement('div');
    this.sidebarContainer.classList.add('sidebar__container');

    this.buttonClose = document.createElement('div');
    this.buttonClose.classList.add('button-close');

    this.sidebarVerticalSeparator = document.createElement('div');
    this.sidebarVerticalSeparator.classList.add('sidebar__vertical-separator');

    this.mainMenuList = document.createElement('div');
    this.mainMenuList.classList.add('main-menu__list');

    this.fastLangSwitch = document.createElement('div');
    this.fastLangSwitch.classList.add('main-menu__fast-lang-sw', 'fast-lang-sw');

    this.rootEl.append(this.sidebarContainer);
  }

  setData(data) {
    this.data = data;
    this.sidebarContainer.innerHTML = '';

    this.mainMenu = document.createElement('div');
    this.mainMenu.classList.add('sidebar__main-menu', 'main-menu');

    this.mainMenuList.innerHTML = '';

    this.data.menu.forEach((el) => {
      const button = document.createElement('button');
      button.classList.add('main-menu__list-button');
      button.textContent = el.text;
      button.onclick = el.action;
      this.mainMenuList.append(button);
    });

    this.sidebarVerticalSeparator.innerHTML = '';

    const sidebarVerticalSeparatorContent = document.createElement('span');
    sidebarVerticalSeparatorContent.innerText = this.data.separatorText;
    for (let i = 0; i < 10; i += 1) this.sidebarVerticalSeparator.append(sidebarVerticalSeparatorContent.cloneNode(true));

    this.fastLangSwitch.innerHTML = '';

    this.data.fastLangSw.forEach((el) => {
      const button = document.createElement('button');
      button.classList.add('fast-lang-sw__lang-button');
      button.textContent = el.text;
      button.onclick = el.action;
      this.fastLangSwitch.append(button);
    });

    this.mainMenu.append(this.buttonClose);
    this.mainMenu.append(this.mainMenuList);
    this.mainMenu.append(this.fastLangSwitch);
    this.sidebarContainer.appendChild(this.sidebarVerticalSeparator);
    this.sidebarContainer.appendChild(this.mainMenu);
  }

  render() {
    return this.rootEl;
  }

  hide() {
    this.rootEl.classList.add('sidebar_hidden');
    this.isHidden = true;
  }

  show() {
    this.rootEl.classList.remove('sidebar_hidden');
    this.isHidden = false;
  }
}
