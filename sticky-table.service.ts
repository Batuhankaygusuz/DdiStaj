import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sampleData } from 'assets/sampledata';

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

@Injectable({
    providedIn: 'root',
})
export class StickyTableService {
    private data = new BehaviorSubject<PeriodicElement[]>([]);
    private processedData = new BehaviorSubject<PeriodicElement[]>([]);

    public data$ = this.data.asObservable();

    getProcessedData() {
        return this.processedData.asObservable();
    }

    getDataWithCrossMarks() {
        const processedData: PeriodicElement[] = [];
        const uniqueUsers = [
            ...new Set(sampleData.map((item) => item.user_name)),
        ];

        uniqueUsers.forEach((userName) => {
            const newUser: PeriodicElement = {
                user_name: userName,
                administrators: '',
                IT_Edirne: '',
                MBT_IST_BP_BY: '',
                MBT_AKS_BP_BY: '',
                MBT_AKS_BP_MY: '',
                MBT_IST_YON: '',
                MBT_IST_OZL_BRD: '',
                asa: '',
                UFUKDRUP: '',
            };

            const userGroups = sampleData.filter(
                (item) => item.user_name === userName
            );
            userGroups.forEach((group) => {
                switch (group.group) {
                    case 'Administrators':
                        newUser.administrators = 'X';
                        break;
                    case 'IT Edirne':
                        newUser.IT_Edirne = 'X';
                        break;
                    case 'MBT_IST_BP_BY':
                        newUser.MBT_IST_BP_BY = 'X';
                        break;
                    case 'MBT_AKS_BP_BY':
                        newUser.MBT_AKS_BP_BY = 'X';
                        break;
                    case 'MBT_AKS_BP_MY':
                        newUser.MBT_AKS_BP_MY = 'X';
                        break;
                    case 'MBT_IST_YON':
                        newUser.MBT_IST_YON = 'X';
                        break;
                    case 'MBT_IST_OZL_BRD':
                        newUser.MBT_IST_OZL_BRD = 'X';
                        break;
                    case 'asa':
                        newUser.asa = 'X';
                        break;
                    case 'UFUKDRUP':
                        newUser.UFUKDRUP = 'X';
                        break;
                    default:
                        break;
                }
            });

            processedData.push(newUser);
        });

        this.data.next(processedData);
        this.processedData.next(processedData);
    }
}
