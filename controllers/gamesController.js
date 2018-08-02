const Game = require('../models/Game');
const url = require('url');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Home', user: req.user });
};

exports.getGames = (req, res) => {
  Game.find((err, games) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ title: 'All Games', games });
    }
  });
};

exports.admin = async (req, res) => {
  // use game model to query db for game data
  const games = await Game.find().sort({ title: 'asc' });

  res.render('admin', {
    title: 'Admin',
    games,
    user: req.user,
  });
};

exports.fillData = (req, res) => {
  const data = [
    {
      title: 'Pacman',
      publisher: 'Namco',
      imageUrl: 'https://archive.org/services/img/msdos_Pac-Man_1983',
      year: 1983,
    },
    {
      title: 'Oregon Trail',
      publisher: 'MECC',
      imageUrl: 'https://archive.org/services/img/msdos_Oregon_Trail_The_1990',
      year: 1990,
    },
    {
      title: 'Sim City',
      publisher: 'Maxis',
      imageUrl: 'https://archive.org/services/img/msdos_SimCity_1989',
      year: 1989,
    },
  ];

  Game.collection.insertMany(data, (err, allGames) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to sample games' });
    } else {
      res.json(allGames);
    }
  });
};

exports.addGame = (req, res) => {
  res.render('addGame', {
    title: 'Add Game',
    user: req.user,
  });
};

exports.createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.json(game);
  } catch (err) {
    res.json({ success: false, msg: 'Unable to add game' });
  }
};

exports.play = (req, res) => {
  const gamePassed = url.parse(req.url, true).query;
  res.render('playGame', {
    title: gamePassed.game,
    user: req.user,
  });
};

exports.deleteGame = (req, res) => {
  Game.findByIdAndRemove(
    { _id: req.params.id },
    async (err, gameJustDeleted) => {
      if (err) {
        res.json({ success: false, msg: 'Game not deleted' });
      } else {
        res.json({ success: true, msg: 'Game deleted' });
      }
    },
  );
};

exports.editGame = (req, res) => {
  // use Game model to find selected document
  Game.findById({ _id: req.params.id }, (err, game) => {
    if (err) {
      res.json({ success: false, msg: 'Unable to find game to edit' });
    } else {
      res.json({ success: true, msg: 'Found game to edit', game });
    }
  });
};

exports.updateGame = (req, res) => {
  // get year from last 3 characters of imageUrl
  req.body.year = req.body.imageUrl.substr(-4);

  Game.update({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      res.json({ success: false, msg: 'Unable to update game' });
    } else {
      res.json({ success: true, msg: 'Updated game' });
    }
  });
};
