class Main {
  constructor() {

    //--------------------------------------Tableau pour le diaporama
    this.tableau = [{
      //index 0
      image: 'images/image1.png',
      content: 'Bienvenue sur le site de Location de vélos en libre service.',
    }, {
      //index 1
      image: 'images/image2.png',
      content: 'Un vélo disponible à moins de 5 minutes !',
    }, {
      //index 2
      image: 'images/image3.png',
      content: 'Confirmez votre réservation en signant !',
    }, {
      //index 3
      image: 'images/image4.png',
      content: 'Vous disposez de 20 minutes pour récupérer votre vélo !',
    }] //4 éléments en tout donc tableau.length = 4
    //--------------------------------------Instanciation de la class Slider
    this.slider = new Slider(this.tableau, $('#slide_img'), $('#slide_text'));
    //--------------------------------------Instanciation de la class Map
    this.carte = new Map('map', 'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=4cbbd3a38eeece87a1533d11c3352032887b7a87');
    //--------------------------------------Instanciation de la class Canvas
    this.canvas = new Canvas('canvas');
    //--------------------------------------Instanciation de la class Réservation
    this.resa = new Resa(this.canvas, 20*60*1000);
  }
}

let main = new Main();
