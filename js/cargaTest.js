
// initiate the game
// x, y, rendering context, DOM element to attach to
// followed by 4 essential Phaser functions
// these 4 are then mapped to functions below
var game = new Phaser.Game(640, 480, Phaser.AUTO, '',
        {preload: preload, create: create, update: update});

var platforms;
var player;
var slimes;

var cursors;

var score = 0;
var scoreText;

var bullets;
var bulletXSpeed = 300;
var direction = 1;
var spaceBar;

function preload() {
    loadAssets();
}

function loadAssets() {
    // alias, path, x, y dimension
    game.load.spritesheet('player', 'assets/dude.png', 32, 48);
    game.load.spritesheet('slime', 'assets/baddie.png', 32, 32);

    // load images
    game.load.image('bg', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');

    game.load.image('bullet', 'assets/star.png');

}

function create() {

    spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(shootBullet, this);

    // activate physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set the 'bg' object and repeat it across the screen
    // start x, y, size x, y, reference
    game.add.tileSprite(0, 0, 640, 480, 'bg');
    // loading of assets is sequential and determines their z-index

    // create a generic platform group
    platforms = game.add.group();

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.forEach(function (item) {
        // item.enableBody = true;
    }, this);

    // enables physics to members of group
    platforms.enableBody = true;

    var ground = game.add.tileSprite(0, game.world.height - 16, 640, 16, 'ground');

    platforms.add(ground);

    // start x, y, size x, y, reference

    for (var i = 1; i <= 6; i++) {
        var ledge = game.add.tileSprite(50, i * 64, 32 * i * 2, 16, 'ground');
        platforms.add(ledge);
    }

    for (var i = 6; i >= 1; i--) {
        var ledge = game.add.tileSprite((game.width - 32 * i * 2) - 50, (game.height - 64 * i) - 32, 32 * i * 2, 16, 'ground');
        platforms.add(ledge);
    }

    // add the player
    player = game.add.sprite(0, 0, 'player');

    slimes = game.add.group();
    slimes.enableBody = true;

    for (var i = 0; i < 10; i++) {
        var slime2 = new Slime(game, i * 128, i * 32, 50);
        slimes.add(slime2);
    }

    // give elements physics capabilities
    // enable physics FIRST, then defi ne the actual behavior
    // declare, enable, set!
    game.physics.enable([player, platforms, slimes], Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 800;
    player.body.collideWorldBounds = true;

    platforms.forEach(function (item) {
        item.body.collideWorldBounds = true;
        item.body.immovable = true;
        item.body.allowGravity = false;
    }, this);

    // give the player animation
    // Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();

    scoreText = game.add.text(8, 8, 'Score: 0', {fontSize: '32px', fill: '#FFF'});

}

function update() {
    // collides things
    game.physics.arcade.collide(player, platforms);
    //  game.physics.arcade.collide(slimes, platforms);
    game.physics.arcade.collide(slimes, player);
    game.physics.arcade.collide(slimes, slimes);
    handlePlayerMovement();

}

function handlePlayerMovement() {
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        direction = -1;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;
        direction = 1;
        player.animations.play('right');
    } else {
        //  Stand still
        player.animations.stop();
        // set this if you want to reset the 'stance' of the player: player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }

}

function shootBullet() {
    if (bullets.length < 5) {
        var bullet = new Bullet(game, player.x + 10, player.y + 10, direction, bulletXSpeed);
        bullets.add(bullet);
    }
}

Bullet = function (game, x, y, direction, speed) {
    Phaser.Sprite.call(this, game, x, y, "bullet");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.xSpeed = direction * speed;
    this.events.onKilled.add(function(){
    
        var bullet = new Bullet(game, player.x + 10, player.y + 10, direction, bulletXSpeed);
        bullets.add(bullet);}, this);
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.update = function () {

    game.physics.arcade.overlap(this, slimes, function (bullet, slime) {
        bullet.kill();
        slime.kill();

        score += 1;
        scoreText.text = 'Score: ' + score;
    });

    game.physics.arcade.overlap(this, platforms, function (bullet) {
        bullet.kill();
    });
    if (this.body) {
        this.body.velocity.y = 0;
        this.body.velocity.x = this.xSpeed;

    }
    if (this.x < 0 || this.x > 680) {
        this.kill();
    }

};



Slime = function (game, x, y, destination) {
    Phaser.Sprite.call(this, game, x, y, "slime");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.collideWorldBounds = true;
    this.enableBody = true;
    this.animations.add('right', [2, 3], 5, true);
    this.animations.add('left', [0, 1], 5, true);
    this.body.gravity.y = 800;
    this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
    this.body.bounce.x = 1;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 80;

};

Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;

Slime.prototype.update = function () {


    game.physics.arcade.collide(this, platforms, function (slime, platform) {

        // if slime is moving to the right, check if his position is greater than half of the platforms width going to the right
        if (slime.body.velocity.x > 0 && slime.x > platform.x + (platform.width - slime.width) ||
                // if slime is moving to the left, check if his position is
                slime.body.velocity.x < 0 && slime.x < platform.x) {
            slime.body.velocity.x *= -1;

        }

        if (slime.body.velocity.x > 0) {
            // this.animations.stop();
            slime.animations.play('right');
        } else {
            //this.animations.stop();
            slime.animations.play('left');
        }

    });

    game.physics.arcade.collide(this, slimes, function (slime, slimes) {
        slime.body.velocity.x *= -1.0001;
    });

};
