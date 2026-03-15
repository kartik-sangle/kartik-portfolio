declare module "gsap-trial/ScrollSmoother" {
  export class ScrollSmoother {
    static create(vars: any): ScrollSmoother;
    static refresh(soft?: boolean): void;
    paused(value?: boolean): any;
    scrollTop(value?: number): any;
    scrollTo(target: any, useAutoKill?: boolean, position?: string): void;
  }
}

declare module "gsap-trial/SplitText" {
  export class SplitText {
    constructor(target: any, vars?: any);
    words: HTMLElement[];
    chars: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
  }
}
