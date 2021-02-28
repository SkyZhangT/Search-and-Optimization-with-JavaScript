//Perform depth-limited search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Will not examine paths longer than "depth_limit" (i.e. paths that have "depth_limit" states in them, or "depth_limit-1" actions in them)
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function depth_limited_search(initial_state,depth_limit) {

  /***Your code for depth-limited search here!***/
  let actions = [];
  let states = [];
  let current_depth = 0;
  /***DO NOT do repeated state or loop checking!***/

  /*
    Hint: You may implement DLS either iteratively (with open set) or recursively.

    In the iterative case, you will need to do similar to breadth-first search and augment
    the state. In addition to predecessor and action, you will also need to store depth.
    (You should be able to re-use your BFS code and only make a small amount of changes to
     accomplish this. Be sure to remove repeat checking!)

    In the recursive case, you don't need the above. Building the solution path is a little
    trickier, but I suggest you look into the Array.unshift() function.
  */
  if(traverse(initial_state,current_depth,depth_limit,states,actions)){
    return {
      actions : actions /*array of action ids*/,
      states : states /*array of states*/
    };
  }else{
    return null;
  }
}

function traverse(parent_state,current_depth,depth_limit,states,actions){
  //if parent is goal then return
  if(is_goal_state(parent_state)){
    return true;
  }

  //find childs
  let childs = find_successors(parent_state);
  let cd = current_depth + 1;

  //loop through all childs if the depth did not reach limit
  while(childs.length != 0 && cd<=depth_limit){
    //go deep in each child by recursive call, if returned true, record the state and action and return
    if(traverse(childs[0].resultState,cd,depth_limit,states,actions)){
      states.unshift(childs[0].resultState);
      actions.unshift(childs[0].actionID);
      return true;
    }else{
      childs.shift();
    }
  }
  //if nothing match goal, then return false as found nothing
  return false;
}
