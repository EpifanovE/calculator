type Operation = 'add' | 'sub' | 'multiple';

type OperationType = 'percent' | 'absolute';

type ModifierConfig = {
    id: number | string
    operation: Operation
    value: number
    type: OperationType
    scope?: string
    priority?: number
    multiplier?: number
}

type Params = { [key: string]: any }

type CalculatorConfig<T> = {
    onChange?: (value: number) => void
    calculate?: (params?: T) => number
}

export class Calculator<T extends Params> {

    get modifiers(): Modifier[] {
        return this._modifiers;
    }

    set modifiers(value: Modifier[]) {
        this._modifiers = value;
        this.calculate();
    }

    get params(): T | undefined {
        return this._params;
    }

    set params(value: T | undefined) {
        this._params = value;
        this.calculate();
    }

    private _modifiers: Modifier[] = [];

    private _params?: T

    private _config?: CalculatorConfig<T>;

    constructor(params: T, config?: CalculatorConfig<T>) {
        this._params = params;
        this._config = {...{}, ...config};
        this.calculate();
    }

    public addModifier = (modifierConfig: ModifierConfig) => {
        this.modifiers = [...this.modifiers, new Modifier(modifierConfig)];
    }

    public removeModifier = (id: number | string) => {
        this.modifiers = this.modifiers.filter(modifier => modifier.id !== id);
    }

    public changeModifier = (modifierConfig: ModifierConfig) => {
        this.modifiers = [
            ...this.modifiers.filter(modifier => modifier.id !== modifierConfig.id),
            new Modifier(modifierConfig)
        ];
    }

    public setParam = (name: keyof T, value: any) => {
        this.params = {...this.params, [name]: value} as T;
    }

    public calculate = (): number => {
        const result = !!this._config?.calculate ? this._config.calculate(this.params) : this.calculatorCallback(this.params);
        if (this._config?.onChange) {
            this._config.onChange(result);
        }
        return result;
    }

    private calculatorCallback = (params?: T): number => {
        if (!params) return 0;

        if (!params.price || !params.qty) return 0;

        return this.applyModifiers(
            this.applyModifiers(params.price, this.modifiers.filter(modifier => modifier.scope === 'price' && !!modifier.config.value).sort((a, b) => a.priority - b.priority)) * params.qty,
            this.modifiers.filter(modifier => modifier.scope === 'total' && !!modifier.config.value).sort((a, b) => a.priority - b.priority)
        );
    }

    private applyModifiers = (value: number, modifiers: Modifier[]): number => {
        return modifiers.reduce((acc: number, modifier: Modifier) => {
            return modifier.handle(acc);
        }, value);
    }
}

export class Modifier {

    public id?: number | string

    value?: number

    scope?: string

    priority: number = 10;

    config: ModifierConfig

    private readonly operationStrategy: OperationStrategy;

    private readonly operationTypeStrategy: OperationStrategy

    constructor(config: ModifierConfig) {

        this.id = config.id;

        this.value = config.value;

        this.scope = config.scope;

        this.priority = config.priority || 10;

        this.config = config;

        switch (config.operation) {
            case 'sub':
                this.operationStrategy = OperationSubStrategy;
                break;
            case 'multiple':
                this.operationStrategy = OperationMultipleStrategy;
                break;
            default:
                this.operationStrategy = OperationAddStrategy;
                break;
        }

        switch (config.type) {
            case 'percent':
                this.operationTypeStrategy = OperationPercentStrategy;
                break;
            default :
                this.operationTypeStrategy = OperationAbsoluteStrategy;
                break
        }
    }

    public handle(value: number): number {

        if (!this.operationStrategy || !this.operationTypeStrategy) return value;

        return this.operationStrategy.handle(value, {...this.config, value: this.operationTypeStrategy.handle(value, this.config)})
    }
}

type OperationStrategy = {
    handle: (value: number, config: ModifierConfig) => number
}

const OperationAddStrategy: OperationStrategy = {
    handle: (value: number, config: ModifierConfig) => {
        return value + config.value * (config?.multiplier || 1);
    }
}

const OperationSubStrategy: OperationStrategy = {
    handle: (value: number, config: ModifierConfig) => {
        return value - config.value * (config?.multiplier || 1);
    }
}

const OperationMultipleStrategy: OperationStrategy = {
    handle: (value: number, config: ModifierConfig) => {
        if (config?.multiplier === 0) {
            return value;
        }
        return value * config.value * (config?.multiplier || 1);
    }
}

const OperationPercentStrategy: OperationStrategy = {
    handle: (value: number, config: ModifierConfig) => {

        if (config.operation && config.operation === 'multiple') {
            return config.value / 100;
        }

        return value * config.value / 100;
    }
}

const OperationAbsoluteStrategy: OperationStrategy = {
    handle: (_value: number, config: ModifierConfig) => {
        return config.value;
    }
}
