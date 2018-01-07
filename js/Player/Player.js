/*
 * animaciones que necesita el jugador
 * 
 * 1) Idle
 * 2) Moverse
 * 3) Saltar
 * 4) Cuchillo
 * 5) Arma de una mano
 * 6) Arma de dos manos
 * 7) Esquivar
 * 
 * if (animName(chopper)=='hover') chopper.play('turnLeft');
 function animName(obj){ return obj.animations.currentAnim.name;}
 */
function loadPlayer() {
    player = game.add.sprite(220, 0, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.height = 32;
    player.body.width = 32;
    player.body.bounce.y = 0;
    player.body.gravity.y = 1100;
    player.body.collideWorldBounds = false;

    // give the player animation
    // Our two animations, walking left and right.
    player.animations.add('mover', [5, 6, 7, 8], 10, true);
    player.animations.add('disparar', [9, 10, 11, 12], 10, true);
    player.animations.add('saltar', [13], 10, true);
    player.animations.add('esquivar', [14], 10, true);
    //player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.animations.add('quieto', [0,1,2,3,4], 10, true);

    // Nuevas variables para el jugador
    player.canGetHit = 1;

    // Permite rebotar sobre enemigos
    player.jumpImmunity = 1;

    // La cámara sigue al jugador
    //game.camera.follow(player);

    playerEfectoTrail = game.add.emitter(0, 0, 100);
    playerEfectoCohete = game.add.emitter(0, 0, 100);

    playerEfectoTrail.makeParticles('player');
    player.addChild(playerEfectoTrail);
    playerEfectoCohete.makeParticles('player');
    player.addChild(playerEfectoCohete);
    
    playerEfectoTrail.y = 0;
    playerEfectoTrail.x = 1*-ultimaDireccion;
    playerEfectoTrail.lifespan = 300;
    playerEfectoTrail.minRotation = 0;
    playerEfectoTrail.maxRotation = 0;
    playerEfectoTrail.gravity = 0;
    playerEfectoTrail.angle = 0;
    playerEfectoTrail.angle = 0;
    playerEfectoTrail.minParticleSpeed.setTo(-150, 0);
    playerEfectoTrail.maxParticleSpeed.setTo(-150, 50);
    playerEfectoTrail.minParticleAlpha=0.1;
    playerEfectoTrail.maxParticleAlpha=0.1;
    
    playerEfectoCohete.y = -1;
    playerEfectoCohete.x = 0;
    playerEfectoCohete.lifespan = 300;
    playerEfectoCohete.minRotation = 0;
    playerEfectoCohete.maxRotation = 0;
    playerEfectoCohete.gravity = 0;
    playerEfectoCohete.angle = 0;
    playerEfectoCohete.angle = 0;
    playerEfectoCohete.minParticleSpeed.setTo(0, 350);
    playerEfectoCohete.maxParticleSpeed.setTo(0, 350);
    playerEfectoCohete.minParticleAlpha=0.1;
    playerEfectoCohete.maxParticleAlpha=0.1;

    //playerEfectoTrail.emitX = 64;
    //playerEfectoTrail.emitY = 500;

    //game.add.tween(playerEfectoTrail).to( { emitX: 800-64 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
    //game.add.tween(playerEfectoTrail).to( { emitY: 200 }, 4000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);


    cargarControlesJugador();
    player.body.width = 16;
    player.body.height = 32;



}
