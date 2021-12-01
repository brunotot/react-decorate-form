import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IFile } from '../../../../model/ValidatorBuilder';
import VIEW_PROVIDERS, { buildProviders } from '../../../../model/Provider';
import ReactiveInput from '../../../../model/ReactiveInput';

const DEFAULT_CLASS = 'form-control width-auto';
const DEFAULT_CLASS_WITH_COLOR_PLACEHOLDER = 'form-control width-auto color-placeholder';

@Component({
  selector: 'rib-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss', './../../../../../assets/core/scss/style.scss'],
  providers: buildProviders(FileComponent),
  viewProviders: VIEW_PROVIDERS,
  encapsulation: ViewEncapsulation.None
})
export class FileComponent extends ReactiveInput implements OnInit {
  override defaultClass: string = DEFAULT_CLASS_WITH_COLOR_PLACEHOLDER;

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
      this.defaultClass = DEFAULT_CLASS;
    } else {
      this.defaultClass = DEFAULT_CLASS.concat(' color-placeholder');
      this.writeValue(this.displayConfig.inputEntity.getDefaultFormValue(this.displayConfig));
    }
  }

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    
  }
}