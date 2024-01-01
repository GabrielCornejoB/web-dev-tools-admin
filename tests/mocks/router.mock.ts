import { Router } from '@angular/router';

/**
 * Router mock meant to be used in Unit tests, is a partial object of the Router class
 */
export const RouterMock: Partial<Router> = {
  navigateByUrl: jest.fn(),
};
