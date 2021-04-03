/**
 * 3rd Party Imports
 */
import { Injectable } from '@angular/core';
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
/**
 * Local Imports
 */
import { RouterStateUrl } from './router.state';
/**
 * Custom Serializer for ngrx router state. It serializes lazy loaded route params, query params and extra data
 * parameter in resolver. See ngrx router-state docs for more info
 */
@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {

  constructor() {}
  /**
   * Inherited serializer function from RouterStateSerializer parent
   *
   * @param routerState
   * @return object of type RouterStateUrl
   */
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;

    const { data, params } = route;

    return { url, params, queryParams, data };
  }
}
