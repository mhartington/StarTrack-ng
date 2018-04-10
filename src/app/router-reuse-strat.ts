import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from '@angular/router';

export class IonicRouteStrategy implements RouteReuseStrategy {

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandle
  ): void {}

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if (Object.values(future.params) && Object.values(curr.params)) {
      return deepEqual(future.params, curr.params);
    } else {
      return future.routeConfig === curr.routeConfig;
    }
  }
}

const deepEqual = (x, y) => {
  if (x === y) {
    return true;
  } else if (
    typeof x == 'object' &&
    x != null &&
    (typeof y == 'object' && y != null)
  ) {
    if (Object.keys(x).length != Object.keys(y).length) return false;

    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) return false;
      } else return false;
    }

    return true;
  } else return false;
};
