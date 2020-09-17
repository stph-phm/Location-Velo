class Resa {
  constructor(canvas, resaTime) {
    this.canvas = canvas;
    this.resaTime = resaTime;
    //regex pour champs de saisies (lettres et - seulement)
    this.regex = /^[A-Za-z\Ã©\Ã¨\Ãª\_-]+$/;
    //methodes à executer
    this.initResa();
    this.resaExist();
  };


  timer() { //méthode timer
    this.interval = setInterval(() => { // a chaque interval :
      //on récupère la date actuelle
      this.presentTime = new Date();
      //on récupère le temp restant (deadline - presentTime + 1000) pour la seconde perdu lors du chargement
      this.timeLeft = new Date(this.deadline - this.presentTime + 1000);
      //on défini les minutes
      this.min = Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      //on défini les secondes
      this.sec = Math.floor((this.timeLeft % (1000 * 60)) / 1000);
      //on affiche le message du timer avec les min et sec
      $('#timer').text('Votre réservation expirera dans ' + this.min + ' minutes et ' + this.sec + ' secondes.');
      //si le temps est écoulé ==> on annule la resa
      if (this.timeLeft < 0) {
        //on clear l'interval
        clearInterval(this.interval);
        //on supprime les éléments du sessionStorage
        sessionStorage.clear();
        //on change le message dans le footer
        $('#resa_info').text(localStorage.getItem('firstname') + ', votre réservation a éxpirée.');
        //on retire les infos du timer
        $('#timer').text(' ');
      };
    }, 1000);
  }; // fin de la methode timer

  resaInfo() { //début méthode à exécuter
    //on change l'apparence des blocs dans le panneau
    $('#info_client').css('display', 'none');
    $('#resa_confirm').css('display', 'block');
    //on affiche le message dans le footer en recupérant les infos du storage
    $('#resa_info').text(localStorage.getItem('prenom') + ', votre vélo vous attend à la station ' + sessionStorage.getItem('station'));
  }; //fin de la methode resaInfo

  initResa() { //début méthode à exécuter
    //BOUTON RESERVER
    $('#button_booking').on('click', () => {
      //si il n'y pas de deadline d'enregistré (si il n'y a pas de réservation en cours)
      if (!sessionStorage.getItem('deadline')) {
        //on enregistre le nom de la station en session
        sessionStorage.setItem('station', $('#nom_station').text());
        //on change l'apparence des blocs
        $('#info_station').css('display', 'none');
        $('#info_client').css('display', 'block');
        //si il y a déjà une réservation en cours
      } else if (sessionStorage.getItem('deadline')) {
        //on affiche un message de confirmation
        this.confirmCancel = confirm('Vous avez déjà une réservation en cours, souhaitez vous l\'annuler ?');
        //si ce message est confirmé
        if (this.confirmCancel === true) {
          //annule la réservation
          //supprimer les infos dans le storage
          sessionStorage.clear();
          //clear l'interval
          clearInterval(this.interval);
          //on enregistre le nom de la station en session
          sessionStorage.setItem('station', $('#nom_station').text());
          //on change l'apparence des blocs
          $('#info_station').css('display', 'none');
          $('#info_client').css('display', 'block');
          $('#resa_info').text('Aucune réservation en cours.');
          $('#timer').text(' ');
        };
      };
    }); // fin de la funtion click
    //BOUTON VALIDER
    $('#btn_valider').on('click', () => {
      //uniquement si la regex renvois true (si il n'y a que des lettres ou - )
      if ((this.regex.test($('#last_name').val()) === true) && (this.regex.test($('#first_name').val()) === true)) {
        if (this.canvas.canvasFilled) {
          //on enregistre le nom et prenom en local
          localStorage.setItem('nom', $('#last_name').val());
          localStorage.setItem('prenom', $('#first_name').val());
          //on clear le canvas
          this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width(), this.canvas.canvas.height());
          this.canvas.canvasFilled = false;
          //on lance la mÃ©thode resaInfo
          this.resaInfo();
          //on creer la date d'expiration (date actuelle transformÃ©e en ms avec methode getTime + le temps de la resa en ms (20min))
          this.deadline = new Date().getTime() + this.resaTime;
          //on enregistre la date en session
          sessionStorage.setItem('deadline', this.deadline);
          //on lance le timer
          this.timer();
        } else { //si le canvas n'est pas signer => message
          alert('Veuillez signez afin de faire une réservation.');
        }
        //si les input ne sont pas remplis => message
      } else {
        alert('Veuillez renseigner vos informations afin de faire une réservation. (Les chiffres ne sont pas acceptés)');
      }
    });

    $('#btn_effacer').on('click', () => {
      //on clear le canvas
      this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width(), this.canvas.canvas.height());
      //le canvas n'est pas rempli
      this.canvas.canvasFilled = false;
    });

    $('#btn_annuler').on('click', () => {
      //on efface la signature
      this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width(), this.canvas.canvas.height());
      //le canvas n'est pas rempli
      this.canvas.canvasFilled = false;
      //on cache le canvas
      $('#info_client').css('display', 'none');
      //on remet les infos
      $('#info_station').css('display', 'block');
    });
  }; // fin de la methode initResa

  resaExist() {
    //si un nom est enregistré en local
    if (localStorage.getItem('nom')) {
      //on reaffiche le nom et prenom enregistré dans les inputs
      $('#first_name').val(localStorage.getItem('prenom'));
      $('#last_name').val(localStorage.getItem('nom'));
    };
    //si une deadline est enregistrée en session (si il y a une résa en cours)
    if (sessionStorage.getItem('deadline')) {
      //on fait disparaitre le message #select
      $('#select').css('display', 'none');
      //on relance la méthode resaInfo
      this.resaInfo();
      //on recupère la date d'expiration via le storage
      this.deadline = sessionStorage.getItem('deadline');
      //on relance le timer
      this.timer();
    };
  }; // fin de la methode resaExist
}; //fin de la class Resa
