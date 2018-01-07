/* global FLECHAS */

var canvasWidth = 800;
var canvasHeight = 600;
// Esta variable es muy importante pasarla y usarla.
// "game" es GLOBAL
var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'juego', {preload: preload, create: create, update: update});

// Diferntes tipos de plataformas
var platforms;

var player;

// Particulas para efecto trail
var playerEfectoTrail;
var imagenFondo;

var enemies;
var portales;

var enemyBullets;
var playerBullets;

// Vida
var health = 100;
var healthBar;

// Efectos
var explosiones;

// Iconos de las armas
var iconosArmas;


// Textos de las municiones
var textoBal;
var textoExp;
var textoEn;

// Texto de la puntuación
var puntos = 0;
var textoPuntos;

// EFECTOS DE SONIDO GLOBALES, ME DA IGUAL MI LIFE
var SFX_SILENCIADO;
var SFX_ESCOPETA;
var SFX_LANZACOHETES;
var SFX_LASER;
var SFX_EXPLOSION;
var SFX_ENERGIA;

var ammoBoxes;

function preload() {
    loadAssets();
}

function loadAssets() {
    // Fuentes
    //HACK TO PRELOAD A CUSTOM FONT
    this.game.add.text(0, 0, "hack", {font: "1px pressStart", fill: "#FFFFFF"});

    // Efectos
    game.load.spritesheet('explosion', 'assets/effects/explosion.png', 128, 128);

    // alias, path, x, y dimension
    game.load.spritesheet('player', 'assets/playerSprites/' + PlayerAccount.skin + '.png', 32, 32);
    preloadEnemigos();

    // Musica y efectos de sonido

    // MUSICA
    game.load.audio('LaX', 'assets/musica/LaX.ogg');
    game.load.audio('Factorio', 'assets/musica/Factorio.ogg');
    game.load.audio('Jungla', 'assets/musica/Jungla.ogg');
    game.load.audio('Chino', 'assets/musica/Chino.ogg');

    // SFX
    game.load.audio('silenciado', 'assets/sonido/silenciado.wav');
    game.load.audio('escopeta', 'assets/sonido/escopeta.wav');
    game.load.audio('lanzacohetes', 'assets/sonido/lanzacohetes.wav');
    game.load.audio('laser', 'assets/sonido/laser.wav');
    game.load.audio('explosion', 'assets/sonido/explosion.wav');
    game.load.audio('energia', 'assets/sonido/energia.wav');
    game.load.audio('pistola', 'assets/sonido/pistola.wav');
    game.load.audio('equipar', 'assets/sonido/equipar.wav');
    game.load.audio('swish', 'assets/sonido/swish.wav');
    game.load.audio('static', 'assets/sonido/static.ogg');

    game.load.audio('enemyShotLaser', 'assets/sonido/enemyShotLaser.wav');
    game.load.audio('enemyShot', 'assets/sonido/enemyShot.wav');

    // Fondos
    game.load.image('LaX', 'assets/LaX.png');
    game.load.image('Factorio', 'assets/Factorio.png');
    game.load.image('Jungla', 'assets/Jungla.png');
    game.load.image('Chino', 'assets/Chino.png');

    // Suelos
    game.load.image('ground', 'assets/platform/' + PlayerAccount.mapa + '.png');

    // barra Vida
    game.load.image('hpBAR', 'assets/hp.png');

    // Cajas de municion
    game.load.spritesheet('bulletsAmmo', 'assets/img/bullets.png', 24, 24);
    game.load.spritesheet('explosiveAmmo', 'assets/img/explosivos.png', 24, 24);
    game.load.spritesheet('energyAmmo', 'assets/img/energia.png', 24, 24);
    game.load.spritesheet('healthkit', 'assets/img/healthkit.png', 24, 24);

    // Armas
    precargaIconosArmas();

    // BALA TESTING
    game.load.image('cuchillada', 'assets/img/cuchillada.png');
    game.load.image('bullet', 'assets/img/bala.png');
    game.load.image('perdigon', 'assets/img/perdigon.png');
    game.load.image('bomba', 'assets/img/bomba.png');
    game.load.image('cohete', 'assets/img/cohete.png');
    game.load.spritesheet('plasma', 'assets/img/Plasma.png', 16, 16);
    game.load.image('rail', 'assets/img/rail.png');


    game.load.image('enemyBullet', 'assets/img/bala.png');
    game.load.image('coheteEnemigo', 'assets/img/coheteEnemigo.png');

}
function create() {
    // CARGA DEL MUNDO
    //spaceBar.onDown.add(shootBullet, this);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 1600, 1200);

    imagenFondo = game.add.tileSprite(0, 0, 1600, 1200, PlayerAccount.mapa);

    // PLATAFORMAS
    // LUEGO ESTO SERÁ LA CARGA DEL MAPA
    platforms = game.add.group();
    platforms.enableBody = true;
    portales = game.add.group();

    cargarMapa(PlayerAccount.mapa);
    platforms.forEach(function (item) {
        item.body.collideWorldBounds = true;
        item.body.immovable = true;
        item.body.allowGravity = false;
    }, this);
    game.physics.enable(platforms, Phaser.Physics.ARCADE);

    // MUSICA
    MUSICA = game.add.audio(PlayerAccount.mapa);
    MUSICA.volume = 0.4;
    MUSICA.loop = true;


    // EFECTOS DE SONIDO
    SFX_SILENCIADO = game.add.audio('silenciado');
    SFX_ESCOPETA = game.add.audio('escopeta');
    SFX_LANZACOHETES = game.add.audio('lanzacohetes');
    SFX_ENERGIA = game.add.audio('energia');
    SFX_LASER = game.add.audio('laser');
    SFX_EXPLOSION = game.add.audio('explosion');
    SFX_EXPLOSION.volume = 0.2;
    SFX_PISTOLA = game.add.audio('pistola');
    SFX_EQUIPAR = game.add.audio('equipar');
    SFX_EQUIPAR.volume = 0.2;
    SFX_SWISH = game.add.audio('swish');
    SFX_ENEMYSHOT = game.add.audio('enemyShot');
    SFX_ENEMYSHOTLASER = game.add.audio('enemyShotLaser');
    SFX_STATIC = game.add.audio('static');
    SFX_STATIC.volume = 0.4;
    SFX_STATIC.loop = true;
    
    // BARRA VIDA (100 golpes)
    healthBar = game.add.group();
    actualizarVida();
    healthBar.fixedToCamera = true;
    healthBar.cameraOffset.setTo(10, 10);

    // ENEMIGOS
    enemies = game.add.group();

    // CAJAS DE MUNICION
    ammoBoxes = game.add.group();

    // EFECTOS DE EXPLOSION
    explosiones = game.add.group();
    explosiones.createMultiple(80, 'explosion');
    explosiones.forEach(function (explosion) {
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('explosion');
    }, this);

    // JUGADOR
    loadPlayer();

    // ARMAS
    cargarIconosArmas();

    // MUNICIONES
    var estilos = [
        {font: "16px pressStart", fill: "#333333", stroke: "black", strokeThickness: 2},
        {font: "16px pressStart", fill: "#ffa500", stroke: "black", strokeThickness: 2},
        {font: "16px pressStart", fill: "#00cccc", stroke: "black", strokeThickness: 2}
    ];
    var textos = ["BAL:" + municionBalasActual + "/" + municionBalasMax, "EXP:" + municionExpActual + "/" + municionExpMax, "EN:" + municionEnergiaActual + "/" + municionEnergiaMax];

    textoBal = this.game.add.text(0, 0, textos[0], estilos[0]);
    textoBal.fixedToCamera = true;
    textoBal.cameraOffset.setTo(180, 20);
    textoExp = this.game.add.text(0, 0, textos[1], estilos[1]);
    textoExp.fixedToCamera = true;
    textoExp.cameraOffset.setTo(400, 20);
    textoEn = this.game.add.text(0, 0, textos[2], estilos[2]);
    textoEn.fixedToCamera = true;
    textoEn.cameraOffset.setTo(600, 20);

    // Puntuación

    textoPuntos = this.game.add.text(0, 0, "Puntos: " + puntos, {font: "16px pressStart", fill: "#ffffff", stroke: "black", strokeThickness: 2});
    textoPuntos.fixedToCamera = true;
    textoPuntos.cameraOffset.setTo(520, 55);

    // BALAS
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    playerBullets = game.add.group();
    playerBullets.enableBody = true;
    playerBullets.setAll('anchor.x', 0.5);
    playerBullets.setAll('anchor.y', 1);
    playerBullets.setAll('outOfBoundsKill', true);
    playerBullets.setAll('checkWorldBounds', true);

    // TESTING
    //var BALA = game.add.tileSprite(220, game.world.height - 50, 24, 24, 'bullet');
    //enemyBullets.add(BALA);

    // INICIAR MUSICA
    MUSICA.play();
    
    // UN FAILSAFE
    game.time.events.loop(2000, function(){
        console.log(loopRecibirDaño);
        console.log(loopEsquivaFinalizar);
    },this);
}
function update() {
    // Si choca los bordes
    game.world.wrap(player, 10, false);
    enemies.forEachExists(function (enemigo) {
        game.world.wrap(enemigo.body);
    });

    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, enemies, controlarChoqueEnemigo, null, this);
    game.physics.arcade.overlap(player, enemyBullets, perderVidaBala, null, this);
    controlesJugador(player);

    // Actualizar texto
    actualizarTextos();

    // Camara
    var offsetX = player.body.velocity.x / 20;
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    game.camera.onFadeComplete.add(function () {
        game.camera.resetFX();
    }, this);

    //game.time.events.remove(loopRecibirDaño);
}

