import { TestBed } from '@angular/core/testing';

import { StickyTableService } from './sticky-table.service';

describe('StickyTableService', () => {
    let service: StickyTableService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StickyTableService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
