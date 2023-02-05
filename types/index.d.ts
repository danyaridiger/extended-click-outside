type BlockKeys = "alt" | "ctrl" | "shift";

/**
 * Configuration types
 */
export interface ExtendedClickOutsideConfig {
  capture?: boolean;
  once?: boolean;
  selfOnly?: boolean;
  useWarnings?: boolean;
  blockKeys?: BlockKeys[];
}

/**
 * Root type
 */
declare class ExtendedClickOutside {
  private _clickName: string;
  private _outsideListeners: Map<HTMLElement, Function>;

  public init(element: HTMLElement, listener: Function, config: ExtendedClickOutsideConfig): void;
  public remove(element: HTMLElement, useWarnings?: boolean): void;
  public removeAllListeners(): void;
  public getCurrentSnapshots(): string[];
  public getClickOutsidesCount(): number;
}

export default ExtendedClickOutside;