/**
 * Counter
 */
class Counter{
  constructor(){
    this.count = 0;
  }

  up(c = 0){
    this.count += c;
  }
}

export default Counter;