function perderVidaBala(player, bala) {
    if (bala.key === "coheteEnemigo") {
        var explosion = explosiones.getFirstExists(false);
        explosion.reset(bala.body.x, bala.body.y);
        explosion.play('explosion', 30, false, true);
    }
    perderVida(player, bala);
    bala.kill();
}
function controlarChoqueEnemigo(player, enemy) {
    //  Si el jugador está saltando mientras toca a un enemigo por una zona superior a él rebotará, pero esta habilidad tiene cooldown
    if (player.body.y < enemy.body.y && FLECHAS.up.isDown && player.jumpImmunity) {
        player.body.velocity.y = -600;
        if (player.body.velocity.x < 0) {
            turbo = -250;
        } else {
            turbo = 250;
        }
        player.canGetHit = 0;
        game.time.events.add(800, function () {
            turbo = 0;
            player.canGetHit = 1;
        }, this);
        player.jumpImmunity = 0;
        game.time.events.add(1500, function () {
            player.jumpImmunity = 1;
        }, this);
    } else {
        perderVida(player, enemy);
    }
}
var loopRecibirDaño;
function perderVida(player, enemy) {
    if (player.canGetHit) {
        SFX_EXPLOSION.play();
        health -= enemy.damageDealt;
        actualizarVida();
        puedeControlarJugador = false;
        if (player.body.x < enemy.body.x) {
            loopRecibirDaño = game.time.events.loop(1, function () {
                player.body.velocity.x = -300;
            }, this);
        } else {
            loopRecibirDaño = game.time.events.loop(1, function () {
                player.body.velocity.x = 300;
            }, this);
        }
        player.canGetHit = 0;
        game.time.events.add(200, finAnimacion, this);
        game.time.events.add(1000, finInvulnerabilidad, this);
    }
}
function finAnimacion() {
    game.time.events.remove(loopRecibirDaño);
    puedeControlarJugador = true;

}
function finInvulnerabilidad() {
    if (loopEsquivaFinalizar) {
        game.time.events.remove(loopEsquivaFinalizar);
    }
    game.time.events.remove(loopRecibirDaño);
    player.canGetHit = 1;
    // Por si acaso.
    game.time.events.add(100, function () {
        game.time.events.remove(loopRecibirDaño);
        if (loopEsquivaFinalizar) {
            game.time.events.remove(loopEsquivaFinalizar);
        }
        game.time.events.remove(loopRecibirDaño);
    }, this);
}

