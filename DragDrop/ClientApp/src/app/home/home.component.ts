import { Component } from '@angular/core';
import { DraggableModule } from '../draggable/draggable.module';
import { SortEvent } from '../draggable/sortable-list.directive';

function remove(item: string, list: string[]) {
    if (list.indexOf(item) !== -1) {
        list.splice(list.indexOf(item), 1);
    }
}

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    bars = ['Bar1', 'Bar2'];
    sortableList = ['Box 1', 'Box 2', 'Box 3', 'Box 4', 'Box 5'];
    availableBars = ['Bar 1', 'Bar 2', 'Bar 3', 'Bar 4', 'Bar 5'];
    dropzone1 = ['Bar 6', 'Bar 10', 'Bar 11', 'Bar 12', 'Bar 13', 'Bar 14'];
    dropzone2 = ['Bar 7'];

    onDragStart(event: PointerEvent): void {
        console.log(`drag start! ${Math.round(event.clientX)} ${Math.round(event.clientY)}`);
    }

    onDragMove(event: PointerEvent): void {
        console.log(`drag move! ${Math.round(event.clientX)} ${Math.round(event.clientY)}`);
    }

    onDragEnd(event: PointerEvent): void {
        console.log(`drag end! ${Math.round(event.clientX)} ${Math.round(event.clientY)}`);
    }

    add(): void {
        this.bars.push('New Bar');
    }

    sort(event: SortEvent) {
        const current = this.sortableList[event.currentIndex];
        const swapWith = this.sortableList[event.newIndex];

        this.sortableList[event.newIndex] = current;
        this.sortableList[event.currentIndex] = swapWith;
    }

    move(box: string, toList: string[]): void {
        remove(box, this.availableBars);
        remove(box, this.dropzone1);
        remove(box, this.dropzone2);

        toList.push(box);
    }
}
