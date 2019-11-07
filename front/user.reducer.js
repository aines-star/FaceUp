export default function(id = {}, action) {
console.log(action)
    if(action.type == 'signin') {
        console.log('Dans mon reducer --->',action.name)
        return action.name;
    } else {
        return action;
    }
  }