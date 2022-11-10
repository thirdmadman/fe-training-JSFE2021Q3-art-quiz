import LocaleProvider from '../../../services/LocaleProvider';

export default class VariantPopup {
  constructor() {
    this.rootEl = document.createElement('div');
    this.rootEl.classList.add('overlay');
    this.rootEl.classList.add('overlay_blur');

    this.buttonSelect = document.createElement('button');
    this.buttonSelect.classList.add('variant-popup__button');
    this.buttonSelect.classList.add('variant-popup__button_select');
    this.buttonSelect.textContent = LocaleProvider.getLocale('gameSelectTitle');

    this.buttonCancel = document.createElement('button');
    this.buttonCancel.classList.add('variant-popup__button');
    this.buttonCancel.classList.add('variant-popup__button_cancel');
    this.buttonCancel.textContent = LocaleProvider.getLocale('gameCancelTitle');

    this.buttonCancel.onclick = () => this.hide();

    this.variantButtons = document.createElement('div');
    this.variantButtons.classList.add('variant-popup__buttons');
    this.variantButtons.append(this.buttonCancel);
    this.variantButtons.append(this.buttonSelect);

    this.downloadButton = document.createElement('button');
    this.downloadButton.classList.add('variant-popup__download-button');
  }

  setData(data) {
    const { answer } = data;
    const { question } = data;
    const { questionPopup } = data;

    const variantContainer = document.createElement('div');
    variantContainer.classList.add('variant-popup');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('variant-popup__image');

    const image = document.createElement('img');
    image.src = answer.getImageSrc();
    image.alt = 'variant';

    imageContainer.append(image);
    imageContainer.append(this.downloadButton);

    variantContainer.append(imageContainer);
    variantContainer.append(this.variantButtons);

    this.rootEl.innerHTML = '';

    this.rootEl.append(variantContainer);

    this.buttonSelect.onclick = () => {
      this.hide();
      questionPopup.setData({ question, answer });
      questionPopup.show();
    };
  }

  hide() {
    this.rootEl.classList.add('overlay_hidden');
  }

  show() {
    this.rootEl.classList.remove('overlay_hidden');
  }

  render() {
    return this.rootEl;
  }
}
