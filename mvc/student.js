function onMouseDown(count, args) {
    return count + 1;
}

function onMouseDown2(state, args){
    var N = state.count;
    return {count:N+1};
}

function counter3(){
    function onMouseDown(state, args) { return onMouseDown2(state,args) }

    return { controller: { onMouseDown } };
}


function counter4() {
    function onMouseDown(state, args) { return {count: state.count+1} };

    function onKeyDown(state, args) {
        return { count: 0 };
    }

    return { controller: {onMouseDown, onKeyDown} };
}

function counter5()	{
	function onMouseDown(state, args)
	{
    if(args.shift == true && state.count > 0)
	{
		return { count:  state.count - 1  };
	}
	else if (args.shift == true && state.count <= 0)
	{
		return { count: state.count + 0  };
	}
	else if (args.shift == false)
	{
	return { count: state.count + 1 };
	}
	}


    function onKeyDown(state , args)
	{
		if(args.key === "ArrowUp"){
			return {count: state.count + 1}
		}
		else if(args.key === "ArrowDown" && state.count > 0){
			return {count: state.count -1}
		}
		else if(args.key === "0"){
			return {count: 0}
		}
		else
		{
			return { count: state.count + 0  };
		}
	}


	return {controller: { onMouseDown, onKeyDown }};
}

function counter6() {
    function increment(state) {
        return {count: state.count + 1}
     }

    function decrement(state) {
      if(state.count > 0){
      return {count: state.count - 1};
      }
      else{
        return {count: 0};
      }
   }

    function reset(state) {
        return {count: 0};
     }

     function onMouseDown(state, args)
   	{
       if(args.shift == true && state.count > 0)
   	{
   		return decrement(state);
   	}
   	else if (args.shift == true && state.count <= 0)
   	{
   		return { count: state.count + 0  };
   	}
   	else if (args.shift == false)
   	{
   	return increment(state);
   	}
}

function onKeyDown(state , args)
{
if(args.key === "ArrowUp" || args.key ===  " "){
  return increment(state);
}
else if(args.key === "ArrowDown" && state.count > 0){
  return decrement(state);
}
else if(args.key === "0"){
  return reset(state);
}
else
{
  return { count: state.count + 0  };
}
}

    const controller = { onMouseDown, onKeyDown };
    const model = { increment, decrement, reset };
    return { controller, model };
}

function counter7() {
function add(state, amount){
  if(state.count + amount <= 0){
    return {count: 0};
  }
  else{
    return {count: state.count + amount};
  }
}
    function reset(state) {
        return {count: 0};
     }

     function onMouseDown(state, args)
   	{
      if(args.ctrl == true && args.shift == true){
        return reset(state);
      }
      else if(args.ctrl == true){
        return add(state, 5)
      }
       else if(args.shift == true)
   	{
   		return add(state,-1);
   	}
   	else if (args.shift == true)
   	{
   		return { count: state.count + 0  };
   	}
   	else if (args.shift == false)
   	{
   	return add(state,1);
   	}
}

function onKeyDown(state , args)
{
  if(args.ctrl == true && (args.key === "ArrowUp" || args.key === " ")){
    return add(state,5);
  }
  else if(args.ctrl == true && (args.key === "ArrowDown" || args.key === " ")){
    return add(state,-5);
  }
else if(args.key === "ArrowUp" || args.key === " "){
  return add(state,1);
}
else if(args.key === "ArrowDown"){
  return add(state,-1);
}
else if(args.key === "0"){
  return reset(state);
}
else
{
  return { count: state.count + 0  };
}
}

    const controller = { onMouseDown, onKeyDown };
    const model = { add, reset };
    return { controller, model };
}

function chronometer(){

function timePassed(state, dt){
   return {elapsedTime:dt + state.elapsedTime};
   }

  function onTimerTick(state, dt){
    return timePassed(state, dt);
  }

  const controller = { onTimerTick };
  const model = { timePassed };
  return { model, controller };
}

function chronometer2(){

    function timePassed(state, dt){
        if (state.active){
            return { elapsedTime: state.elapsedTime + dt, active: true };
        } else {
            return { elapsedTime: state.elapsedTime, active: false };
        }
    }

    function toggle(state){
        return {elapsedTime: state.elapsedTime, active: !state.active};
    }

    function onTimerTick(state, dt){
        if (state.active){
            return { elapsedTime: state.elapsedTime + dt, active: true };
        } else {
            return { elapsedTime: state.elapsedTime, active: false };
        }
    }

    function onKeyDown(state, dt){
        if (dt.key === " "){
            return {elapsedTime: state.elapsedTime, active: !state.active};
        }
        if (dt.key === "0"){
            return {elapsedTime: 0, active: state.active};
        }
        return { elapsedTime: state.elapsedTime, active: state.active };

    }

    function reset(state){
        return { elapsedTime: 0, active: state.active};
    }

    const controller = {onTimerTick, onKeyDown};
    const model = { timePassed, toggle, reset };
    return { controller, model};
}

