import Label from '../../Engine/GameObject/Label';
export default class Score extends Label {
  private score: number = 0;

  public static create(): Score {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let score = new Score();
    score.setText('0');
    score.setFont('45px Arial')
    score.setAlign('center');
    score.setPosition(canvas.width / 2, canvas.height / 4);
    return score;
  }

  public increaseScore = (): void => {
    this.score += 1;
    this.setText(this.score.toString());
  }
  
}