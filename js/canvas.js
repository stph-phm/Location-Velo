class Canvas {
  constructor() {
    this.canvas = $('canvas');
    // Initialise context
    this.ctx = this.canvas[0].getContext('2d');

    //le canvas est vide par défaut
    this.canvasFilled = false;
    //on est pas entrain de dessiner par défaut
    this.draw = false;

    //methode à exécute
    this.initEvents();
  }; //fin du constructor

  drawCanvas() {
    //APPARENCE DU DESSIN
    this.ctx.strokeStyle = 'black';
    // largeur de la ligne
    this.ctx.lineWidth = 5;
    // arrondissement des jointures
    this.ctx.lineJoin = 'round';
    //arrondissement des extremités
    this.ctx.lineCap = 'round';
    //DESSINE GRACE AUX COORDONNEES
    //début du trajet
    this.ctx.beginPath();
    //déplacement du stylo
    this.ctx.moveTo(this.x2, this.y2);
    //trace la ligne
    this.ctx.lineTo(this.x, this.y);
    //ferme le trajet
    this.ctx.closePath();
    //dessine la forme
    this.ctx.stroke();
    //canvas est signé (finis)
    this.canvasFilled = true;
  }; //fin de la méthode drawCanvas


  initEvents() {
    //Evenements Souris
    // On récupère les coordonnée et on dessine si drawcanvas est true
    this.canvas.on('mousemove', (e) => {
      this.topCanvas = this.canvas[0].getBoundingClientRect().top;
      this.leftCanvas = this.canvas[0].getBoundingClientRect().left;
      this.x2 = this.x;
      this.y2 = this.y;
      this.x = e.clientX - this.leftCanvas;
      this.y = e.clientY - this.topCanvas;
      if (this.draw) {
        this.drawCanvas();
      }
    });
    //mousedown : on peut dessiner
    this.canvas.on('mousedown', (e) => {
      this.draw = true;
    });
    this.canvas.on('mouseup', () => {
      this.draw = false;
    });
    this.canvas.on('mouseleave', () => {
      this.draw = false;
    });

    //Evenements tactile
    // On récupère les coordonnées du mouvement + on peut dessiner si drawcanvas est true
    this.canvas.on('touchmove', (e) => {
      e.preventDefault();
      this.topCanvas = this.canvas[0].getBoundingClientRect().top;
      this.leftCanvas = this.canvas[0].getBoundingClientRect().left;
      this.x2 = this.x;
      this.y2 = this.y;
      this.x = e.touches[0].clientX - this.leftCanvas;
      this.y = e.touches[0].clientY - this.topCanvas;
      if (this.draw) {
        this.drawCanvas();
      }
    });
    this.canvas.on('touchstart', (e) => {
      e.preventDefault();
      this.topCanvas = this.canvas[0].getBoundingClientRect().top;
      this.leftCanvas = this.canvas[0].getBoundingClientRect().left;
      this.x = e.touches[0].clientX - this.leftCanvas;
      this.y = e.touches[0].clientY - this.topCanvas;
      this.draw = true;
    });
    this.canvas.on('touchend', (e) => {
      e.preventDefault();
      this.draw = false;
    });
    this.canvas.on('touchleave', (e) => {
      e.preventDefault();
      this.draw = false;
    });
  }; //fin méthode initEvents
}; //fin de la classe
