const interceptMethods = ['updateTarget', 'updateSource', 'callSource'];

export class InterceptBindingBehavior {
  bind(binding, scope, interceptor) {
    let i = interceptMethods.length;
    while (i--) {
      let method = interceptMethods[i];
      if (!binding[method]) {
        continue;
      }
      binding[`intercepted-${method}`] = binding[method];
      let update = binding[method].bind(binding);
      binding[method] = interceptor.bind(binding, method, update);
    }
  }

  unbind(binding, scope) {
    let i = interceptMethods.length;
    while (i--) {
      let method = interceptMethods[i];
      if (!binding[method]) {
        continue;
      }
      binding[method] = binding[`intercepted-${method}`];
      binding[`intercepted-${method}`] = null;
    }
  }
}