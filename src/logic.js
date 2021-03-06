function info() {
  console.log("INFO");
  const response = {
    apiversion: "1",
    author: "joshsuson",
    color: "#85dc9a",
    head: "bendr",
    tail: "bolt",
  };
  return response;
}

function start(gameState) {
  console.log(`${gameState.game.id} START`);
}

function end(gameState) {
  console.log(`${gameState.game.id} END\n`);
}

function move(gameState) {
  let possibleMoves = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // Step 0: Don't let your Battlesnake move back on its own neck
  const myHead = gameState.you.head;
  const myNeck = gameState.you.body[1];
  if (myNeck.x < myHead.x) {
    possibleMoves.left = false;
  } else if (myNeck.x > myHead.x) {
    possibleMoves.right = false;
  } else if (myNeck.y < myHead.y) {
    possibleMoves.down = false;
  } else if (myNeck.y > myHead.y) {
    possibleMoves.up = false;
  }

  // TODO: Step 1 - Don't hit walls.
  // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  if (myHead.y === boardHeight - 1) {
    possibleMoves.up = false;
  }
  if (myHead.y === 0) {
    possibleMoves.down = false;
  }
  if (myHead.x === 0) {
    possibleMoves.left = false;
  }
  if (myHead.x === boardWidth - 1) {
    possibleMoves.right = false;
  }

  // TODO: Step 2 - Don't hit yourself.
  // Use information in gameState to prevent your Battlesnake from colliding with itself.
  const myBody = gameState.you.body;

  myBody.forEach((block) => {
    if (myHead.x === block.x + 1 && myHead.y === block.y) {
      possibleMoves.left = false;
    }
    if (myHead.x === block.x - 1 && myHead.y === block.y) {
      possibleMoves.right = false;
    }
    if (myHead.y === block.y + 1 && myHead.x === block.x) {
      possibleMoves.up = false;
    }
    if (myHead.y === block.y - 1 && myHead.x === block.x) {
      possibleMoves.down = false;
    }
  });

  console.log(myHead);
  console.log(possibleMoves);

  // TODO: Step 3 - Don't collide with others.
  // Use information in gameState to prevent your Battlesnake from colliding with others.

  // TODO: Step 4 - Find food.
  // Use information in gameState to seek out and find food.

  // Finally, choose a move from the available safe moves.
  // TODO: Step 5 - Select a move to make based on strategy, rather than random.
  const safeMoves = Object.keys(possibleMoves).filter(
    (key) => possibleMoves[key]
  );
  const response = {
    move: safeMoves[Math.floor(Math.random() * safeMoves.length)],
  };

  console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`);
  return response;
}

module.exports = {
  info: info,
  start: start,
  move: move,
  end: end,
};
