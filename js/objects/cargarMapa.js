function cargarMapa(mapa) {
    switch (mapa) {
        case "LaX":
            // Base total
            var nuevoSuelo = game.add.tileSprite(0, game.world.height - 16, game.world.width, 16, 'ground');
            platforms.add(nuevoSuelo);

            nuevoSuelo = game.add.tileSprite(200, game.world.height - 150, (game.world.width - 400) / 2, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite((game.world.width - 400) / 3 + 400, game.world.height - 150, (game.world.width - 400) / 2, 16, 'ground');
            platforms.add(nuevoSuelo);

            nuevoSuelo = game.add.tileSprite(0, game.world.height - 250, 100, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(game.world.width - 100, game.world.height - 250, 100, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(400, game.world.height - 250, (game.world.width - 400) / 4, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite((game.world.width - 600) / 3 + 600, game.world.height - 250, (game.world.width - 400) / 4, 16, 'ground');
            platforms.add(nuevoSuelo);

            nuevoSuelo = game.add.tileSprite(0, game.world.height - 350, 100, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(game.world.width - 100, game.world.height - 350, 100, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(500, game.world.height - 350, (game.world.width - 400) / 5, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite((game.world.width - 600) / 3 + 550, game.world.height - 350, (game.world.width - 400) / 5, 16, 'ground');
            platforms.add(nuevoSuelo);

            nuevoSuelo = game.add.tileSprite(600, game.world.height - 450, (game.world.width - 400) / 6, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite((game.world.width - 600) / 3 + 510, game.world.height - 450, (game.world.width - 400) / 6, 16, 'ground');
            platforms.add(nuevoSuelo);

            nuevoSuelo = game.add.tileSprite(600, game.world.height - 550, (game.world.width - 400) / 6, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite((game.world.width - 600) / 3 + 510, game.world.height - 550, (game.world.width - 400) / 6, 16, 'ground');
            platforms.add(nuevoSuelo);

            nuevoSuelo = game.add.tileSprite(0, game.world.height - 650, 100, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(game.world.width - 100, game.world.height - 650, 100, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(500, game.world.height - 650, (game.world.width - 400) / 5, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite((game.world.width - 600) / 3 + 550, game.world.height - 650, (game.world.width - 400) / 5, 16, 'ground');
            platforms.add(nuevoSuelo);

            nuevoSuelo = game.add.tileSprite(0, game.world.height - 750, 100, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));
            nuevoSuelo = game.add.tileSprite(game.world.width - 100, game.world.height - 750, 100, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));
            nuevoSuelo = game.add.tileSprite(400, game.world.height - 750, (game.world.width - 400) / 4, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));
            nuevoSuelo = game.add.tileSprite((game.world.width - 600) / 3 + 600, game.world.height - 750, (game.world.width - 400) / 4, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));


            var nuevoSuelo = game.add.tileSprite(0, -game.world.height + 16, game.world.width, 16, 'ground');
            platforms.add(nuevoSuelo);
            break;
        case "Factorio":
            // Base total
            var nuevoSuelo = game.add.tileSprite(0, game.world.height - 16, game.world.width, 16, 'ground');
            platforms.add(nuevoSuelo);

            // Cuatro ascensores
            nuevoSuelo = new Ascensor(game, 50, game.world.height - 150, 150, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = new Ascensor(game, 400, game.world.height - 250, 150, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = new Ascensor(game, 800, game.world.height - 350, 150, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = new Ascensor(game, 1200, game.world.height - 450, 150, 16, 'ground');
            platforms.add(nuevoSuelo);

            // Tres pisos
            nuevoSuelo = game.add.tileSprite(250, game.world.height - 150, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));
            nuevoSuelo = game.add.tileSprite(600, game.world.height - 150, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(1000, game.world.height - 150, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(1400, game.world.height - 150, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));

            nuevoSuelo = game.add.tileSprite(250, game.world.height - 350, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));
            nuevoSuelo = game.add.tileSprite(600, game.world.height - 350, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(1000, game.world.height - 350, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(1400, game.world.height - 350, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));

            nuevoSuelo = game.add.tileSprite(250, game.world.height - 550, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));
            nuevoSuelo = game.add.tileSprite(600, game.world.height - 550, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(1000, game.world.height - 550, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = game.add.tileSprite(1400, game.world.height - 550, 125, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));

            // Plataformas horizontales
            nuevoSuelo = new PlataformaHorizontal(game, 50, game.world.height - 750, 150, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = new PlataformaHorizontal(game, 100, game.world.height - 875, 150, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = new PlataformaHorizontal(game, 150, game.world.height - 1100, 150, 16, 'ground');
            platforms.add(nuevoSuelo);
            nuevoSuelo = new PlataformaHorizontal(game, 200, game.world.height - 450, 150, 16, 'ground');
            platforms.add(nuevoSuelo);


            nuevoSuelo = game.add.tileSprite(0, -game.world.height + 16, game.world.width, 16, 'ground');
            platforms.add(nuevoSuelo);
            break;
        case "Jungla":
            for (var i = 1; i < 20; i++) {
                if (i % 2 === 0) {
                    nuevoSuelo = game.add.tileSprite(0, i * 100, 300, 16, 'ground');
                    platforms.add(nuevoSuelo);
                    nuevoSuelo = game.add.tileSprite(game.world.width / 2 - 150, i * 100, 300, 16, 'ground');
                    platforms.add(nuevoSuelo);
                    nuevoSuelo = game.add.tileSprite(game.world.width - 300, i * 100, 300, 16, 'ground');
                    platforms.add(nuevoSuelo);
                } else {
                    nuevoSuelo = game.add.tileSprite(450, i * 100, 90, 16, 'ground');
                    platforms.add(nuevoSuelo);
                    nuevoSuelo = game.add.tileSprite(game.world.width / 2 - 45, i * 100, 90, 16, 'ground');
                    platforms.add(nuevoSuelo);
                    nuevoSuelo = game.add.tileSprite(game.world.width - 500, i * 100, 90, 16, 'ground');
                    platforms.add(nuevoSuelo);
                    portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));
                }
            }
            break;
        case "Chino":
            // Simplemente un campo largo
            var nuevoSuelo = game.add.tileSprite(0, game.world.height - 16, game.world.width, 16, 'ground');
            platforms.add(nuevoSuelo);
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+32, nuevoSuelo.body.y-16));
            portales.add(new SpawnEnemigo(game,game.world.width-64, nuevoSuelo.body.y-16));
            portales.add(new SpawnEnemigo(game,game.world.width/2, nuevoSuelo.body.y-16));
            portales.add(new SpawnEnemigo(game,game.world.width-400, 128));
            portales.add(new SpawnEnemigo(game,nuevoSuelo.body.x+400, 128));
            
            break;
    }
}