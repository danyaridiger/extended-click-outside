type BlockKey = "alt" | "ctrl" | "shift";
type Callback = (...args: unknown[]) => unknown;

/**
 * Configuration types
 */
interface ExtendedClickOutsideConfig {
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
  private _outsideListeners: Map<HTMLElement, Callback>;

  public init(
    element: HTMLElement,
    listener: Callback,
    config: ExtendedClickOutsideConfig,
  ): void;
  public remove(element: HTMLElement, useWarnings?: boolean): void;
  public removeAllListeners(): void;
  public isListenerExisting(element: HTMLElement): boolean;
  public getCurrentSnapshots(): string[];
  public getListenersCount(): number;
}

export { ExtendedClickOutside as default };
export type { ExtendedClickOutsideConfig };
