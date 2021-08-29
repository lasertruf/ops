import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {ErrorStateMatcher} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatSelectModule} from '@angular/material/select'; 
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {Ng2SearchPipeModule } from 'ng2-search-filter'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignComponent } from './sign/sign.component';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { DialogComponent } from './dialog/dialog.component';
import {DialogDataExampleDialog} from './dialog/dialog.component';
import { TopComponent } from './top/top.component'


@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    LoginComponent,
    TableComponent,
    DialogComponent,
    DialogDataExampleDialog,
    TopComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatTooltipModule,
    Ng2SearchPipeModule ,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
