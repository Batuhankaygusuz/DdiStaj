import { Pipe, PipeTransform } from '@angular/core';
import { PeriodicElement } from 'app/services/sticky-table.service';

@Pipe({
    name: 'dataFilter',
})
export class DataFilterPipe implements PipeTransform {
    transform(data: PeriodicElement[], filterValue: string): PeriodicElement[] {
        if (!data || !filterValue) {
            return data;
        }

        filterValue = filterValue.toLowerCase();
        return data.filter((element) => {
            return (
                element.user_name.toLowerCase().includes(filterValue) ||
                element.administrators.toLowerCase().includes(filterValue) ||
                element.IT_Edirne.toLowerCase().includes(filterValue) ||
                element.MBT_IST_BP_BY.toLowerCase().includes(filterValue) ||
                element.MBT_AKS_BP_BY.toLowerCase().includes(filterValue) ||
                element.MBT_AKS_BP_MY.toLowerCase().includes(filterValue) ||
                element.MBT_IST_YON.toLowerCase().includes(filterValue) ||
                element.MBT_IST_OZL_BRD.toLowerCase().includes(filterValue) ||
                element.asa.toLowerCase().includes(filterValue) ||
                element.UFUKDRUP.toLowerCase().includes(filterValue)
            );
        });
    }
}
