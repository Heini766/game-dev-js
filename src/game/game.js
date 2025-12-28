export default class Game {

displays = new Map();
entities = new Map();

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

createEntity(name, config = {}) {

  if (this.entities.has(name)) throw new Error(`Entity with name "${name}" already exists`);
  this.entities.set(name, config);

  return this.entities

};

new(name) {

  if (this.entities.has(name)) {
    if (!this[name + 's']) this[name + 's'] = [];
    const entity = new Entity(this.entities.get(name));
    this[name + 's'].push(entity);
    return entity;
  }

  
}

start() {

  this.displays.forEach(v => document.body.appendChild(v.node));
  
}
  
}

// helper classes

class Entity {

#parent = undefined;

constructor(data) {

  if (!data.parent) throw new Error('Entity must have a parent node');
  this.#parent = data.parent;
  
  if (data.comp && typeof data.comp === 'function') {
    this.obj = data.comp();
  } else {
    this.obj = data.comp || null;
  }

  if (this.obj) {
    this.#parent.add(this.obj);
    this.obj.cut()
  } else throw new Error('Entity must have a component object')

  if (data.meta && data.meta === 'function') {
    data.meta = data.meta()
  }
  
  if (data.meta && typeof data.meta === 'object') {
    for (const key in data.meta) {
      if (Object.prototype.hasOwnProperty.call(data.meta, key)) {
        this[key] = typeof data.meta[key] === 'function' ? data.meta[key]() : data.meta[key];
      }
    }
  }

  if (data.animation && typeof data.animation === 'object') this.animation = data.animation;
  
}

spawn(pos) {

  this.obj.place(pos);
  
}
  
}