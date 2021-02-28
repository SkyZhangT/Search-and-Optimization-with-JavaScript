//Define the order in which to examine/expand possible moves
//(This affects alpha-beta pruning performance)
//let move_expand_order=[0,1,2,3,4,5,6,7,8]; //Naive (linear) ordering
//let move_expand_order=[4,0,1,2,3,5,6,7,8]; //Better ordering?
//let move_expand_order=[4,0,8,6,2,1,3,5,7]; //A better ordering I have
let move_expand_order=[4,8,6,2,0,1,3,5,7]; //Even better than last one

/////////////////////////////////////////////////////////////////////////////

function tictactoe_minimax(board,cpu_player,cur_player) {
  /***********************************************************
  * board: game state, an array representing a tic-tac-toe board
  * The positions correspond as follows
  * 0|1|2
  * -+-+-
  * 3|4|5 -> [ 0,1,2,3,4,5,6,7,8 ]
  * -+-+-
  * 6|7|8
  * For each board location, use the following:
  *  -1 if this space is blank
  *   0 if it is X
  *   1 if it is O
  *
  * cpu_player: Which piece is the computer designated to play
  * cur_player: Which piece is currently playing
  *   0 if it is X
  *   1 if it is O
  * So, to check if we are currently looking at the computer's
  * moves do: if(cur_player===cpu_player)
  *
  * Returns: Javascript object with 2 members:
  *   score: The best score that can be gotten from the provided game state
  *   move: The move (location on board) to get that score
  ***********************************************************/

  //BASE CASE
  if(is_terminal(board)) //Stop if game is over
    return {
      move:null,
      score:utility(board,cpu_player) //How good was this result for us?
    }

  ++helper_expand_state_count; //DO NOT REMOVE
  //GENERATE SUCCESSORS

  let final;

  //If current player is cpu, them maximize the score,
  //otherwise, minimize the score
  if(cur_player != cpu_player){
    final ={
      move: -1,
      score: Infinity
    }
  }else{
    final ={
      move: -1,
      score: -Infinity
    }
  }


  for(let move of move_expand_order) { //For each possible move (i.e., action)
    if(board[move]!=-1) continue; //Already taken, can't move here (i.e., successor not valid)

    let new_board=board.slice(0); //Copy
    new_board[move]=cur_player; //Apply move
    //Successor state: new_board

    //RECURSION
    // What will my opponent do if I make this move?
    let results=tictactoe_minimax(new_board,cpu_player,1-cur_player);

    //MINIMAX
    /***********************
    * TASK: Implement minimax here. (What do you do with results.move and results.score ?)
    *
    * Hint: You will need a little code outside the loop as well, but the main work goes here.
    *
    * Hint: Should you find yourself in need of a very large number, try Infinity or -Infinity
    ***********************/

    //if cur_player is cpu, them pick the maximum in all children,
    //otherwise, pick the minimum
    if(cur_player != cpu_player){
      if(results.score < final.score){
        final.move = move;
        final.score = results.score;
      }
    }else{
      if(results.score > final.score){
        final.move = move;
        final.score = results.score;
      }
    }
  }


  return final;
  //Return results gathered from all sucessors (moves).
  //Which was the "best" move?

}

function is_terminal(board) {
  ++helper_eval_state_count; //DO NOT REMOVE

  /*************************
  * TASK: Implement the terminal test
  * Return true if the game is finished (i.e, a draw or someone has won)
  * Return false if the game is incomplete
  *************************/
  let blank = 0;

  //count how many blanks are there on the board
  for(var i = 0; i<board.length; i++){
    if(board[i]==-1)
      blank++;
  }
  //if no blank, return true, game over
  if(blank == 0)
    return true;

  //check if one of the player win the game while there is still blanks
  //firstly check mid, then check all corners.
  if(board[4]!=-1){
    if(board[7]==board[4] && board[1]==board[4]){
      return true;
    }else if(board[3]==board[4] && board[5]==board[4]){
      return true;
    }
  }
  if(board[0] != -1){
    if(board[1]==board[0] && board[2]==board[0]){
      return true;
    }else if(board[3]==board[0] && board[6]==board[0]){
      return true;
    }else if(board[4]==board[0] && board[8]==board[0]){
      return true;
    }
  }
  if(board[2] != -1){
    if(board[4]==board[2] && board[6]==board[2]){
      return true;
    }else if(board[5]==board[2] && board[8]==board[2]){
      return true;
    }
  }
  if(board[8] != -1){
    if(board[7]==board[8] && board[6]==board[8]){
      return true;
    }
  }


  //no one win and board still have blank then return false
  return false;
}

