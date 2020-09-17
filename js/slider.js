class Slider {
  constructor(tableau, imgId, textId) {
    //parametres de la class
    this.tableau = tableau;
    this.imgId = imgId;
    this.textId = textId;

    //on défini l'index du tableau
    this.i = 0;

    this.idInterval = 0;


    //on initialise la première slide
    this.imgId.attr('src', this.tableau[this.i].image);
    this.textId.text(this.tableau[this.i].content);

    //on initialise les evenements
    this.init();
  } //fin du constructor

  avancer() {
    //on increment l'index
    this.i++;

    //si this.i est > à la longueur du tableau alors :
    if (this.i > this.tableau.length - 1) {
      //on revient à la premiere slide (index 0)
      this.i = 0;
    }

    //puis on affiche la nouvelle image et le nouveau content
    this.imgId.attr('src', this.tableau[this.i].image);
    this.textId.text(this.tableau[this.i].content);
  } //fin methode avancer

 reculer() {
    //on decrement l'index
    this.i--;

    //si this.i est < 0
    if (this.i < 0) {
      //on revient au dernier index
      this.i = this.tableau.length - 1;
    }

    //puis on affiche la nouvelle image et le nouveau content
    this.imgId.attr('src', this.tableau[this.i].image);
    this.textId.text(this.tableau[this.i].content);
  } //fin methode reculler

  init() {
    //autoplay => methode avancer toutes les 5s
    this.idInterval = setInterval( () => {
      this.avancer();
    }, 5000);
    //pause
    $('#pause').on('click', () => {
      clearInterval(this.idInterval);
      $('#pause').css('display', 'none');
      $('#play').css('display', 'block');
    });
    //play
    $('#play').on('click', () => {
      clearInterval(this.idInterval);
      $('#pause').css('display', 'block');
      $('#play').css('display', 'none');
      this.idInterval = setInterval( () => {
        this.avancer();
      }, 5000);
    });
    //next
    $('#next').on('click', () => {
      clearInterval(this.idInterval);
      $('#pause').css('display', 'none');
      $('#play').css('display', 'block');
      this.avancer();
    });
    //prev
    $('#prev').on('click', () => {
      clearInterval(this.idInterval);
      $('#pause').css('display', 'none');
      $('#play').css('display', 'block');
      this.reculer();
    });
    //keydown flêche de gauche - prev
    $(document).on('keydown', () => {
      if (event.keyCode === 37) {
        clearInterval(this.idInterval);
        $('#play').css('display', 'block');
        $('#pause').css('display', 'none');
        this.reculer();
      }
    });
    //keydown flêche de droite - next
    $(document).on('keydown', () => {
      if (event.keyCode === 39) {
        clearInterval(this.idInterval);
        $('#play').css('display', 'block');
        $('#pause').css('display', 'none');
        this.avancer();
      }
    });
  }
} //fin de la class
