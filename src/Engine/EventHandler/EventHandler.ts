enum EVENTTYPE{
  CLICK = 0,
  MOUSEDOWN,
  MOUSEUP,
  ONKEYDOWN
}

export default class EventHandler {
  private static _instance: EventHandler;

  private eventListenrs: Array<{type: string, callback: any}>;
  private eventQueue: Array<any>;
  private canvas: HTMLCanvasElement;

  private constructor() {
    this.eventListenrs = new Array<any>();
    this.eventQueue = new Array<any>();
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvas.addEventListener('mousedown', this.listen);
    this.canvas.addEventListener('mouseup', this.listen);
    this.canvas.addEventListener('keydown', this.listen);
  }

  public static addEventListener(type: string, callback: any) {
    this._instance.eventListenrs.push({
      type: type,
      callback: callback
    });
  }

  public static removeEventListener(type: string, callback: any) {
    const index = this._instance.eventListenrs.findIndex((ele) => {
      return ele.type == type && ele.callback == callback});
    if (index > -1) {
      this._instance.eventListenrs.splice(index, 1);
    }
  }

  public static getInstance(): EventHandler{
    if (!EventHandler._instance) {
      EventHandler._instance = new EventHandler();
    }
    return EventHandler._instance;
  }

  public listen = (event: any) : void => {
    this.eventQueue.push(event);
  }

  public handle(): void {
    while (this.eventQueue.length) {
      let event = this.eventQueue.splice(0, 1)[0];
      this.eventListenrs.forEach(element => {
        if (element.type == event.type) {
          element.callback(event);
        }
      });
    }
  }

}