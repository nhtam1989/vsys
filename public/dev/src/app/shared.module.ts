import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// 3rd libraries
import {NKDatetimeModule} from 'ng2-datetime/ng2-datetime';

// My libraries
import {ModalComponent} from './dynamic-components/modal/modal.component';
import {CurrencyComponent} from './dynamic-components/currency/currency.component';
import {SpinnerComponent} from './dynamic-components/spinner/spinner.component';
import {SpinnerFbComponent} from './dynamic-components/spinner-fb/spinner-fb.component';
import {XAutoCompleteComponent} from './dynamic-components/xautocomplete/xautocomplete.component';
import {XDatatableComponent} from './dynamic-components/xdatatable/xdatatable.component';
import {ObjNgFor} from './pipes/objngfor.pipe';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {SafeDomPipe} from './pipes/safe-dom.pipe';
import {MonthPicker} from './dynamic-components/month-picker/month-picker.component';
import {YearPicker} from './dynamic-components/year-picker/year-picker.component';
import {XPaginationComponent} from './dynamic-components/xpagination/xpagination.component';
import {MasterDetailComponent} from './dynamic-components/master-detail/master-detail.component';
import {CounterComponent} from './dynamic-components/counter/counter.component';
import {XNumberComponent} from './dynamic-components/xnumber/xnumber.component';

// My components
import {ProductComponent} from './components/product/product.component';
import {ProductTypeComponent} from './components/product-type/product-type.component';
import {CollectionComponent} from './components/collection/collection.component';
import {DeviceComponent} from './components/device/device.component';
import {UserCardComponent} from './components/user-card/user-card.component';
import {ProducerComponent} from './components/producer/producer.component';
import {ButtonProductComponent} from './components/button-product/button-product.component';
import {ReportSupplierComponent} from './components/report-supplier/report-supplier.component';
import {ReportDistributorComponent} from './components/report-distributor/report-distributor.component';
import {IOCenterComponent} from './components/io-center/io-center.component';
import {SupplierComponent} from './components/supplier/supplier.component';
import {DistributorComponent} from './components/distributor/distributor.component';
import {UnitComponent} from './components/unit/unit.component';
import {PositionComponent} from './components/position/position.component';
import {UserComponent} from './components/user/user.component';
import {ReportStaffInputComponent} from './components/report-staff-input/report-staff-input.component';
import {ReportStaffOutputComponent} from './components/report-staff-output/report-staff-output.component';
import {ReportVsysComponent} from './components/report-vsys/report-vsys.component';
import {ReportLoggingComponent} from './components/report-logging/report-logging.component';

import {ReportSupplierInputComponent} from './components/report-supplier/input/input.component';
import {ReportSupplierSaleComponent} from './components/report-supplier/sale/sale.component';
import {ReportSupplierStockComponent} from './components/report-supplier/stock/stock.component';
import {ReportSupplierTotalComponent} from './components/report-supplier/total/total.component';
import {ReportDistributorInputComponent} from './components/report-distributor/input/input.component';
import {ReportDistributorSaleComponent} from './components/report-distributor/sale/sale.component';
import {ReportDistributorStockComponent} from './components/report-distributor/stock/stock.component';
import {ReportDistributorTotalComponent} from './components/report-distributor/total/total.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        NKDatetimeModule,
    ],
    declarations: [
        ModalComponent,
        CurrencyComponent,
        SpinnerComponent,
        SpinnerFbComponent,
        XAutoCompleteComponent,
        XDatatableComponent,
        ObjNgFor,
        SafeHtmlPipe,
        SafeDomPipe,
        MonthPicker,
        YearPicker,
        XPaginationComponent,
        MasterDetailComponent,
        CounterComponent,
        XNumberComponent,

        ProductComponent,
        ProductTypeComponent,
        CollectionComponent,
        DeviceComponent,
        UserCardComponent,
        ProducerComponent,
        ButtonProductComponent,
        ReportSupplierComponent,
        ReportDistributorComponent,
        IOCenterComponent,
        SupplierComponent,
        DistributorComponent,
        UnitComponent,
        PositionComponent,
        UserComponent,
        ReportStaffInputComponent,
        ReportStaffOutputComponent,
        ReportVsysComponent,
        ReportLoggingComponent,

        ReportSupplierInputComponent,
        ReportSupplierSaleComponent,
        ReportSupplierStockComponent,
        ReportSupplierTotalComponent,
        ReportDistributorInputComponent,
        ReportDistributorSaleComponent,
        ReportDistributorStockComponent,
        ReportDistributorTotalComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        NKDatetimeModule,

        ModalComponent,
        CurrencyComponent,
        SpinnerComponent,
        SpinnerFbComponent,
        XAutoCompleteComponent,
        XDatatableComponent,
        ObjNgFor,
        SafeHtmlPipe,
        SafeDomPipe,
        MonthPicker,
        YearPicker,
        XPaginationComponent,
        MasterDetailComponent,
        CounterComponent,
        XNumberComponent,

        ProductComponent,
        ProductTypeComponent,
        CollectionComponent,
        DeviceComponent,
        UserCardComponent,
        ProducerComponent,
        ButtonProductComponent,
        ReportSupplierComponent,
        ReportDistributorComponent,
        IOCenterComponent,
        SupplierComponent,
        DistributorComponent,
        UnitComponent,
        PositionComponent,
        UserComponent,
        ReportStaffInputComponent,
        ReportStaffOutputComponent,
        ReportVsysComponent,
        ReportLoggingComponent,

        ReportSupplierInputComponent,
        ReportSupplierSaleComponent,
        ReportSupplierStockComponent,
        ReportSupplierTotalComponent,
        ReportDistributorInputComponent,
        ReportDistributorSaleComponent,
        ReportDistributorStockComponent,
        ReportDistributorTotalComponent,
    ]
})
export class SharedModule {
}
