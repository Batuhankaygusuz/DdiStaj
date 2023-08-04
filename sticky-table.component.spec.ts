import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyTableComponent } from './sticky-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

describe('StickyTableComponent', () => {
    let component: StickyTableComponent;
    let fixture: ComponentFixture<StickyTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [StickyTableComponent],
            imports: [MatSortModule, MatTableModule],
        });
        fixture = TestBed.createComponent(StickyTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