function utility(board,player) {
  /***********************
  * TASK: Implement the utility function
  *
  * Return the utility score for a given board, with respect to the indicated player
  *
  * Give score of 0 if the board is a draw
  * Give a positive score for wins, negative for losses.
  * Give larger scores for winning quickly or losing slowly
  * For example:
  *   Give a large, positive score if the player had a fast win (i.e., 5 if it only took 5 moves to win)
  *   Give a small, positive score if the player had a slow win (i.e., 1 if it took all 9 moves to win)
  *   Give a small, negative score if the player had a slow loss (i.e., -1 if it took all 9 moves to lose)
  *   Give a large, negative score if the player had a fast loss (i.e., -5 if it only took 5 moves to lose)
  * (DO NOT simply hard code the above 4 values, other scores are possible. Calculate the score based on the above pattern.)
  * (You may return either 0 or null if the game isn't finished, but this function should never be called in that case anyways.)
  *
  * Hint: You can find the number of turns by counting the number of non-blank spaces
  *       (Or the number of turns rmemaining by counting blank spaces.)
  ***********************/
  let playerNum = 0;
  let player1Num =0;
  let blank = 0;

  //count number of pieces of each player, and number of blank
  for(var i = 0; i< board.length; i++){
    if(board[i] == -1){
      blank++;
    }else if(board[i] == player){
      playerNum++;
    }else{
      player1Num++;
    }
  }

  //check if the input player wins the game
  let win = false;
  if(blank == 0){
    if(board[0] != -1){
      if(board[1]==board[0] && board[2]==board[0]){
        win = true;
      }else if(board[3]==board[0] && board[6]==board[0]){
        win = true;
      }else if(board[4]==board[0] && board[8]==board[0]){
        win = true;
      }
    }
    if(board[2] != -1){
      if(board[4]==board[2] && board[6]==board[2]){
        win = true;
      }else if(board[5]==board[2] && board[8]==board[2]){
        win = true;
      }
    }
    if(board[8] != -1){
      if(board[7]==board[8] && board[6]==board[8]){
        win = true;
      }
    }
    if(board[4]!=-1){
      if(board[7]==board[4] && board[1]==board[4]){
        win = true;
      }else if(board[3]==board[4] && board[5]==board[4]){
        win = true;
      }
    }

    if(!win){
      return 0;
    }else if(player == 0){
      return 1;
    }else{
      return -1
    }
  }else{
    if(playerNum == player1Num){
      if(player == 0){
        return -1-blank;
      }else{
        return 2+blank;
      }
    }else{
      if(player == 0){
        return 1+blank;
      }else{
        return -2-blank;
      }
    }
  }
}

function tictactoe_minimax_alphabeta(board,cpu_player,cur_player,alpha,beta) {
  /***********************
  * TASK: Implement Alpha-Beta Pruning
  *
  * Once you are confident in your minimax implementation, copy it here
  * and add alpha-beta pruning. (What do you do with the new alpha and beta parameters/variables?)
  *
  * Hint: Make sure you update the recursive function call to call this function!
  ***********************/
  //BASE CASE
  if(is_terminal(board)) //Stop if game is over
    return {
      move:null,
      score:utility(board,cpu_player) //How good was this result for us?
    }

  ++helper_expand_state_count; //DO NOT REMOVE
  //GENERATE SUCCESSORS

  //If current player is cpu, them maximize the score,
  //otherwise, minimize the score
  let final;
  if(cur_player != cpu_player){
    final ={
      move: -1,
      score: Infinity
    }
  }else{
    final ={
      move: -1,
      score: -Infinity
    }
  }

  for(let move of move_expand_order) { //For each possible move (i.e., action)
    if(board[move]!=-1) continue; //Already taken, can't move here (i.e., successor not valid)

    let new_board=board.slice(0); //Copy
    new_board[move]=cur_player; //Apply move
    //Successor state: new_board

    //RECURSION
    // What will my opponent do if I make this move?
    let results=tictactoe_minimax_alphabeta(new_board,cpu_player,1-cur_player,alpha,beta);
    //MINIMAX
    /***********************
    * TASK: Implement minimax here. (What do you do with results.move and results.score ?)
    *
    * Hint: You will need a little code outside the loop as well, but the main work goes here.
    *
    * Hint: Should you find yourself in need of a very large number, try Infinity or -Infinity
    ***********************/

    // if one of the children of current beta is less than alpha,
    // then escape from this branch
    // after find all beta, pick the biggest beta
    if(cur_player != cpu_player){
      if(results.score <= alpha){
        return{
          move: -1,
          score: -Infinity
        };
      }else if(results.score < beta){
        beta = results.score;
        final.move = move;
        final.score = results.score;
      }
    }else{
      if(results.score > alpha){
        alpha = results.score
        final.move = move;
        final.score = results.score;
      }
    }
  }
  return final;
  //Return results gathered from all sucessors (moves).
  //Which was the "best" move?
}

function debug(board,human_player) {
  /***********************
  * This function is run whenever you click the "Run debug function" button.
  *
  * You may use this function to run any code you need for debugging.
  * The current "initial board" and "human player" settings are passed as arguments.
  *
  * (For the purposes of grading, this function will be ignored.)
  ***********************/
  helper_log_write("Testing board:");
  helper_log_board(board);

  let tm=is_terminal(board);
  helper_log_write("is_terminal() returns "+(tm?"true":"false"));

  let u=utility(board,human_player);
  helper_log_write("utility() returns "+u+" (w.r.t. human player selection)");
}
