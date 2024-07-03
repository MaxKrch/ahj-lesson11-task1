import moment from 'moment';
import { croppingText } from './functions';

export default class Render {
  constructor(container) {
    this.container = document.querySelector(container);
    this.page = {
      title: null,
      mailList: null,
    };
  }

  renderWidget() {
    const widget = document.createElement('main');
    widget.classList.add('container', 'mail-list');

    const title = this.renderTitle('Incoming:');
    const mailList = this.renderMailList();

    this.page.title = title;
    this.page.mailList = mailList;

    widget.append(this.page.title, this.page.mailList);
    this.container.append(widget);
  }

  renderTitle(name) {
    const title = document.createElement('h2');
    title.classList.add('mail-list-title');
    title.textContent = name;

    return title;
  }

  renderMailList() {
    const mailList = document.createElement('ul');
    mailList.classList.add('mail-list-body');

    return mailList;
  }

  renderMail(mail) {
    const mailEl = document.createElement('li');
    mailEl.classList.add('mail-item');
    mailEl.dataset.id = mail.id;

    const address = this.renderMailBlock('address');
    address.textContent = mail.address;

    const subject = this.renderMailBlock('subject');
    const croppedSubject = croppingText(mail.subject, 24, '...');
    subject.textContent = croppedSubject;

    const time = this.renderMailBlock('time');
    const formatTime = moment(mail.time).locale('ru').format('HH:mm DD.MM.YY');
    time.textContent = formatTime;

    mailEl.append(address, subject, time);

    return mailEl;
  }

  renderMailBlock(name) {
    const mailBlock = document.createElement('div');
    mailBlock.classList.add(`mail-block`, `mail-${name}`);

    return mailBlock;
  }

  updateMailList(listMail) {
    if (!listMail) {
      return;
    }

    try {
      const newMailList = this.renderMailList();

      listMail.forEach((mail) => {
        const mailEl = this.renderMail(mail);
        newMailList.prepend(mailEl);
      });

      this.page.mailList.replaceWith(newMailList);
      this.page.mailList = newMailList;
    } catch (err) {
      console.log(`Что-то пошло не так - ${err}`);
    }
  }

  update(mailList) {
    this.updateMailList(mailList);
  }
}
