import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2, ViewEncapsulation } from '@angular/core';

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

function getRandomToastType() {
  let values = Object.values(ToastType)
  return values[Math.floor(Math.random() * values.length)];
}

function getNormalizedToastConfig(config: IToastConfig) {
  if (!config.type) config.type = ToastType.DEFAULT
  if (!config.title) config.title = ''
  if (!config.body) config.body = ''
  return config
}

@Injectable()
export class ToastService {
  private renderer: Renderer2;
  private toastListWrapper: HTMLElement
  
  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) { 
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.toastListWrapper = this.document.createElement('div');
    this.toastListWrapper.setAttribute('class', 'toast-list-wrapper')
    this.renderer.appendChild(this.document.body, this.toastListWrapper);
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

  show(config: IToastConfig): void {
    let normalizedConfig = getNormalizedToastConfig(config);

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

    let { body, title, type } = normalizedConfig;

    const toastWrapper = this.document.createElement('div');
    toastWrapper.classList.add('toast-wrapper', `toast-wrapper-${type}`, 'toast-wrapper-loading')

    if (title) {
      const titleElem = this.document.createElement('h5');
      titleElem.textContent = title as string
      toastWrapper.appendChild(titleElem);
    }

    if (body) {
      const bodyElem = this.document.createElement('p');
      bodyElem.textContent = body as string
      toastWrapper.appendChild(bodyElem);
    }

    const startCountingUntilLeave = () => {
      return setTimeout(() => {
        toastWrapper.classList.add('fade-out')
        setTimeout(() => {
          this.destroy(toastWrapper);
        }, TOAST_END_OPACITY_DURATION_IN_MS)
      }, TOAST_DURATION_IN_MS)
    }

    const spanClose = this.document.createElement('span');
    spanClose.innerHTML = '&times;'
    spanClose.classList.add('toast-span-close')
    toastWrapper.appendChild(spanClose);

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
