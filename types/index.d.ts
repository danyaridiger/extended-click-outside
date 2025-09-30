type BlockKey = "alt" | "ctrl" | "shift";

/**
 * Configuration types
 */
export interface ExtendedClickOutsideConfig {
  blockKeys?: BlockKey[];
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
  selfOnly?: boolean;
  useWarnings?: boolean;
}

/**
 * Root type
 */
declare class ExtendedClickOutside {
  private _clickName: string;
  private _outsideListeners: Map<HTMLElement, Function>;

  public init(
    element: HTMLElement,
    listener: Function,
    config: ExtendedClickOutsideConfig,
  ): void;
  public remove(element: HTMLElement, useWarnings?: boolean): void;
  public removeAllListeners(): void;
  public isListenerExisting(element: HTMLElement): boolean;
  public getCurrentSnapshots(): string[];
  public getListenersCount(): number;
}

export default ExtendedClickOutside;
