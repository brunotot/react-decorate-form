function convert(nodeList: NodeListOf<Element>): HtmlElements {
  let htmlElements: HtmlElement[] = [];
  nodeList.forEach(element => {
    htmlElements.push(new HtmlElement(element));
  })
  return new HtmlElements(htmlElements);
}

function join(htmlElementsArray: HtmlElements[]): HtmlElements {
  let htmlElementsJoinedArray: HtmlElement[] = [];
  htmlElementsArray.forEach(htmlElements => {
    htmlElements.elements.forEach(htmlElement => {
      htmlElementsJoinedArray.push(htmlElement);
    })
  })
  return new HtmlElements(htmlElementsJoinedArray);
}

export default function $(selector: string | Element | Element[]): HtmlElements {
  let htmlElements: HtmlElement[] = [];
  if (Array.isArray(selector)) {
    selector.forEach(elem => htmlElements.push(new HtmlElement(elem)));
  } else if (typeof selector !== "string") {
    htmlElements.push(new HtmlElement(selector as Element));
  } else {
    return convert(document.querySelectorAll(selector))
  }
  return new HtmlElements(htmlElements);
}

class HtmlElements {
  elements: HtmlElement[];

  constructor(elements: HtmlElement[]) {
    this.elements = elements;
  }

  _(action: (elem: HtmlElement) => any): HtmlElements {
    this.elements.forEach(action);
    return this;
  }

  addClass(htmlClass: string) {
    return this._(e => e.addClass(htmlClass));
  }

  removeClass(htmlClass: string) {
    return this._(e => e.removeClass(htmlClass))
  }

  css(cssProperty: string, cssValue: string) {
    return this._(e => e.css(cssProperty, cssValue))
  }

  find(selector: string): HtmlElements {
    return join(this.elements.map(e => e.find(selector)));
  }

  remove() {
    return this._(e => e.remove());
  }

  append(htmlElementNative: HTMLElement) {
    return this._(e => e.append(htmlElementNative))
  }
}

class HtmlElement {
  element: Element;

  constructor(element: Element) {
    this.element = element;
  }

  addClass(htmlClass: string) {
    this.element.classList.add(htmlClass);
  }

  removeClass(htmlClass: string) {
    this.element.classList.remove(htmlClass);
  }

  css(cssProperty: string, cssValue: string) {
    let style = (this.element as any).style;
    style[cssProperty] = cssValue;
    this.element.setAttribute('style', style);
  }

  find(selector: string): HtmlElements {
    return convert(this.element.querySelectorAll(selector));
  }

  remove() {
    this.element.remove();
  }

  append(htmlElementNative: HTMLElement) {
    this.element.appendChild(htmlElementNative);
  }
}