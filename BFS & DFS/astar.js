//Perform breadth-first search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function astar_search(initial_state) {
  let open = new FastPriorityQueue(function(a,b) { return a.estimated_total_cost < b.estimated_total_cost; });
  let closed = new Set();
  let fixed_step_cost = 1; //Assume action cost is constant

  /***Your code for A* search here***/
  let final = null;

  if(is_goal_state(initial_state)){
    return {
      actions : [] /*array of action ids*/,
      states : [] /*array of states*/
    };
  }



  open.add({
    actionID : 0,
    resultState : initial_state,
    parentState : null,
    estimated_total_cost: calculate_heuristic(initial_state),
    cost_so_far:0
  });

  //keep looking for successors until found the goal state
  while(final==null){
    let parent = open.poll();  /* open the first one in the open array */
    let childs = find_successors(parent.resultState);  /* find its successors */
    let csf = parent.cost_so_far + 1;
    while(childs.length != 0){ /* check each child see if it is goal state*/
      if(is_goal_state(childs[0].resultState)){  /*if yes, then exit the loop and go find the path*/
        final = {
          actionID : childs[0].actionID,
          resultState : childs[0].resultState,
          parentState : parent
        };
      }else{  /*if no, then append it to the end of open*/
        open.add({
          actionID : childs[0].actionID,
          resultState : childs[0].resultState,
          parentState : parent,
          estimated_total_cost: calculate_heuristic(childs[0].resultState) + csf,
          cost_so_far: csf
        });
      }
      childs.shift();
    }
    closed.add(parent); /*add parent to close set*/
  }

  /*
    Hint: A* is very similar to BFS, you should only need to make a few small modifications to your BFS code.

    You will need to add values to your augmented state for path cost and estimated total cost.
    I suggest you use the member name "estimated_total_cost" so that the above priority queue code will work.

    Call function calculate_heuristic(state) (provided for you) to calculate the heuristic value for you.

    See (included) FastPriorityQueue.js for priority queue usage example.
  */

  /***Your code to generate solution path here***/

  let actions = [];
  let states = [];
  let currentState = final;
  // find the path by looping up to the root
  while(currentState!=null && currentState.parentState != null){
    actions.unshift(currentState.actionID);
    states.unshift(currentState.resultState);
    currentState = currentState.parentState
  }


  if(actions != null){
    return {
      actions : actions /*array of action ids*/,
      states : states /*array of states*/
    };
  }else{
    return null; //no solution found
  }
}
