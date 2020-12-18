import { animate, state, style, transition, trigger } from '@angular/animations';


export const defaultAnimation =
    trigger('defaultAnimation', [
        state('open', style({
            opacity: '{{openOpacity}}'
        }), { params: { openOpacity: '1' } }),
        state('closed', style({
            opacity: '{{closedOpacity}}'
        }), { params: { closedOpacity: '0' } }),
        transition('open => closed', [
            animate('{{fadeIn}}')
        ], { params: { fadeIn: '0.1s' } }),
        transition('closed => open', [
            animate('{{fadeOut}}')
        ], { params: { fadeOut: '0.1s' } }),
    ]);