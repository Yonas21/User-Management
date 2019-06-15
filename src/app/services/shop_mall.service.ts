import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ShopMallService {

    isOpen = false;

    @Output() change: EventEmitter<any> = new EventEmitter();

    toggle(value: any) {
        this.change.emit(value);
    }
    findProducts(value: any) {
        this.change.emit(value);
    }

}
