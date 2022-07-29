class Field {
  td = document.createElement('td');

  btn = document.createElement('button');

  createCell() {
    this.td.style.border = '1px solid black';
    this.td.innerHTML = '';
    this.td.style.width = '55px';
    this.td.style.height = '55px';
    return this.td;
  }

  createButton() {
    document.body.appendChild(this.btn);
    this.btn.style.width = '60px';
    this.btn.style.height = '60px';
    this.btn.style.marginLeft = '-4.5em';
    return this.btn;
  }
}
