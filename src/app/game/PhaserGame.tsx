"use client";
import React, { useEffect, useRef, useState } from "react";
import Phaser, { Physics } from "phaser";
import { loadLogos } from "../utils/loadLogos";
import { useAccount } from "wagmi";
import { Box } from "@chakra-ui/react";

interface PhaserGameProps {
  onGameEnd: (points: number) => void;
}

const GamePage: React.FC<PhaserGameProps> = ({ onGameEnd }) => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { address } = useAccount();

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0, x: 0 },
        debug: false,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  let player: Phaser.Physics.Arcade.Sprite;
  let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  let bombs: Phaser.Physics.Arcade.Group;
  let logos: Phaser.Physics.Arcade.Group;
  let scoreText: Phaser.GameObjects.Text;
  let score = 0;
  let gameOver = false;
  let playButton: Phaser.GameObjects.Text;
  let restartButton: Phaser.GameObjects.Text;
  let jumpKey: Phaser.Input.Keyboard.Key;

  let bombEvent: Phaser.Time.TimerEvent | null = null;
  let logoEvent: Phaser.Time.TimerEvent | null = null;

  // let livesText: Phaser.GameObjects.Text;
  let userAddress: Phaser.GameObjects.Text;
  // let lives = 3; // Начальное количество жизней

  function preload(this: Phaser.Scene) {
    this.load.image("sky", "/images/game/background.png");
    this.load.image("bomb", "/images/game/bomb.png");
    this.load.image("player", "/images/game/player.png");

    const logosList = loadLogos();
    logosList.forEach(logo => {
      console.log("logo.src", logo.src);
      this.load.image(logo.alt, "/" + logo.src);
    });
  }

  function createBomb(this: Phaser.Scene) {
    const x = Phaser.Math.Between(0, 800);
    const bomb = bombs.create(x, 0, "bomb") as Phaser.Physics.Arcade.Sprite;
    bomb.setDisplaySize(32, 32);
    bomb.setVelocityY(200);
    console.log("Bomb created at x:", x);
  }

  function createRandomLogo(this: Phaser.Scene) {
    const logosList = loadLogos();
    const randomIndex = Phaser.Math.Between(0, logosList.length - 1);
    const logoData = logosList[randomIndex];

    const x = Phaser.Math.Between(0, 800);
    const logoSprite = this.physics.add.sprite(
      x,
      0,
      logoData.alt
    ) as Phaser.Physics.Arcade.Sprite;
    logoSprite.setDisplaySize(50, 50);
    logoSprite.setVelocityY(200);

    logos.add(logoSprite);
  }

  function create(this: Phaser.Scene) {
    this.physics.world.gravity.y = 300;

    // Create debug graphic
    // this.physics.world.createDebugGraphic(); // Enables debugging visuals

    this.add
      .image(400, 300, "sky")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(800, 600);

    player = this.physics.add.sprite(400, 500, "player");
    player.setCollideWorldBounds(true);
    // player.setDisplaySize(72, 49);
    player.setDisplaySize(76, 94);

    bombs = this.physics.add.group();
    logos = this.physics.add.group();

    if (this.input.keyboard) {
      cursors = this.input.keyboard.createCursorKeys();
      jumpKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
    }

    scoreText = this.add.text(16, 16, "Badges: 0", {
      fontSize: "32px",
      color: "#fff",
    });

    // livesText = this.add.text(16, 50, "Lives: " + lives, {
    //   fontSize: "32px",
    //   color: "#fff",
    // });

    userAddress = this.add.text(
      this.scale.width - 20,
      20,
      address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet",
      {
        fontSize: "20px",
        color: "#fff",
      }
    );
    userAddress.setOrigin(1, 0);

    // @ts-expect-error test
    this.physics.add.collider(player, bombs, hitBomb, undefined, this);
    // @ts-expect-error test
    this.physics.add.overlap(player, logos, collectLogo, undefined, this);

    const canvas = this.game.canvas;
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";
    canvas.style.position = "relative";

    playButton = this.add
      .text(400, 300, "Play", {
        fontSize: "32px",
        // fill: "#fff",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        startGame.call(this);
      });

    restartButton = this.add
      .text(400, 350, "Play Again", {
        fontSize: "32px",
        // fill: "#fff",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive()
      .setVisible(false)
      .on("pointerdown", () => {
        restartGame.call(this);
      });
  }

  function startGame(this: Phaser.Scene) {
    console.log("Game started");
    playButton.setVisible(false);
    restartButton.setVisible(false);
    score = 0;
    scoreText.setText("Badges: 0");
    gameOver = false;
    player.clearTint();
    bombs.clear(true);
    logos.clear(true);

    bombEvent = this.time.addEvent({
      delay: 1000,
      callback: createBomb,
      callbackScope: this,
      loop: true,
    });

    logoEvent = this.time.addEvent({
      delay: 1000,
      callback: createRandomLogo,
      callbackScope: this,
      loop: true,
    });

    const canvas = this.game.canvas;
    canvas.style.margin = "0 auto";
    canvas.style.display = "block";
  }

  function restartGame(this: Phaser.Scene) {
    console.log("Game restarted");
    score = 0;
    scoreText.setText("Badges: 0");
    gameOver = false;
    player.clearTint();
    bombs.clear(true);
    logos.clear(true);
    player.setPosition(400, 500);

    if (bombEvent) {
      bombEvent.remove(false);
      bombEvent = null;
    }
    if (logoEvent) {
      logoEvent.remove(false);
      logoEvent = null;
    }

    this.scene.restart();
    startGame.call(this);
  }

  function update(this: Phaser.Scene) {
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-500);
    } else if (cursors.right.isDown) {
      player.setVelocityX(500);
    } else {
      player.setVelocityX(0);
    }

    if (player.body && player.body instanceof Phaser.Physics.Arcade.Body) {
      if (player.body.onFloor()) {
        if (jumpKey.isDown) {
          player.setVelocityY(-300);
        }
      }
    }
  }

  function collectLogo(
    this: Phaser.Scene,
    player: Phaser.Physics.Arcade.Sprite,
    logo: Phaser.Physics.Arcade.Sprite
  ) {
    logo.disableBody(true, true);
    score += 1;
    scoreText.setText("Badges: " + score);
  }

  function hitBomb(
    this: Phaser.Scene,
    player: Physics.Arcade.Sprite | Physics.Arcade.Body
    // bomb: Physics.Arcade.Sprite | Physics.Arcade.Body
  ) {
    const playerSprite = player as Phaser.Physics.Arcade.Sprite;
    // const bombSprite = bomb as Phaser.Physics.Arcade.Sprite;

    console.log("Player hit a bomb");
    this.physics.pause();
    playerSprite.setTint(0xff0000);
    gameOver = true;
    onGameEnd(score);

    if (bombEvent) {
      bombEvent.remove(false);
      bombEvent = null;
    }
    if (logoEvent) {
      logoEvent.remove(false);
      logoEvent = null;
    }

    restartButton.setVisible(true);
  }

  const initializeGame = () => {
    gameRef.current = new Phaser.Game(config);
    setGameStarted(true);
  };

  useEffect(() => {
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  useEffect(() => {
    if (!gameStarted && address) {
      initializeGame();
    }
  }, [gameStarted, address]);

  return (
    <Box>
      <div id="phaser-game" />
    </Box>
  );
};

export default GamePage;
