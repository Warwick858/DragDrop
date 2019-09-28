import { Directive, HostBinding, HostListener, Output, EventEmitter, TemplateRef, Input, ViewContainerRef, ContentChild, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDraggable], [appDroppable]'
})
export class DraggableDirective {
    pointerId?: number;

    //private isDragging = false;
    @HostBinding('class.isDragging') isDragging = false;

    @HostBinding('class.draggable') draggable = true;
    @Output() dragStart = new EventEmitter<PointerEvent>();
    @Output() dragMove = new EventEmitter<PointerEvent>();
    @Output() dragEnd = new EventEmitter<PointerEvent>();

    //@ContentChild(DraggableHelperDirective) helper: DraggableHelperDirective;

    constructor(public element: ElementRef) { }

    @HostListener('pointerdown', ['$event'])
    onPointerDown(event: PointerEvent): void {
        if (event.button !== 0) {
            return;
        }

        this.pointerId = event.pointerId;

        this.isDragging = true;
        //event.stopPropagation(); // prevents the pointer event from bubbling up to parent elements
        this.dragStart.emit(event);
    }

    @HostListener('document:pointermove', ['$event'])
    onPointerMove(event: PointerEvent): void {
        if (!this.isDragging || event.pointerId !== this.pointerId)
            return;

        this.dragMove.emit(event);
    }

    @HostListener('document:pointercancel', ['$event'])
    @HostListener('document:pointerup', ['$event'])
    onPointerUp(event: PointerEvent): void {
        if (!this.isDragging || event.pointerId !== this.pointerId)
            return;

        this.dragEnd.emit(event);
        this.isDragging = false;
    }
}
