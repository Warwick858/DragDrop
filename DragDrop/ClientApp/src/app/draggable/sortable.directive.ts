import { Directive, forwardRef, HostBinding } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
    selector: '[appSortable]',
    providers: [
        { provide: DraggableDirective, useExisting: forwardRef(() => SortableDirective) }
    ]
})
export class SortableDirective extends DraggableDirective {
    //Make any element that uses this directive have a 'sortable' css class
    @HostBinding('class.sortable') sortable = true;
}
