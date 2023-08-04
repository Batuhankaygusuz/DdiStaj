import { Clipboard } from '@angular/cdk/clipboard';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StickyTableService } from 'app/services/sticky-table.service';
@Component({
    selector: 'app-sticky-table',
    templateUrl: './sticky-table.component.html',
    styleUrls: ['./sticky-table.component.scss'],
})
export class StickyTableComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = [];

    tables = [0];
    filterValue: string = '';
    constructor(
        private stickyTableService: StickyTableService,
        private clipboard: Clipboard
    ) {
        this.displayedColumns.length = 10;
        this.displayedColumns.fill('filler');
        this.displayedColumns[0] = 'user_name';
        this.displayedColumns[1] = 'administrators';
        this.displayedColumns[2] = 'IT_Edirne';
        this.displayedColumns[3] = 'MBT_IST_BP_BY';
        this.displayedColumns[4] = 'MBT_AKS_BP_BY';
        this.displayedColumns[5] = 'MBT_AKS_BP_MY';
        this.displayedColumns[6] = 'MBT_IST_YON';
        this.displayedColumns[7] = 'MBT_IST_OZL_BRD';
        this.displayedColumns[8] = 'asa';
        this.displayedColumns[9] = 'UFUKDRUP';
    }
    dataSource: MatTableDataSource<PeriodicElement>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filterValue = filterValue.trim().toLowerCase();
        this.dataSource.filter = this.filterValue;
    }
    isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
        return (buttonToggleGroup.value || []).indexOf(id) !== -1;
    }

    copyHeader(headerText: string): void {
        this.copyToClipboard(headerText);
    }

    private copyToClipboard(text: string): void {
        this.clipboard.copy(text);
    }

    ngOnInit() {
        this.stickyTableService.data$.subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
        });

        this.stickyTableService.getDataWithCrossMarks();
    }

    hasCross(element: PeriodicElement, column: string): boolean {
        return element[column] === 'X';
    }
}
export interface PeriodicElement {
    user_name: string;
    administrators: string;
    IT_Edirne: string;
    MBT_IST_BP_BY: string;
    MBT_AKS_BP_BY: string;
    MBT_AKS_BP_MY: string;
    MBT_IST_YON: string;
    MBT_IST_OZL_BRD: string;
    asa: string;
    UFUKDRUP: string;
}
