import { animate, state, style, transition, trigger, animateChild, group, query } from '@angular/animations';


export const defaultAnimation =
    trigger('defaultAnimation', [
        state('open', style({
            opacity: '{{openOpacity}}'
        }), { params: { openOpacity: '1' } }),
        state('closed', style({
            opacity: '{{closedOpacity}}'
        }), { params: { closedOpacity: '0.3' } }),
        transition('open => closed', [
            animate('{{fadeIn}}')
        ], { params: { fadeIn: '0.1s' } }),
        transition('closed => open', [
            animate('{{fadeOut}}')
        ], { params: { fadeOut: '0.1s' } }),
    ]);

export const AnimationRoute =
    trigger('routeAnimations', [

        transition('* => *', group([

            query(' :enter,  :leave ', [
                style({
                    position: 'absolute',
                    top: '1rem',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem'
                })
            ], { optional: true }),

            query(' :enter', [
                style({
                    opacity: 0
                })
            ], { optional: true }),
            query(' :leave', [
                style({
                    opacity: 1
                }),
                animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                    style({
                        opacity: 0
                    }))
            ], { optional: true }),
            query(' :enter', [
                style({
                    opacity: 0
                }),
                animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                    style({
                        opacity: 1
                    }))
            ], { optional: true }),
            query(' :enter', animateChild(), { optional: true }),
            query(' :leave', animateChild(), { optional: true })
        ]))
    ])