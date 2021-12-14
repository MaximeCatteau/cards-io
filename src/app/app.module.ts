import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// LAYOUT

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

// HEADER

import {HeaderComponent} from './Layout/Components/header/header.component';
import {SearchBoxComponent} from './Layout/Components/header/elements/search-box/search-box.component';
import {UserBoxComponent} from './Layout/Components/header/elements/user-box/user-box.component';

// SIDEBAR

import {SidebarComponent} from './Layout/Components/sidebar/sidebar.component';
import {LogoComponent} from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import {FooterComponent} from './Layout/Components/footer/footer.component';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';

// Pages

import {ForgotPasswordBoxedComponent} from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './DemoPages/UserPages/login-boxed/login-boxed.component';
import {RegisterBoxedComponent} from './DemoPages/UserPages/register-boxed/register-boxed.component';

// Elements

import {StandardComponent} from './DemoPages/Elements/Buttons/standard/standard.component';
import {DropdownsComponent} from './DemoPages/Elements/dropdowns/dropdowns.component';
import {ListGroupsComponent} from './DemoPages/Elements/list-groups/list-groups.component';
import {TimelineComponent} from './DemoPages/Elements/timeline/timeline.component';
import {IconsComponent} from './DemoPages/Elements/icons/icons.component';

// Components

import {AccordionsComponent} from './DemoPages/Components/accordions/accordions.component';
import {TabsComponent} from './DemoPages/Components/tabs/tabs.component';
import {CarouselComponent} from './DemoPages/Components/carousel/carousel.component';
import {ModalsComponent} from './DemoPages/Components/modals/modals.component';
import {ProgressBarComponent} from './DemoPages/Components/progress-bar/progress-bar.component';
import {PaginationComponent} from './DemoPages/Components/pagination/pagination.component';
import {TooltipsPopoversComponent} from './DemoPages/Components/tooltips-popovers/tooltips-popovers.component';

// Tables

import {RegularComponent} from './DemoPages/Tables/regular/regular.component';
import {TablesMainComponent} from './DemoPages/Tables/tables-main/tables-main.component';

// Widgets

import {ChartBoxes3Component} from './DemoPages/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import {ControlsComponent} from './DemoPages/Forms/Elements/controls/controls.component';
import {LayoutComponent} from './DemoPages/Forms/Elements/layout/layout.component';

// Charts

import {ChartjsComponent} from './DemoPages/Charts/chartjs/chartjs.component';

// Chart.js Examples

import {LineChartComponent} from './DemoPages/Charts/chartjs/examples/line-chart/line-chart.component';
import {BarChartComponent} from './DemoPages/Charts/chartjs/examples/bar-chart/bar-chart.component';
import {ScatterChartComponent} from './DemoPages/Charts/chartjs/examples/scatter-chart/scatter-chart.component';
import {RadarChartComponent} from './DemoPages/Charts/chartjs/examples/radar-chart/radar-chart.component';
import {PolarAreaChartComponent} from './DemoPages/Charts/chartjs/examples/polar-area-chart/polar-area-chart.component';
import {BubbleChartComponent} from './DemoPages/Charts/chartjs/examples/bubble-chart/bubble-chart.component';
import {DynamicChartComponent} from './DemoPages/Charts/chartjs/examples/dynamic-chart/dynamic-chart.component';
import {DoughnutChartComponent} from './DemoPages/Charts/chartjs/examples/doughnut-chart/doughnut-chart.component';
import {PieChartComponent} from './DemoPages/Charts/chartjs/examples/pie-chart/pie-chart.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArchitectUIState, rootReducer } from './ThemeOptions/store';
import { ConfigActions } from './ThemeOptions/store/config.actions';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { CardsCollectionComponent } from './DemoPages/CardsCollection/cards-collection.component';
import { ShopComponent } from './DemoPages/Shop/shop.component';
import { TradeComponent } from './DemoPages/Trades/trade.component';
import { ConnexionComponent } from './DemoPages/Connexion/connexion.component';
import { CardsComponent } from './DemoPages/Cards/cards.component';
import { CodeComponent } from './DemoPages/Code/code.component';
import { AdminComponent } from './DemoPages/Admin/admin.component';
import { ProfileComponent } from './DemoPages/Profile/profile.component';
import { GaugeModule } from 'angular-gauge';
import { JeuDuLogoComponent } from './DemoPages/JeuDuLogo/jeu-du-logo.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,

    // HEADER

    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,

    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,

    // DEMO PAGES

    // Dashboards

    AnalyticsComponent,

    // User Pages

    ForgotPasswordBoxedComponent,
    LoginBoxedComponent,
    RegisterBoxedComponent,

    // Elements

    StandardComponent,
    IconsComponent,
    DropdownsComponent,
    ListGroupsComponent,
    TimelineComponent,

    // Components

    AccordionsComponent,
    TabsComponent,
    CarouselComponent,
    ModalsComponent,
    ProgressBarComponent,
    PaginationComponent,
    TooltipsPopoversComponent,

    // Tables

    RegularComponent,
    TablesMainComponent,

    // Dashboard Boxes

    ChartBoxes3Component,

    // Form Elements

    ControlsComponent,
    LayoutComponent,

    // CHARTS

    ChartjsComponent,

    // Chart.js Examples

    LineChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent,
    PolarAreaChartComponent,
    DynamicChartComponent,
    BubbleChartComponent,
    ScatterChartComponent,

    // CARDS.IO5
    CardsComponent,
    CardsCollectionComponent,
    ShopComponent,
    TradeComponent,
    ShopComponent,
    ConnexionComponent,
    CodeComponent,
    AdminComponent,
    ProfileComponent,
    JeuDuLogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    BrowserAnimationsModule,
    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Charts

    ChartsModule,
    GaugeModule.forRoot()
  ],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
