import _ from 'lodash';
/**
 * Percepron
 */
class Percepron{
  constructor(n){
    // 重みをランダムに作成
    this.weights = _.range(n).map((r) => _.random(-1, 1, true));
    // 学習定数
    this.c = 0.00001;
  }

  feedforward(inputs){
    const sum = inputs.map((input, i) => {
      return input * this.weights[i];
    }).reduce((p, c) => p + c);
    return this.activate(sum);
  }

  /**
   * 出力
   * @param {number} sum 合計値
   */
  activate(sum){
    return sum > 0 ? 1 : -1;
  }

  train(inputs, desired){
    // 予想値
    const guess = this.feedforward(inputs);
    const error = desired - guess;
    const newWeight = this.weights.map((w, i) => w + this.c * error * inputs[i]);
    this.weights = newWeight;
  }
}

export default Percepron;
