import {Component, OnInit} from '@angular/core';

import {HttpClientService} from '../../services/httpClient.service';
import {DateHelperService} from '../../services/helpers/date.helper';
import {ToastrHelperService} from '../../services/helpers/toastr.helper';
import {DomHelperService} from '../../services/helpers/dom.helper';
import {DeviceCaptionService} from '../../services/captions/device.caption';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html'
})
export class UserCardComponent implements OnInit
    , ICommon, ICrud, IDatePicker, ISearch {

    /** My Variables **/
    public user_cards: any = [];
    public staffs: any = [];
    public cards: any = [];
    public user_card: any;

    public users: any = [];
    public suppliers: any = [];
    public distributors: any = [];
    public positions: any[] = [];
    public io_centers: any[] = [];
    public rfids: any[] = [];
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
        , private deviceCaptionService: DeviceCaptionService) {
        this._deviceCaptionService = this.deviceCaptionService;
    }

    ngOnInit(): void {
        this.title = `Cấp ${this._deviceCaptionService.card} cho nhân viên`;
        this.prefix_url = 'user-cards';
        this.range_date = this.dateHelperService.range_date;
        this.refreshData();
        this.datepickerSettings = this.dateHelperService.datepickerSettings;
        this.action_data = {
            ADD: true,
            EDIT: false,
            DELETE: true
        };
        this.header = {
            io_center_code: {
                title: 'Mã bộ trung tâm',
                data_type: 'TEXT'
            },
            io_center_name: {
                title: 'Bộ trung tâm',
                data_type: 'TEXT'
            },
            parent_name: {
                title: this._deviceCaptionService.rfid,
                data_type: 'TEXT'
            },
            card_name: {
                title: this._deviceCaptionService.card,
                data_type: 'TEXT'
            },
            card_code: {
                title: `Mã ${this._deviceCaptionService.card}`,
                data_type: 'TEXT'
            },
            card_description: {
                title: `Mô tả ${this._deviceCaptionService.card}`,
                data_type: 'TEXT'
            },
            user_fullname: {
                title: 'Nhân viên',
                data_type: 'TEXT'
            },
            user_phone: {
                title: 'SĐT',
                data_type: 'TEXT'
            },
            position_name: {
                title: 'Chức vụ',
                data_type: 'TEXT'
            },
            supplier_name: {
                title: 'Khách hàng',
                data_type: 'TEXT'
            },
            distributor_name: {
                title: 'Đại lý',
                data_type: 'TEXT'
            }
        };
        this.modal = {
            id: 0,
            header: '',
            body: '',
            footer: ''
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
        this.user_cards = [];

        this.staffs = arr_data['staffs'];

        this.cards = arr_data['cards'];

        this.users = arr_data['users'];
        this.suppliers = arr_data['suppliers'];
        this.distributors = arr_data['distributors'];
        this.positions = arr_data['positions'];
        this.io_centers = arr_data['io_centers'];
        this.rfids = arr_data['rfids'];
    }

    refreshData(): void {
        this.changeLoading(false);
        this.clearOne();
        this.clearSearch();
        this.loadData();
    }

    changeLoading(status: boolean): void {
        this.isLoading = status;
    }

    /** ICrud **/
    loadOne(id: number): void {
        this.user_card = this.user_cards.find(function (o) {
            return o.id == id;
        });

        this.domHelperService.showTab('menu2');
    }

    clearOne(): void {
        this.user_card = {
            user_id: 0,
            card_id: 0,
            active: true
        };
    }

    addOne(): void {
    }

    updateOne(): void {
    }

    deactivateOne(id: number): void {
        this.httpClientService.patch(this.prefix_url, {"id": id}).subscribe(
            (success: any) => {
                this.reloadData(success);
                this.search();
                this.toastrHelperService.showToastr('success', 'Hủy thành công.');
                this.domHelperService.toggleModal('modal-confirm');
            },
            (error: any) => {
                this.toastrHelperService.showToastrErrors(error.json());
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
                this.toastrHelperService.showToastrErrors(error.json());
            }
        );
    }

    confirmDeactivateOne(id: number): void {
        this.deactivateOne(id);
    }

    validateOne(): boolean {
        let flag: boolean = true;

        if (this.user_card.card_id == 0) {
            this.toastrHelperService.showToastr('warning', `Vui lòng chọn 1 ${this._deviceCaptionService.card}.`);
            flag = false;
        }

        if (this.user_card.user_id == 0) {
            this.toastrHelperService.showToastr('warning', 'Vui lòng chọn 1 người dùng.');
            flag = false;
        }
        return flag;
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
        this.user_cards = arr_data['user_cards'];
    }

    clearSearch(): void {
        this.datepicker_from = null;
        this.datepicker_to = null;
        this.filtering = {
            from_date: '',
            to_date: '',
            range: '',
            dis_or_sup: 'sup',
            supplier_id: 0,
            distributor_id: 0,
            position_id: 0,
            io_center_id: 0,
            rfid_id: 0,
            fullname: 0,
            phone: ''
        };
    }

    displayColumn(): void {
        let setting = {
            supplier_id: ['supplier_name'],
            distributor_id: ['distributor_name'],
            position_id: ['position_name'],
            io_center_id: ['io_center_code', 'io_center_name'],
            rfid_id: ['parent_name'],
            fullname: ['user_fullname'],
            phone: ['user_phone']
        };
        for (let parent in setting) {
            for (let child of setting[parent]) {
                if (!!this.header[child])
                    this.header[child].visible = !(!!this.filtering[parent]);
            }
        }

        this.header.supplier_name.visible = this.filtering.dis_or_sup == 'sup';
        this.header.distributor_name.visible = this.filtering.dis_or_sup == 'dis';
    }

    /** My Function **/
    public saveOne(): void {
        if (!this.validateOne()) return;

        this.httpClientService.post(this.prefix_url, {"user_card": this.user_card}).subscribe(
            (success: any) => {
                this.reloadData(success);
                this.toastrHelperService.showToastr('success', 'Tác vụ thành công.');
            },
            (error: any) => {
                this.toastrHelperService.showToastrErrors(error.json());
            }
        );
    }

    public slideCards(rfid_id: number) {
        return this.cards.filter(function (o) {
            return o['parent_id'] == rfid_id;
        });
    }

    public slideStaffs(parent_id: number, type: string) {
        let staffs = this.staffs.filter(function (o) {
            return o['dis_or_sup'] == type;
        });

        return staffs.filter(function (o) {
            return o['dis_or_sup_id'] == parent_id;
        });
    }
}
