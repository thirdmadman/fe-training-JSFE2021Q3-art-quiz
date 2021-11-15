class SideBar {
  constructor(data) {
    this.data = data;
    this.isHidden = false;
  }

  setData(data) {
    this.data = data;
  }

  assembly(part) {
    switch (part) {
      case 'fastLangSwitch': {
        this.fastLangSwitch = document.createElement('div');
        this.fastLangSwitch.classList.add('main-menu__fast-lang-sw', 'fast-lang-sw');
    
        this.data.fastlangsw.forEach((el) => {
          let button = document.createElement('button');
          button.classList.add('fast-lang-sw__lang-button');
          button.textContent = el.text;
          button.onclick = el.action;
          this.fastLangSwitch.append(button);
        });
        return this.fastLangSwitch
      }
      case 'buttonClose': {
        this.buttonClose = document.createElement('div');
        this.buttonClose.classList.add('button-close');
        return this.buttonClose;
      }
      case 'mainMenuList': {
        this.mainMenuList = document.createElement('div');
        this.mainMenuList.classList.add('main-menu__list');
    
        this.data.menu.forEach((el) => {
          let button = document.createElement('button');
          button.classList.add('main-menu__list-button');
          button.textContent = el.text;
          button.onclick = el.action;
          this.mainMenuList.append(button);
        });
        return this.mainMenuList;
      }
      case 'sidebarVerticalSeparator': {
        this.sidebarVerticalSeparator = document.createElement('div');
        this.sidebarVerticalSeparator.classList.add('sidebar__vertical-separator');
        let sidebarVerticalSeparatorContent = document.createElement('span');
        sidebarVerticalSeparatorContent.innerText = this.data.separatortext; //TO TRANSLATE
        for (let i = 0; i < 10; i++) this.sidebarVerticalSeparator.append(sidebarVerticalSeparatorContent.cloneNode(true));
        return this.sidebarVerticalSeparator;
      }
      
    }

  }

  render() {

    this.element = document.createElement('div');
    this.element.classList.add('sidebar');

    let sidebarContainer = document.createElement('div');
    sidebarContainer.classList.add('sidebar__container');

    this.mainMenu = document.createElement('div');
    this.mainMenu.classList.add('sidebar__main-menu', 'main-menu');

    this.mainMenu.append(this.assembly('buttonClose'));
    this.mainMenu.append(this.assembly('mainMenuList'));
    this.mainMenu.append(this.assembly('fastLangSwitch'));
    sidebarContainer.appendChild(this.assembly('sidebarVerticalSeparator'));
    sidebarContainer.appendChild(this.mainMenu);
    this.element.append(sidebarContainer);

    return this.element;
  }

  hide() {
    this.element.classList.add('sidebar_hidden');
    this.isHidden = true;
  }
  show() {
    this.element.classList.remove('sidebar_hidden');
    this.isHidden = false;
  }
}
module.exports = SideBar;
