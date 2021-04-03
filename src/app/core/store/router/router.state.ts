/**
 * 3rd party Imports
 */
import { Data, Params } from '@angular/router';
/**
 * Simple interface for url, params, query params and extra data in angular Router
 */
export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}
