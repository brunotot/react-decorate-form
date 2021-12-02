import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IFile } from '../../../../model/ValidatorBuilder';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'rib-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(FileComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class FileComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = 'form-control rib-file-text';
  @ViewChild('fileElem') fileElem!: ElementRef;
  fileTextValue: string = '';

  onFileChange(event: any) {
    let resultFiles: IFile[] = [];
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      for (let file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let result = reader.result as string;
          let resultFile: IFile = {
            content: result,
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.name,
            size: file.size,
            type: file.type
          };
          resultFiles.push(resultFile);
          this.writeValue(this.displayConfig.multiple ? resultFiles : resultFile);
          this.cd.markForCheck();
        };
      }
      if (files.length > 1) {
        this.fileTextValue = `${files.length} files selected`
      } else {
        this.fileTextValue = files[0].name;
      }
    } else {
      this.writeValue(this.displayConfig.inputEntity.getDefaultFormValue(this.displayConfig));
      this.fileTextValue = '';
    }
  }

  onFileClick() {
    this.fileElem.nativeElement.click()
  }

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }
}