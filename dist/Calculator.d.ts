type Operation = 'add' | 'sub' | 'multiple';
type OperationType = 'percent' | 'absolute';
type ModifierConfig = {
    id: number | string;
    operation: Operation;
    value: number;
    type: OperationType;
    scope?: string;
    priority?: number;
    multiplier?: number;
};
type Params = {
    [key: string]: any;
};
type CalculatorConfig<T> = {
    onChange?: (value: number) => void;
    calculate?: (params?: T) => number;
};
export declare class Calculator<T extends Params> {
    get modifiers(): Modifier[];
    set modifiers(value: Modifier[]);
    get params(): T | undefined;
    set params(value: T | undefined);
    private _modifiers;
    private _params?;
    private _config?;
    constructor(params: T, config?: CalculatorConfig<T>);
    addModifier: (modifierConfig: ModifierConfig) => void;
    removeModifier: (id: number | string) => void;
    changeModifier: (modifierConfig: ModifierConfig) => void;
    setParam: (name: keyof T, value: any) => void;
    calculate: () => number;
    private calculatorCallback;
    private applyModifiers;
}
export declare class Modifier {
    id?: number | string;
    value?: number;
    scope?: string;
    priority: number;
    config: ModifierConfig;
    private readonly operationStrategy;
    private readonly operationTypeStrategy;
    constructor(config: ModifierConfig);
    handle(value: number): number;
}
export {};
