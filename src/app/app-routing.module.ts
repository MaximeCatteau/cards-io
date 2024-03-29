import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Pages

import {LoginBoxedComponent} from './DemoPages/UserPages/login-boxed/login-boxed.component';
import {RegisterBoxedComponent} from './DemoPages/UserPages/register-boxed/register-boxed.component';

// Elements

import {StandardComponent} from './DemoPages/Elements/Buttons/standard/standard.component';
import {DropdownsComponent} from './DemoPages/Elements/dropdowns/dropdowns.component';

// Components

// Tables


// Widgets

import {ChartBoxes3Component} from './DemoPages/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import { CardsComponent } from './DemoPages/Cards/cards.component';
import { CardsCollectionComponent } from './DemoPages/CardsCollection/cards-collection.component';
import { ChartjsComponent } from './DemoPages/Charts/chartjs/chartjs.component';
import { ConnexionComponent } from './DemoPages/Connexion/connexion.component';
import { IconsComponent } from './DemoPages/Elements/icons/icons.component';
import { ListGroupsComponent } from './DemoPages/Elements/list-groups/list-groups.component';
import { TimelineComponent } from './DemoPages/Elements/timeline/timeline.component';
import { TabsComponent } from './DemoPages/Components/tabs/tabs.component';
import { AccordionsComponent } from './DemoPages/Components/accordions/accordions.component';
import { ModalsComponent } from './DemoPages/Components/modals/modals.component';
import { ProgressBarComponent } from './DemoPages/Components/progress-bar/progress-bar.component';
import { TooltipsPopoversComponent } from './DemoPages/Components/tooltips-popovers/tooltips-popovers.component';
import { CarouselComponent } from './DemoPages/Components/carousel/carousel.component';
import { CodeComponent } from './DemoPages/Code/code.component';
import { PaginationComponent } from './DemoPages/Components/pagination/pagination.component';
import { ControlsComponent } from './DemoPages/Forms/Elements/controls/controls.component';
import { LayoutComponent } from './DemoPages/Forms/Elements/layout/layout.component';
import { ShopComponent } from './DemoPages/Shop/shop.component';
import { TablesMainComponent } from './DemoPages/Tables/tables-main/tables-main.component';
import { TradeComponent } from './DemoPages/Trades/trade.component';
import { ForgotPasswordBoxedComponent } from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import { AnalyticsComponent } from './DemoPages/Dashboards/analytics/analytics.component';
import { AdminComponent } from './DemoPages/Admin/admin.component';
import { ProfileComponent } from './DemoPages/Profile/profile.component';
import { JeuDuLogoComponent } from './DemoPages/JeuDuLogo/jeu-du-logo.component';
import { LadderComponent } from './DemoPages/Ladder/ladder.component';
import { WhoAmIAdminComponent } from './DemoPages/WhoAmI/Admin/who-am-i-admin.component';
import { WhoAmIComponent } from './DemoPages/WhoAmI/who-am-i.component';
import { ClubPageComponent } from './DemoPages/RPBinouze/club-page.component';
import { RpAdminComponent } from './DemoPages/RPBinouze/Admin/rp-admin.component';
import { FootballPlayerComponent } from './DemoPages/RPBinouze/FootballPlayer/football-player.component';
import { PlayMatchComponent } from './DemoPages/RPBinouze/PlayMatch/play-match.component';
import { MatchDeckComponent } from './DemoPages/RPBinouze/MatchDeck/match-deck.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [

      // Dashboads

      {path: '', component: ConnexionComponent, data: {extraParameter: 'dashboardsMenu'}},

      // Elements

      {path: 'elements/buttons-standard', component: StandardComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/dropdowns', component: DropdownsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/icons', component: IconsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/cards', component: CardsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/list-group', component: ListGroupsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/timeline', component: TimelineComponent, data: {extraParameter: 'elementsMenu'}},

      // Components

      {path: 'components/tabs', component: TabsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/accordions', component: AccordionsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/modals', component: ModalsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/progress-bar', component: ProgressBarComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/tooltips-popovers', component: TooltipsPopoversComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/carousel', component: CarouselComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/pagination', component: PaginationComponent, data: {extraParameter: 'componentsMenu'}},

      // Tables

      {path: 'tables/bootstrap', component: TablesMainComponent, data: {extraParameter: 'tablesMenu'}},

      // Widgets

      {path: 'widgets/chart-boxes-3', component: ChartBoxes3Component, data: {extraParameter: 'pagesMenu3'}},

      // Forms Elements

      {path: 'forms/controls', component: ControlsComponent, data: {extraParameter: 'formElementsMenu'}},
      {path: 'forms/layouts', component: LayoutComponent, data: {extraParameter: 'formElementsMenu'}},

      // Charts

      {path: 'charts/chartjs', component: ChartjsComponent, data: {extraParameter: ''}},

      // My Cards

      { path: 'cards', component: CardsComponent },
      { path: 'cards/:collectionId', component: CardsCollectionComponent },

      // Shop

      { path: 'shop', component: ShopComponent },

      // Trades

      { path: 'trade', component: TradeComponent },

      // Code

      { path: 'code', component: CodeComponent },

      // Admin
      { path: 'admin', component: AdminComponent },

      // Profile
      { path: 'profile', component: ProfileComponent },

      // Jeu du Logo
      { path: 'jeu-du-logo/:seasonId', component: JeuDuLogoComponent},

      // Who Am I
      { path: 'who-am-i/admin', component: WhoAmIAdminComponent },
      { path: 'who-am-i/season/:seasonId', component: WhoAmIComponent },

      // Classements
      { path: 'ladder/:collectionId', component: LadderComponent },

      // RP Binouze
      { path: 'rpbinouze/clubs/:clubId', component: ClubPageComponent},
      { path: 'rpbinouze/admin', component: RpAdminComponent},
      { path: 'rpbinouze/player/:footballPlayerId', component: FootballPlayerComponent},
      { path: 'rpbinouze/match/:matchId', component: PlayMatchComponent},
      { path: 'rpbinouze/matchdeck', component: MatchDeckComponent}
    ]

  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages

      {path: 'pages/login-boxed', component: LoginBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/register-boxed', component: RegisterBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: {extraParameter: ''}},
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
