import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import {
    PeriodicElement,
    StickyTableService,
} from 'app/services/sticky-table.service';
import { TabType } from 'app/modules/report-board/_const/tabType.enum';
@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
    tabType = TabType;

    selectedComponent: string | null = null;
    selectedTabIndex = 0;
    dataSource: MatTableDataSource<PeriodicElement> =
        new MatTableDataSource<PeriodicElement>([]);

    tableData: TableData[] = [
        {
            tableName: 'Tablo 1',
            dataSource: new MatTableDataSource<PeriodicElement>([]),
        },
        {
            tableName: 'Tablo 2',
            dataSource: new MatTableDataSource<PeriodicElement>([]),
        },
    ];

    constructor(private stickyTableService: StickyTableService) {}

    activeTab = 'tab1';

    setActiveTab(tabName: string) {
        this.activeTab = tabName;
    }

    ngOnInit() {
        this.stickyTableService.data$.subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.tableData[0].dataSource = new MatTableDataSource(data);
        });

        this.stickyTableService.getDataWithCrossMarks();

        // if(this.activeTab == this.tabType.GroupPermission) {

        // } else if (this.activeTab == this.tabType.DocTypeByRegister)
    }

    downloadTableAsExcel(tabIndex: number) {
        const table = this.tableData[tabIndex];
        const filteredData = table.dataSource.filteredData;
        const data = JSON.parse(JSON.stringify(filteredData));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, table.tableName);

        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, 'Grup-Yetkileri');
    }

    downloadAllTablesAsExcel() {
        const workbook = XLSX.utils.book_new();
        for (const table of this.tableData) {
            const filteredData = table.dataSource.filteredData;
            const data = JSON.parse(JSON.stringify(filteredData));
            const worksheet = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, table.tableName);
        }

        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, 'Bütün-Tablolar');
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: 'application/octet-stream',
        });
        const url: string = window.URL.createObjectURL(data);
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = url;
        a.download = fileName + '.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}

interface TableData {
    tableName: string;
    dataSource: MatTableDataSource<PeriodicElement>;
}
