/* global game */

var TECLA_X; // Disparar
var TECLA_Z; // Saltar
var TECLA_SHIFT; // Esquivar
var TECLA_C; // Cohete
var FLECHAS; // Moverse 
var TECLA_1, TECLA_2, TECLA_3, TECLA_4, TECLA_5, TECLA_6, TECLA_7, TECLA_8, TECLA_9;


var ultimaEsquiva = 0;
var ultimoCohete = 0;
var ultimoGastoEnergetico = 0;

var cambiaAnimacionMovimiento = 1;

var puedeControlarJugador = true;

var ultimaDireccion = -1; // -1 es Izquierda, 1 es Derecha

var turbo = 0; // Para aumentos de velocidad de movimiento.

function cargarControlesJugador() {
    TECLA_X = game.input.keyboard.addKey(Phaser.Keyboard.X);
    TECLA_Z = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    TECLA_SHIFT = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    TECLA_C = game.input.keyboard.addKey(Phaser.Keyboard.C);
    TECLA_1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    TECLA_2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    TECLA_3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    TECLA_4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    TECLA_5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    TECLA_6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    TECLA_7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    TECLA_8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    TECLA_9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    FLECHAS = game.input.keyboard.createCursorKeys();
}
// Esta función se llama continuamente en el update
function controlesJugador(player) {
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    if (puedeControlarJugador) {
        movimientoBasico(player);
    }
    // 
    if (!player.canGetHit) {
        player.alpha = 0.5;
    } else {
        player.alpha = 1;
    }
    // MAXIMO DE VELOCIDAD PARA JUGADOR
    if (player.body.velocity.y > 1000) {
        player.body.velocity.y = 1000;
    }
}
function elegirArma(numero) {
    armaElegida = numero;
        SFX_EQUIPAR.play();
}
function movimientoBasico() {
    if (TECLA_1.isDown) {
        elegirArma(1);
    } else if (TECLA_2.isDown) {
        elegirArma(2);
    } else if (TECLA_3.isDown) {
        elegirArma(3);
    } else if (TECLA_4.isDown) {
        elegirArma(4);
    } else if (TECLA_5.isDown) {
        elegirArma(5);
    } else if (TECLA_6.isDown) {
        elegirArma(6);
    } else if (TECLA_7.isDown) {
        elegirArma(7);
    } else if (TECLA_8.isDown) {
        elegirArma(8);
    } else if (TECLA_9.isDown) {
        elegirArma(9);
    }
    actualizarIconosArmas();
    if (!player.body.touching.down) {
        if (player.animations.currentAnim.name !== "disparar") {
            player.animations.play('saltar');
        }
        cambiaAnimacionMovimiento = false;
    } else {
        cambiaAnimacionMovimiento = true;
    }
    if (TECLA_SHIFT.isDown) {
        if (game.time.now > ultimaEsquiva + 1500) {
            ultimaEsquiva = game.time.now;
            esquivar(player);
        }
    }
    if (TECLA_C.isDown) {
        if (game.time.now > ultimoCohete + 2000) {
            ultimoCohete = game.time.now;
            cohete(player);
        }
    }
    if (puedeControlarJugador) {
        if (TECLA_X.isDown) {
            // Controlar el disparo
            player.animations.play('disparar');
            cambiaAnimacionMovimiento = false;
            disparar();
        }
        //  Allow the player to jump if they are touching the ground.
        if (FLECHAS.up.isDown && player.body.touching.down && player.jumpImmunity) {
            player.body.velocity.y = -550;
        }
        if (FLECHAS.left.isDown) {
            //  Move to the left
            if (armaElegida === 9 && municionEnergiaActual > 0) {
                turbo = -135;
                playerEfectoTrail.emitParticle();
                if (game.time.now > ultimoGastoEnergetico + 750) {
                    ultimoGastoEnergetico = game.time.now;
                    municionEnergiaActual--;
                }
            } else {
                turbo = 0;
            }
            if (player.scale.x > 0) {
                player.scale.x *= -1;
            }
            player.body.velocity.x = -200 + turbo;
            ultimaDireccion = -1;
            if (cambiaAnimacionMovimiento) {
                player.animations.play('mover');
            }
        } else if (FLECHAS.right.isDown) {
            //  Move to the right
            if (armaElegida === 9 && municionEnergiaActual > 0) {
                turbo = 135;
                playerEfectoTrail.emitParticle();
                if (game.time.now > ultimoGastoEnergetico + 750) {
                    ultimoGastoEnergetico = game.time.now;
                    municionEnergiaActual--;
                }
            } else {
                turbo = 0;
            }
            player.body.velocity.x = 200 + turbo;
            if (player.scale.x < 0) {
                player.scale.x *= -1;
            }
            ultimaDireccion = 1;
            if (cambiaAnimacionMovimiento) {
                player.animations.play('mover');
            }
        } else {
            //  Stand still
            if (cambiaAnimacionMovimiento) {
                player.animations.play('quieto');
            }
            // Se puede poner una FRAME en específico para el jugador, en nuestro ejemplo sería la 4
            // set this if you want to reset the 'stance' of the player: player.frame = 4;
        }
    }

}
var loopEsquivaFinalizar;

function esquivar(player) {
    SFX_SWISH.play();
    player.canGetHit = 0;
    cambiaAnimacionMovimiento = 0;
    puedeControlarJugador = false;
    // Si hay ultimaDireccion es que fue a la derecha.
    if (ultimaDireccion > 0) {
        loopEsquivaFinalizar = game.time.events.loop(1, function () {
            player.body.velocity.x = 600;
            player.animations.play('esquivar');
        }, this);
    } else {
        loopEsquivaFinalizar = game.time.events.loop(1, function () {
            player.body.velocity.x = -600;
            player.animations.play('esquivar');
        }, this);
    }
    game.time.events.add(300, finEsquivar, this);
}

var loopCohete;
function cohete() {
    loopCohete = game.time.events.loop(1, function () {
        player.body.velocity.y = -500;
        playerEfectoCohete.emitParticle();
    }, this);
    game.time.events.add(300, finCohete, this);

}

function finCohete() {
    game.time.events.remove(loopCohete);
}

function finEsquivar() {
    puedeControlarJugador = true;
    cambiaAnimacionMovimiento = 1;
    player.canGetHit = 1;
    game.time.events.remove(loopEsquivaFinalizar);
}

function disparar() {
    handleDisparar();
}