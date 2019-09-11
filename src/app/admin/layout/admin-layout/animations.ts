
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const routeAnimations =
  trigger('routeAnimations', [
    state('open', style({
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      opacity: 0.5,
      backgroundColor: 'green'
    })),

    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ])
  ]);

export const slideInTop =
  trigger('slideInTop', [
    state('void', style({
      opacity: 0.5,
      transform: 'translateY(-100%)',
      display: 'none'
    })),
    state('*', style({
      transform: 'translateY(0)',
      backgroundColor: 'green',
      display: 'flex'
    })),
    transition('void => *', animate('300ms')),
    transition('* => *', animate('300ms'))
  ]);

