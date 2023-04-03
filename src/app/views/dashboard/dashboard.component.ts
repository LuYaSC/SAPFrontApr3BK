import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { DashboardResult } from 'src/app/services/dashboard/models/dashboard-result';
import { StorageService } from 'src/app/services/storage.service';
import { WidgetInput } from 'src/app/services/utils/models/widget-input';

export class IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
  branchOffice: string = '';
  city: string = '';
  isDeleted: boolean;
  quantity: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users: IUser[] = [];
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  isAdmin: boolean = false;
  message: string;
  visible: boolean;
  isVisibleFisrtSection: boolean = false;
  dashboardData: DashboardResult;
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });
  datafor1Section: WidgetInput = new WidgetInput();
  datafor2Section: WidgetInput = new WidgetInput();

  constructor(private chartsData: DashboardChartsData, private dashboardService: DashboardService, private storageService: StorageService) {
    this.isAdmin = storageService.validateIsAdmin();
  }

  ngOnInit(): void {
    this.initCharts();
    this.getDataDashboard();
    /*setInterval(() => {
      this.getDataDashboard();
    }, 10000);*/
  }

  getDataDashboard() {
    this.dashboardService.getData().subscribe({
      next: (resp: DashboardResult) => {
        this.dashboardData = resp;
        this.isVisibleFisrtSection = true;
        this.users = [];
        this.getData1Section(resp);
        this.getData2Section(resp);
        for (let i = 0; i < resp.collaborators.length; i++) {
          this.users.push(new IUser({
            name: resp.collaborators[i].collaborator,//'Yiorgos Avraamu',
            state: resp.collaborators[i].collaboratorAge,
            registered: resp.collaborators[i].collaboratorStartDate,//'Jan 1, 2021',
            country: '',
            quantity: resp.collaborators[i].quantityChildrenAssigned,
            usage: this.convertToPercent(resp.collaborators[i].quantityChildrenAssigned),
            period: 'Enero, 2023 - Diciembre, 2023',
            payment: resp.collaborators[i].isDeleted ? 'Activo' : 'Inactivo',
            activity: resp.collaborators[i].collaboratorBranchOffice,//'10 sec ago',
            avatar: './assets/img/avatars/avatarwoman.jpg',
            status: this.selectColor(resp.collaborators[i].quantityChildrenAssigned),//'success',
            color: this.selectColor(resp.collaborators[i].quantityChildrenAssigned),//'success',
            branchOffice: resp.collaborators[i].collaboratorBranchOffice,
            city: resp.collaborators[i].collaboratorCity
          }));
        }
        this.notification('Datos Actualizados');
      },
      error: (error: string) => {
        this.notification(error);
      }
    });
  }

  getData1Section(data: DashboardResult) {
    this.datafor1Section.value1 = data.quantityPayedPayments;
    this.datafor1Section.title1 = 'Pagos Realizados'
    this.datafor1Section.amount1 = data.totalPayedPayments;
    this.datafor1Section.type1 = 'BS';
    this.datafor1Section.color1 = 'success';
    this.datafor1Section.value2 = data.quantityPartiallyPayedPayments;
    this.datafor1Section.title2 = 'Pagos Parciales Realizados';
    this.datafor1Section.amount2 = data.totalPartiallyPayedPayments;
    this.datafor1Section.type2 = 'BS';
    this.datafor1Section.color2 = 'info';
    this.datafor1Section.value3 = data.quantityRegisteredPayments;
    this.datafor1Section.title3 = 'Pagos por Adelantado Realizados';
    this.datafor1Section.amount3 = data.totalRegisteredPayments;
    this.datafor1Section.type3 = 'BS';
    this.datafor1Section.color3 = 'warning';
    this.datafor1Section.value4 = data.quantityUnpayPayments;
    this.datafor1Section.title4 = 'Pagos en Mora';
    this.datafor1Section.amount4 = data.totalUnpayPayments;
    this.datafor1Section.type4 = 'BS';
    this.datafor1Section.color4 = 'danger';
  }

  getData2Section(data: DashboardResult) {
    this.datafor2Section.title1 = 'Total pagos en Efectivo';
    this.datafor2Section.value1 = data.quantityCashPayments;
    this.datafor2Section.amount1 = data.totalCashPayments;
    this.datafor2Section.type1= 'BS';
    this.datafor2Section.color1 = 'info';
    this.datafor2Section.title2 = 'Total pagos en QR';
    this.datafor2Section.value2 = data.quantityQrPayments;
    this.datafor2Section.amount2 = data.totalQrPayments;
    this.datafor2Section.type2= 'BS';
    this.datafor2Section.color2 = 'success';
    this.datafor2Section.title3 = 'Total pagos en Transferencia Bancaria';
    this.datafor2Section.value3 = data.quantityTransferPayments;
    this.datafor2Section.amount3 = data.totalTransferPayments;
    this.datafor2Section.type3= 'BS';
    this.datafor2Section.color3 = 'warning';
    this.datafor2Section.isVisible4 = false;


  }

  selectColor(quantity: number) {
    return quantity >= 10 ? 'danger' : quantity <= 4 ? 'info' : 'warning';
  }

  convertToPercent(number: number): number {
    const percent: number = (number / 11) * 100;
    return percent;
  }

  notification(message: string) {
    this.message = message;
    this.visible = true;
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