function circle(){

  function render(state){
      return [{type:"circle", center:{x: 100, y: 100}, radius:10, color:"red"}];
  }

  const controller = {};
  const model = {};
  const view = { render };
  return { view, model, controller };
}

function circle2(){
  function render(state){
      return [{type:"circle", center:state.position, radius:10, color:"red"}];
  }

  function moveTo(state, position){
      return {position: {x: position.x,y:position.y}};
  }

  function onMouseDown(state, args){
        return {position: args.position}
  }

  const controller = { onMouseDown };
  const model = { moveTo };
  const view = { render };
  return { view, model, controller };
}

function circle3(){
  function render(state){
      return [{type:"circle", center:state.position, radius:10, color:"red"}];
  }

  function moveTo(state, position){
      return {position: {x: position.x,y:position.y}};
  }

  function onMouseMove(state, args){
        return {position: args.position}
  }

  const controller = { onMouseMove };
  const model = { moveTo };
  const view = { render };
  return { view, model, controller };
}

function drawing(){
  function moveTo(state, position){
      if(state.addMode === true ){
        return {position: {x: position.x,y:position.y}, dots:[...state.dots, {x: position.x,y:position.y}], addMode:state.addMode};
      }
      else{
        return {position: {x: position.x,y:position.y}, dots:[], addMode:state.addMode};
      }


  }

  function setAddMode(state, addMode){
    return {position: state.position, dots:state.dots, addMode:addMode};
  }

  function onMouseMove(state, args){
 if(state.addMode === true){
   return {position: args.position, dots:[args.position], addMode:state.addMode}
 }
 else{
   return {position: args.position, dots:[], addMode:state.addMode}
 }

  }

  function onMouseDown(state, args){
        return {position: state.position, dots:[], addMode:true};
  }

  function onMouseUp(state, args){
        return {position: state.position, dots:[], addMode:false};
  }

  function render(state){
       if (state.addMode){
           return [{type: "circle", center: state.position, radius: 2, color: "red"}];
       } else {
           let foo = [];
           for (let i = 0; i < state.dots.length; i++) {
               foo.push({type: "circle", center: state.dots[i], radius: 2, color: "green"});
           }
           foo.push({type: "circle", center: state.position, radius: 5, color: "red"});
           console.log(foo);
           return foo;
       }
   }

  const controller = { onMouseMove,onMouseDown, onMouseUp };
  const model = { moveTo, setAddMode };
  const view = { render };
  return { view, model, controller };
}

function random(){

    function throwDie(state){
        let foo = (4578 * state.rng ** 2 - 976161 * state.rng + 6156489) % 79729693;
        return {rng: (4578 * state.rng ** 2 - 976161 * state.rng + 6156489) % 79729693, dieValue: foo % 6 + 1 };
    }

    function onKeyDown(state, args){
        if (args.key === " "){
            return throwDie(state);
        }
    }

    function render(state){
        return [{type: "text", position: {x: 50, y: 50}, string: state.dieValue.toString() }];
    }

    const view = {render};
    const model = {throwDie};
    const controller = {onKeyDown};
    return {view, model, controller};
}
function random2() {
    const model = (() => {
        function nextRandom(n) {
            return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
        }
        function throwDie(state) {
            const value = nextRandom(state.rng);
            return [value % 6 + 1, { ...state, rng: value }];
        }
        function generateGrade(state) {
            const [a, state2] = throwDie(state);
            const [b, state3] = throwDie(state2);
            const [c, state4] = throwDie(state3);
            return { ...state4, grade: a + b + c };
        }
        return { nextRandom, throwDie, generateGrade };
    })();
    const controller = (() => {
        function onKeyDown(state, args) {
            return model.generateGrade(state);
        }
        return { onKeyDown };
    })();
    const view = (() => {
        function render(state) {
            return [{ type: 'text', position: { x: 50, y: 50 }, string: state.grade.toString() }];
        }
        return { render };
    })();
    return { model, view, controller };
}
