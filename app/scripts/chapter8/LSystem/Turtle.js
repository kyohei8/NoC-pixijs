/**
 * Turtle
 */
class Turtle{
  constructor(todo, len, theta){
    this.todo = todo;
    this.len = len;
    this.theta = theta;
  }

  render(){
    [...this.todo].forEach((c) => {
      console.log(c);
      switch (c) {
        case 'F':
        case 'G':
          break;
        case '+':
          break;
        case '-':
          break;
        case '[':
          break;
        case ']':
          break;
        default:
      }
    });
  }

  setTodo(todo){
    this.todo = todo;
  }

  changeLen(parcent){
    this.len *= parcent;
  }
}

export default Turtle;