function actualizarTextos() {
    textoBal.setText("BAL:" + municionBalasActual + "/" + municionBalasMax);
    textoExp.setText("EXP:" + municionExpActual + "/" + municionExpMax);
    textoEn.setText("EN:" + municionEnergiaActual + "/" + municionEnergiaMax);
    textoPuntos.setText("Puntos: " + puntos);
}

function animacionDaño(Sprite) {
    Sprite.tint = 0xff0000;
    game.add.tween(Sprite).to({tint: 0xffffff}, 1000, "Linear", true);
}

function actualizarVida() {
    if(health <= 40){
        MUSICA.volume = 0.2;
    } else {
        MUSICA.volume = 0.4;
    }
    if(health <= 20){
        MUSICA.volume = 0.1;
        SFX_STATIC.play();
    } else {
        MUSICA.volume = 0.2;
        SFX_STATIC.stop();
    }
    if (health <= 0) {
        // REHACER ESTO EN UNA ANIMACIÓN DE MUERTE CON UNA ANIMACION ONCOMPLETE
        puedeControlarJugador = false;
        var contadorLoop = 0;
        loopMuerte = game.time.events.loop(50, function () {
            var explosion = explosiones.getFirstExists(false);
            explosion.reset(player.body.x + game.rnd.integerInRange(-30, 30), player.body.y + game.rnd.integerInRange(-30, 30));
            explosion.play('explosion', 30, false, true);
            SFX_EXPLOSION.play();
            contadorLoop++;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            if (contadorLoop > 50) {
                game.paused = true;
                imagenFondo.tint = 0x444444;
                explosiones.forEach(function (item) {
                    item.tint = 0x444444;
                });
                platforms.forEach(function (item) {
                    item.tint = 0x444444;
                });
                enemies.forEach(function (item) {
                    item.tint = 0x444444;
                });
                enemyBullets.forEach(function (item) {
                    item.tint = 0x444444;
                });
                portales.forEach(function (item) {
                    item.tint = 0x444444;
                });
                var textolino = this.game.add.text(game.camera.x, game.camera.y + 200, "Game Over man, Game Over", {font: "32px pressStart", fill: "#ffffff", stroke: "black", strokeThickness: 2});
                textolino.fixedToCamera = true;
                textolino.cameraOffset.setTo(20, 200);
                var textosote = this.game.add.text(game.camera.x + 150, game.camera.y + 300, "Haz click para salir", {font: "18px pressStart", fill: "#ffffff", stroke: "black", strokeThickness: 2});
                textosote.fixedToCamera = true;
                textosote.cameraOffset.setTo(150, 300);
                game.input.onDown.add(function (evento) {

                    var cuentaActual = JSON.parse(localStorage.getItem('CuentaActual'));
                    if (cuentaActual.record < puntos) {
                        cuentaActual.record = puntos;
                        cuentaActual.handicapRecord = PlayerAccount.dificultad;
                    }
                    localStorage.setItem('CuentaActual', JSON.stringify(cuentaActual));
                    var CuentasSacadasLocalStorage = JSON.parse(localStorage.getItem('Cuentas'));
                    for (var item in CuentasSacadasLocalStorage) {
                        if (CuentasSacadasLocalStorage[item].nombre === cuentaActual.nombre) {
                            CuentasSacadasLocalStorage[item] = cuentaActual;
                        }
                    }
                    localStorage.setItem('Cuentas', JSON.stringify(CuentasSacadasLocalStorage));
                    location.replace('opciones.html');
                }, self);
            }
        }, this);
        player.kill();
    }
    healthBar.forEach(function (item) {
        item.kill();
    });
    for (var i = 0; i < health; i++) {
        var nuevoHit = game.add.tileSprite(0 + i * 1.5, 10, 4, 20, 'hpBAR');
        healthBar.add(nuevoHit);
    }

}