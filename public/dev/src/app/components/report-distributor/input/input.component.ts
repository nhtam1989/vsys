import {Component, OnInit} from '@angular/core';

import {HttpClientService} from '../../../services/httpClient.service';
import {DateHelperService} from '../../../services/helpers/date.helper';
import {ToastrHelperService} from '../../../services/helpers/toastr.helper';
import {DomHelperService} from '../../../services/helpers/dom.helper';
import {FileHelperService} from '../../../services/helpers/file.helper';
import {DeviceCaptionService} from '../../../services/captions/device.caption';

@Component({
    selector: 'app-report-distributor-input',
    templateUrl: './input.component.html',
    styles: []
})
export class ReportDistributorInputComponent implements OnInit
    , ICommon, ICrud, IDatePicker, ISearch {

    /** My Variables **/
    public header_input: any;

    public report_inputs:  any[]    = [];
    public supplier:       any      = null;
    public suppliers:      any[]    = [];
    public distributors:   any[]    = [];
    public distributor:    any      = null;
    public staffs:         any[]    = [];
    public products:       any[]    = [];
    public producers:      any[]    = [];
    public product_types:  any[]    = [];
    public units:          any[]    = [];
    public cabinets:       any[]    = [];
    public first_day:      string   = '';
    public last_day:       string   = '';
    public today:          string   = '';
    public filter_ReportInput : any;
    public isLoading_Input: boolean = true;

    public datepicker_from_input: Date;
    public datepicker_to_input: Date;
    public datepickerToOpts_input: any = {};

    public _deviceCaptionService;

    /** ICommon **/
    title: string;
    placeholder_code: string;
    prefix_url: string;
    isLoading: boolean;
    header: any;
    action_data: any;

    /** ICrud **/
    modal: any;
    isEdit: boolean;

    /** IDatePicker **/
    range_date: any[];
    datepickerSettings: any;
    datepicker_from: Date;
    datepicker_to: Date;
    datepickerToOpts: any = {};

    /** ISearch **/
    filtering: any;

    constructor(private httpClientService: HttpClientService
        , private dateHelperService: DateHelperService
        , private toastrHelperService: ToastrHelperService
        , private domHelperService: DomHelperService
        , private fileHelperService: FileHelperService
        , private deviceCaptionService: DeviceCaptionService) {
        this._deviceCaptionService = this.deviceCaptionService;
    }

    ngOnInit(): void {
        this.title = 'Báo cáo đại lý';
        this.prefix_url = 'report-distributors';
        this.range_date = this.dateHelperService.range_date;
        this.refreshData();
        this.datepickerSettings = this.dateHelperService.datepickerSettings;
        this.action_data = {
            ADD: false,
            EDIT: false,
            DELETE: false
        };
        this.header_input =  {
            date_input: {
                title: 'Ngày',
                data_type: 'DATETIME',
                prop_name: 'created_date'
            },
            time_input: {
                title: 'Giờ',
                data_type: 'DATETIME',
                prop_name: 'created_date'
            },
            staff_input_fullname: {
                title: 'NV nhập',
                data_type: 'TEXT'
            },
            adjuster_fullname: {
                title: 'NV điều chỉnh',
                data_type: 'TEXT'
            },
            cabinet_name: {
                title: this._deviceCaptionService.cabinet,
                data_type: 'TEXT'
            },
            tray_name: {
                title: this._deviceCaptionService.tray,
                data_type: 'TEXT'
            },
            product_barcode: {
                title: 'Mã vạch SP',
                data_type: 'TEXT'
            },
            product_name: {
                title: 'Tên sản phẩm',
                data_type: 'TEXT'
            },
            unit_name: {
                title: 'ĐVT',
                data_type: 'TEXT'
            },
            quantum_in: {
                title: 'SL nhập',
                data_type: 'NUMBER'
            },
            fc_product_price: {
                title: 'Đơn giá',
                data_type: 'NUMBER',
                prop_name: 'product_price'
            },
            fc_total_pay: {
                title: 'Thành tiền',
                data_type: 'NUMBER',
                prop_name: 'total_pay'
            }
        };
    }

    /** ICommon **/
    loadData(): void {
        this.httpClientService.get(this.prefix_url).subscribe(
            (success: any) => {
                this.reloadData(success);
                this.changeLoading(true);
            },
            (error: any) => {
                this.toastrHelperService.showToastr('error');
            }
        );
    }

    reloadData(arr_data: any[]): void {
        this.first_day = arr_data['first_day'];
        this.last_day = arr_data['last_day'];
        this.today = arr_data['today'];

        this.supplier = arr_data['supplier'];

        this.suppliers = arr_data['suppliers'];

        this.distributors = arr_data['distributors'];

        this.distributor = arr_data['distributor'];

        this.staffs = arr_data['staffs'];

        this.products = arr_data['products'];

        this.producers = arr_data['producers'];

        this.product_types = arr_data['product_types'];

        this.units = arr_data['units'];

        this.cabinets = arr_data['cabinets'];
    }

    refreshData(): void {
        this.changeLoading(false);
        this.clearOne();
        this.clearSearch();
        this.clearSearchReportInput();
        this.loadData();
    }

    changeLoading(status: boolean): void {
        this.isLoading = status;
    }

    /** ICrud **/
    loadOne(id: number): void {
    }

    clearOne(): void {
    }

    addOne(): void {
    }

    updateOne(): void {
    }

    deactivateOne(id: number): void {
        this.httpClientService.patch(this.prefix_url, {"id": id}).subscribe(
            (success: any) => {
                this.reloadData(success);
                this.toastrHelperService.showToastr('success', 'Hủy thành công.');
                this.domHelperService.toggleModal('modal-confirm');
            },
            (error: any) => {
                this.toastrHelperService.showToastr('error');
            }
        );
    }

    deleteOne(id: number): void {
        this.httpClientService.delete(`${this.prefix_url}/${id}`).subscribe(
            (success: any) => {
                this.reloadData(success);
                this.toastrHelperService.showToastr('success', 'Xóa thành công!');
            },
            (error: any) => {
                this.toastrHelperService.showToastr('error');
            }
        );
    }

    confirmDeactivateOne(id: number): void {
        this.deactivateOne(id);
    }

    validateOne(): boolean {
        return null;
    }

    displayEditBtn(status: boolean): void {
        this.isEdit = status;
    }

    fillDataModal(id: number): void {
        this.modal.id = id;
        this.modal.header = 'Xác nhận';
        this.modal.body = `Có chắc muốn xóa ${this.title} này?`;
        this.modal.footer = 'OK';
    }

    actionCrud(obj: any): void {
        switch (obj.mode) {
            case 'ADD':
                this.displayEditBtn(false);
                this.clearOne();
                this.domHelperService.showTab('menu2');
                break;
            case 'EDIT':
                this.loadOne(obj.data.id);
                break;
            case 'DELETE':
                this.fillDataModal(obj.data.id);
                break;
            default:
                break;
        }
    }

    /** IDatePicker **/
    handleDateFromChange(dateFrom: Date): void {
        this.datepicker_from = dateFrom;
        this.datepickerToOpts = {
            startDate: dateFrom,
            autoclose: true,
            todayBtn: 'linked',
            todayHighlight: true,
            icon: this.dateHelperService.icon_calendar,
            placeholder: this.dateHelperService.date_placeholder,
            format: 'dd/mm/yyyy'
        };
    }

    clearDate(event: any, field: string): void {
        if (event == null) {
            switch (field) {
                case 'from':
                    this.filtering.from_date = '';
                    break;
                case 'to':
                    this.filtering.from_date = '';
                    break;
                default:
                    break;
            }
        }
    }

    /** ISearch **/
    search(): void {
        if (this.datepicker_from != null && this.datepicker_to != null) {
            let from_date = this.dateHelperService.getDate(this.datepicker_from);
            let to_date = this.dateHelperService.getDate(this.datepicker_to);
            this.filtering.from_date = from_date;
            this.filtering.to_date = to_date;
        }
        this.changeLoading(false);

        this.httpClientService.get(`${this.prefix_url}/search?query=${JSON.stringify(this.filtering)}`).subscribe(
            (success: any) => {
                this.reloadDataSearch(success);
                this.displayColumn();
                this.changeLoading(true);
            },
            (error: any) => {
                this.toastrHelperService.showToastr('error');
            }
        );
    }

    reloadDataSearch(arr_data: any[]): void {
    }

    clearSearch(): void {
    }

    displayColumn(): void {
    }

    /** My Function **/
    public myHandleDateFromChange(dateFrom: Date, mode) {
        switch (mode) {
            case 'input':
                this.datepicker_from_input = dateFrom;
                this.datepickerToOpts_input = {
                    startDate: dateFrom,
                    autoclose: true,
                    todayBtn: 'linked',
                    todayHighlight: true,
                    icon: this.dateHelperService.icon_calendar,
                    placeholder: this.dateHelperService.date_placeholder,
                    format: 'dd/mm/yyyy'
                };
                break;
            default:
                break;
        }
    }

    /** Search Report Input */
    public search_ReportInput() {
        if(this.datepicker_from_input != null && this.datepicker_to_input != null) {
            let from_date = this.dateHelperService.getDate(this.datepicker_from_input);
            let to_date = this.dateHelperService.getDate(this.datepicker_to_input);
            this.filter_ReportInput.from_date = from_date;
            this.filter_ReportInput.to_date = to_date;
        }
        this.myChangeLoading('input', false);

        this.filter_ReportInput.show_type = 'web';

        this.httpClientService.get(`${this.prefix_url}/report-inputs/search?query=${JSON.stringify(this.filter_ReportInput)}`).subscribe(
            (success: any) => {
                this.reloadDataReportInput(success);
                this.myDisplayColumn('input');
                this.myChangeLoading('input', true);
            },
            (error: any) => {
                this.toastrHelperService.showToastr('error');
            }
        );
    }

    private reloadDataReportInput(arr_datas): void {
        this.report_inputs = arr_datas['report_inputs'];
    }

    public clearSearchReportInput(): void {
        this.datepicker_from_input = null;
        this.datepicker_to_input = null;
        this.filter_ReportInput = {
            from_date: '',
            to_date: '',
            range: '',
            adjust_by: false,
            product_id: 0,
            unit_id: 0,
            staff_input_id: 0,
            cabinet_id: 0,
            show_type: ''
        };
    }

    public myChangeLoading(type: string, status: boolean): void {
        switch (type) {
            case 'input':
                this.isLoading_Input = status;
                break;
            default:
                break;
        }
    }

    public myClearDate(event: any, mode: string, field: string) {
        if (event == null) {
            switch (mode) {
                case 'input':
                    switch (field) {
                        case 'from':
                            this.filter_ReportInput.from_date = '';
                            break;
                        case 'to':
                            this.filter_ReportInput.to_date = '';
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        }
    }

    public myDisplayColumn(mode: string) {
        let setting = {
            product_id: ['product_barcode', 'product_name'],
            unit_id: ['unit_name'],
            distributor_id: ['distributor_name'],
            staff_input_id: ['staff_input_name'],
            staff_output_id: ['staff_output_name'],
            cabinet_id: ['cabinet_name'],
            adjust_by: ['adjuster_fullname']
        };
        switch (mode) {
            case 'input':
                for (let parent in setting) {
                    for (let child of setting[parent]) {
                        if (!!this.header_input[child])
                            this.header_input[child].visible = !(!!this.filter_ReportInput[parent]);
                    }
                }
                break;
            default:
                break;
        }
    }

    public downloadFile(mode: string) {
        let subfix_filename: string = '';
        let url: string = '';
        switch (mode) {
            case 'input':
                subfix_filename = 'Nhap';
                if (this.datepicker_from_input != null && this.datepicker_to_input != null) {
                    let from_date = this.dateHelperService.getDate(this.datepicker_from_input);
                    let to_date = this.dateHelperService.getDate(this.datepicker_to_input);
                    this.filter_ReportInput.from_date = from_date;
                    this.filter_ReportInput.to_date = to_date;
                }
                this.filter_ReportInput.show_type = 'csv';
                url = `report-inputs/search?query=${JSON.stringify(this.filter_ReportInput)}`;
                break;
            default: break;
        }
        this.httpClientService.get(`${this.prefix_url}/${url}`, 'text')
            .subscribe(
                (success: any) => {
                    this.fileHelperService.downloadFile(success, `BaoCaoDaiLy_${subfix_filename}.csv`, 'text/csv');
                },
                (error: any) => {
                    this.toastrHelperService.showToastr('error');
                }
            );
    }
}
