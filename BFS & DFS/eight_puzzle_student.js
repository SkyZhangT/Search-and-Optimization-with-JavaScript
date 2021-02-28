/*
================
8-puzzle problem
================
Construct a 3x3 grid, containing one blank(empty) space and one each of tiles labeled 1-8.
By exchanging tiles adjacent to the blank space with the blank space, achieve the desired configuration:
 1 2 3
 8   4
 7 6 5

State:
{
  grid : Array(3,3), Integers [0,8]
}
where grid is a 2D array whose indices correspond to the following grid positions:
 [0][0] [0][1] [0][2]
 [1][0] [1][1] [1][2]
 [2][0] [2][1] [2][2]
The value 0 is used to represent the blank space, and 1-8 for the corresponding labeled tiles.

Possible actions:
ID | Action
---+----------------------
 1 | Move tile above blank down (i.e., "move" blank up)
---+----------------------
 2 | Move tile below blank up (i.e., "move" blank down)
---+----------------------
 3 | Move tile left of blank right (i.e., "move" blank left)
---+----------------------
 4 | Move tile right of blank left (i.e., "move" blank right)
*/

//////////////////////////////////////////////////////////////////////////////
// Complete the following two functions

//Check if the given state is a goal state
//Returns: true if is goal state, false otherwise
function is_goal_state(state) {
  ++helper_eval_state_count; //Keep track of how many states are evaluated (DO NOT REMOVE!)
  for(let i=0;i<3;++i){
    for(let j=0;j<3;++j) {
      if(i==0){
        if(state.grid[i][j] != j+1)
          return false;
      }else if(i==1){
        if(j==0){
          if(state.grid[i][j] != 8)
            return false;
        }else if(j==1){
          if(state.grid[i][j] != 0)
            return false;
        }else{
          if(state.grid[i][j] != 4)
            return false;
        }
      }else{
        if(j==0){
          if(state.grid[i][j] != 7)
            return false;
        }else if(j==1){
          if(state.grid[i][j] != 6)
            return false;
        }else{
          if(state.grid[i][j] != 5)
            return false;
        }
      }
    }
  }
  return true;
}

//Find the list of actions that can be performed from the given state and the new
//states that result from each of those actions
//Returns: Array of successor objects (where each object has a valid actionID member and corresponding resultState member)
function find_successors(state) {
  ++helper_expand_state_count; //Keep track of how many states are expanded (DO NOT REMOVE!)

  let successors=[];

  var rowB = 0;
  var colB = 0;
  //find the location of the blank
  for(let i=0;i<3;++i){
    for(let j=0;j<3;++j) {
      if(state.grid[i][j] == 0){
        rowB = i;
        colB =j;
      }
    }
  }

  //if the blank is not on the bottom row, then it can be moved down
  if(rowB != 2){
    let newState={
      grid : state.grid.map(x => x.slice(0))
    };

    var temp = newState.grid[rowB+1][colB];
    newState.grid[rowB+1][colB] = 0;
    newState.grid[rowB][colB] = temp;

    successors.push({
      actionID : 2,
      resultState : newState
    });
  }

  //if the blank is not on the top row, then it can be moved up
  if(rowB != 0){
    let newState={
      grid : state.grid.map(x => x.slice(0))
    };

    var temp = newState.grid[rowB-1][colB];
    newState.grid[rowB-1][colB] = 0;
    newState.grid[rowB][colB] = temp;

    successors.push({
      actionID : 1,
      resultState : newState
    });
  }

  //if the blank is not in the left most row, then it can be moved right
  if(colB != 2){
    let newState={
      grid : state.grid.map(x => x.slice(0))
    };

    var temp = newState.grid[rowB][colB+1];
    newState.grid[rowB][colB+1] = 0;
    newState.grid[rowB][colB] = temp;

    successors.push({
      actionID : 4,
      resultState : newState
    });
  }

  //if the blank is not in the right most row, then it can be moved left
  if(colB != 0){
    let newState={
      grid : state.grid.map(x => x.slice(0))
    };

    var temp = newState.grid[rowB][colB-1];
    newState.grid[rowB][colB-1] = 0;
    newState.grid[rowB][colB] = temp;

    successors.push({
      actionID : 3,
      resultState : newState,
    });
  }

  /***Your code to generate successors here!***/

  //Hint: Javascript objects are passed by reference, so don't modify "state" directy.
  //Make copies instead:
  //  let newState={
  //    grid : state.grid.map(x => x.slice(0)) //Deep copy of grid
  //  };
  //Remember to make a new copy for each new state you make!

  //Hint: Add new elements to the successor list like so:
  //  successors.push({
  //    actionID : /*ID*/,
  //    resultState : newState
  //  });

  return successors;
}

//////////////////////////////////////////////////////////////////////////////
// Use these functions when developing your A* implementation

//Heuristic functions for the 8-puzzle problem
function calculate_heuristic(state) {
  //Total Manhattan distance heuristic
  let goal=[ [1, 2, 3], [8, 0, 4], [7, 6, 5] ];

  let g_pos=Array(9);
  let st_pos=Array(9);
  for(let j=0;j<3;++j)
    for(let i=0;i<3;++i) {
        g_pos[ goal[j][i] ]=[j,i];
        st_pos[ state.grid[j][i] ]=[j,i];
    }

  let h=0;
  for(let i=0;i<9;++i) {
    h+=Math.abs( st_pos[i][0]-g_pos[i][0] )+Math.abs( st_pos[i][1]-g_pos[i][1] );
  }
  return h;
}

/*
function calculate_heuristic(state) {
  //Misplaced tiles heuristic
  let goal=[ [1, 2, 3], [8, 0, 4], [7, 6, 5] ];

  let h=0;
  for(let j=0;j<3;++j)
    for(let i=0;i<3;++i) {
      if(state.grid[j][i]!=goal[j][i])
        ++h;
    }
  if(h>0) --h; //Account for miscounted blank
  return h;
}
*/

/*
function calculate_heuristic(state) {
  //Simplest heuristic (h(n)=0)
  return 0;
}
*/
