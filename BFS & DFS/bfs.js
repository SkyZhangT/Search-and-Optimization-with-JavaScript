//Perform breadth-first search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function breadth_first_search(initial_state) {
  let open = []; //See push()/pop() and unshift()/shift() to operate like stack or queue
                 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  let closed = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

  /***Your code for breadth-first search here***/
  let found = false;
  let final;

  //if initial_state is goal state then return
  if(is_goal_state(initial_state)){
    return {
      actions : [] /*array of action ids*/,
      states : [] /*array of states*/
    };
  }

  //push initial_state
  open.push({
    actionID : 0,
    resultState : initial_state,
    parentState : null
  });

  //keep looking for successors until found the goal state
  while(!found){
    let parent = open.shift();  /* open the first one in the open array */
    let childs = find_successors(parent.resultState);  /* find its successors */
    while(childs.length != 0){ /* check each child see if it is goal state*/
      if(is_goal_state(childs[0].resultState)){  /*if yes, then exit the loop and go find the path*/
        final = {
          actionID : childs[0].actionID,
          resultState : childs[0].resultState,
          parentState : parent
        }
        found = true;
      }else{  /*if no, then append it to the end of open*/
        open.push({
          actionID : childs[0].actionID,
          resultState : childs[0].resultState,
          parentState : parent
        })
      }
      childs.shift();
    }
    closed.add(parent); /*add parent to close set*/
  }

  /*
    Hint: In order to generate the solution path, you will need to augment
      the states to store the predecessor/parent state they were generated from
      and the action that generates the child state from the predecessor state.

	  For example, make a wrapper object that stores the state, predecessor and action.
	  Javascript objects are easy to make:
		let object={
			member_name1 : value1,
			member_name2 : value2
		};

    Hint: Because of the way Javascript Set objects handle Javascript objects, you
      will need to insert (and check for) a representative value instead of the state
      object itself. The state_to_uniqueid function has been provided to help you with
      this. For example
        let state=...;
        closed.add(state_to_uniqueid(state)); //Add state to closed set
        if(closed.has(state_to_uniqueid(state))) { ... } //Check if state is in closed set
  */

  /***Your code to generate solution path here***/
  let actions = [];
  let states = [];
  let currentState = final;
  // find the path by looping up to the root
  while(currentState.parentState != null){
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
    return null;
  }
}
