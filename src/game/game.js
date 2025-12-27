export default class Game {

displays = new Map();

newDisplay(name, comp) {

  if (typeof comp === 'function' && comp().viewBox) {
    
    const dis = comp();
    if (!dis.viewBox) throw new Error('Component must return a display with a viewBox property');
    this.displays.set(name, dis);

    return dis;
  }

  if (typeof comp !== 'object' || !comp.viewBox) throw new Error('Component has to be a Node object with a viewBox property');

  this.displays.set(name, comp);
  return comp;

}

start() {

  this.displays.forEach(v => document.body.appendChild(v.node));
  
}
  
}