import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

const TOAST_DURATION_IN_MS = 6000;
const TOAST_END_OPACITY_DURATION_IN_MS = 200;

export enum ToastType {
  DEFAULT = 'default',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info'
}

export interface IToastConfig {
  type?: ToastType,
  title?: string,
  body?: string
}

function getNormalizedToastConfig(config: IToastConfig) {
  if (!config.type) config.type = ToastType.DEFAULT
  if (!config.title) config.title = ''
  if (!config.body) config.body = ''
  return config
}

@Injectable()
export class ToastService {
  private renderer!: Renderer2;
  private toastListWrapper!: HTMLElement
  
  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) { 
    this.onInit()
  }

  onInit() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.toastListWrapper = this.buildToastListWrapperElem()
    this.renderer.appendChild(this.document.body, this.toastListWrapper);
  }

  buildToastListWrapperElem(): HTMLElement {
    let toastListWrapper = this.document.createElement('div');
    toastListWrapper.setAttribute('class', 'toast-list-wrapper')
    return toastListWrapper;
  }

  showSuccess(title?: string, body?: string) {
    this.show({
      type: ToastType.SUCCESS,
      title,
      body
    })
  }

  showError(title?: string, body?: string) {
    this.show({
      type: ToastType.DANGER,
      title,
      body
    })
  }

  buildTitleElem(title: string): HTMLElement {
    const titleElem = this.document.createElement('h5');
    titleElem.textContent = title as string
    return titleElem;
  }

  buildBodyElem(body: string): HTMLElement {
    const bodyElem = this.document.createElement('p');
    bodyElem.textContent = body as string
    return bodyElem;
  }

  buildCloseElem(): HTMLElement {
    const spanClose = this.document.createElement('span');
    spanClose.innerHTML = '&times;'
    spanClose.classList.add('toast-span-close')
    return spanClose;
  }

  buildToastWrapperElem(type: ToastType): HTMLElement {
    const toastWrapper = this.document.createElement('div');
    toastWrapper.classList.add('toast-wrapper', `toast-wrapper-${type}`, 'toast-wrapper-loading')
    return toastWrapper;
  }

  show(config: IToastConfig): void {
    let normalizedConfig = getNormalizedToastConfig(config);
    let { body, title, type } = normalizedConfig;
    if (!title && !body) return;

    if (false/* if custom configuration through Module.forRoot() exists */) {
      // TODO: implement custom configurations through Module.forRoot()!
      // Documentation:

      // Look at constructor() to see how to invoke user configuration in component/service
      // https://github.com/costlydeveloper/ngx-awesome-popup/blob/fd2bf38582f10431988700f20c4188d90d84275b/ngx-awesome-popup/core/global-config.service.ts
      // -- injection should happen in this class' constructor and invokation right here as follows:
      // configuration.emitToast(normalizedConfig)

      // Look at class declaration which will be used for creating injected configuration
      // https://github.com/costlydeveloper/ngx-awesome-popup/blob/fd2bf38582f10431988700f20c4188d90d84275b/ngx-awesome-popup/core/global-classes.ts#L36

      // Look at Module.ts definition
      // https://github.com/costlydeveloper/ngx-awesome-popup/blob/fd2bf38582f10431988700f20c4188d90d84275b/ngx-awesome-popup/ngx-awesome-popup.module.ts#L37

      // Look at NgxAwesomePopupModule.forRoot call with colors as user configuration parameters
      // https://costlydeveloper.github.io/ngx-awesome-popup/#/playground/toast-generator
      return;
    }

    const toastWrapper = this.buildToastWrapperElem(type!)
    if (title) toastWrapper.appendChild(this.buildTitleElem(title));
    if (body) toastWrapper.appendChild(this.buildBodyElem(body));
    let spanClose = this.buildCloseElem()
    toastWrapper.appendChild(spanClose);

    const startCountingUntilLeave = () => {
      return setTimeout(() => {
        toastWrapper.classList.add('fade-out')
        setTimeout(() => {
          this.destroy(toastWrapper);
        }, TOAST_END_OPACITY_DURATION_IN_MS)
      }, TOAST_DURATION_IN_MS)
    }

    this.renderer.appendChild(this.toastListWrapper, toastWrapper);
    var timeoutFn = startCountingUntilLeave();

    toastWrapper.onmouseover = () => {
      clearTimeout(timeoutFn)
    }

    toastWrapper.onmouseout = () => {
      timeoutFn = startCountingUntilLeave();
    }
    
    spanClose.onclick = () => {
      clearTimeout(timeoutFn);
      this.destroy(toastWrapper); 
    }
  }

  destroy(child: HTMLElement) {
    this.renderer.removeChild(this.toastListWrapper, child)
  }
}
