import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ShellComponent } from './shell/shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ImageCropperModule } from 'ngx-image-cropper';
import { SatPopoverModule } from '@ncstate/sat-popover';

import { ProfileService } from '../services/profile.service';
import { SideMenuComponent } from './navigation/side-menu/side-menu.component';
import { MatOption, MatRippleModule } from '@angular/material/core';
import { ImageCropperComponent } from './tools/image-cropper/image-cropper.component';
import { MatTableModule } from '@angular/material/table';
import { InlineEditComponent } from './tools/inline-edit/inline-edit.component';
import { EditableTableComponent } from './tools/editable-table/editable-table.component';


const components = [
  ShellComponent,
  DeleteButtonComponent,
  SideMenuComponent,
  ImageCropperComponent,
  InlineEditComponent,
  EditableTableComponent,
];

const modules = [
  CommonModule,
  RouterModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatGridListModule,
  MatRippleModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
  ImageCropperModule,
  MatTableModule,
  MatCheckboxModule,
  SatPopoverModule,
];

@NgModule({
  declarations: [
    ...components,
    ImageCropperComponent,
    InlineEditComponent,
    EditableTableComponent
  ],
  imports: [
    ...modules,
  ],
  exports: [
    ...components,
    ...modules
  ],
  providers: [
    ProfileService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule {}
