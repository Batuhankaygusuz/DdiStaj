import { DataFilterPipe } from './pipes/DataFilter.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '@fuse/shared/crud-table/workflow-api/_interceptor/Auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {
    MatTableDataSource,
    MatTableModule,
    _MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StickyTableComponent } from './sticky-table/sticky-table.component';
import { ContentComponent } from './content/content.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { FormsModule } from '@angular/forms';
import { StickyTableService } from './services/sticky-table.service';
import { ClipboardModule } from '@angular/cdk/clipboard';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [
        AppComponent,
        StickyTableComponent,
        ContentComponent,
        TableFilterComponent,
        TruncatePipe,
        DataFilterPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        FormsModule,

        // Core module of your application
        CoreModule,
        ClipboardModule,
        HttpClientModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatButtonToggleModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        /*,
         ServiceWorkerModule.register('ngsw-worker.js', {
           enabled: environment.production,
           // Register the ServiceWorker as soon as the application is stable
           // or after 30 seconds (whichever comes first).
           registrationStrategy: 'registerWhenStable:30000'
         })*/
    ],
    bootstrap: [AppComponent],
    providers: [
        StickyTableService,

        //Development
        //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
})
export class AppModule {}
