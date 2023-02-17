import {Calculator} from "./Calculator";

let calc: Calculator<{price: number, qty: number}>;

let result = 0;

beforeEach(() => {
    calc = new Calculator({price: 10, qty: 15}, {onChange: (value: number) => {result = value}});
})

it('Base calculation', () => {
    expect(result).toBe(150);
});

it('Change param', () => {
    calc.setParam('price', 11);
    expect(result).toBe(165);
});

it('Change params', () => {
    calc.params = {price: 12, qty: 12};
    expect(result).toBe(144);
});

it('Modifier "add absolute price"', () => {
    calc.addModifier({
        value: 1,
        type: 'absolute',
        operation: 'add',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(165);
});

it('Modifier "add absolute total"', () => {
    calc.addModifier({
        value: 100,
        type: 'absolute',
        operation: 'add',
        scope: 'total',
        id: 1,
    });
    expect(result).toBe(250);
});

it('Modifier "add percent price"', () => {
    calc.addModifier({
        value: 25,
        type: 'percent',
        operation: 'add',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(187.5);
});

it('Modifier "add percent total"', () => {
    calc.addModifier({
        value: 25,
        type: 'percent',
        operation: 'add',
        scope: 'total',
        id: 1,
    });
    expect(result).toBe(187.5);
});

it('Modifier "sub absolute price"', () => {
    calc.addModifier({
        value: 1,
        type: 'absolute',
        operation: 'sub',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(135);
});

it('Modifier "sub absolute total"', () => {
    calc.addModifier({
        value: 100,
        type: 'absolute',
        operation: 'sub',
        scope: 'total',
        id: 1,
    });
    expect(result).toBe(50);
});

it('Modifier "sub percent price"', () => {
    calc.addModifier({
        value: 25,
        type: 'percent',
        operation: 'sub',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(112.5);
});

it('Modifier "sub percent total"', () => {
    calc.addModifier({
        value: 25,
        type: 'percent',
        operation: 'sub',
        scope: 'total',
        id: 1,
    });
    expect(result).toBe(112.5);
});

it('Modifier "multi absolute price"', () => {
    calc.addModifier({
        value: 2,
        type: 'absolute',
        operation: 'multiple',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(300);
});

it('Modifier "multi absolute total"', () => {
    calc.addModifier({
        value: 3,
        type: 'absolute',
        operation: 'multiple',
        scope: 'total',
        id: 1,
    });
    expect(result).toBe(450);
});

it('Modifier "multi percent price"', () => {
    calc.params = {price: 12, qty: 20};
    calc.addModifier({
        value: 25,
        type: 'percent',
        operation: 'multiple',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(60);
});

it('Modifier "multi percent total"', () => {
    calc.addModifier({
        value: 50,
        type: 'percent',
        operation: 'multiple',
        scope: 'total',
        id: 1,
    });
    expect(result).toBe(75);
});

it('Multiple modifiers', () => {
    calc.addModifier({
        value: 50,
        type: 'percent',
        operation: 'multiple',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(75);

    calc.addModifier({
        value: 50,
        type: 'percent',
        operation: 'add',
        scope: 'price',
        id: 2,
    });
    expect(result).toBe(112.5);

    calc.addModifier({
        value: 50,
        type: 'percent',
        operation: 'sub',
        scope: 'price',
        id: 3,
    });
    expect(result).toBe(56.25);

    calc.addModifier({
        value: 2.25,
        type: 'absolute',
        operation: 'add',
        scope: 'price',
        id: 4,
    });
    expect(result).toBe(90);

    calc.addModifier({
        value: 1.5,
        type: 'absolute',
        operation: 'sub',
        scope: 'price',
        id: 5,
    });
    expect(result).toBe(67.5);

    calc.addModifier({
        value: 2,
        type: 'absolute',
        operation: 'multiple',
        scope: 'price',
        id: 6,
    });
    expect(result).toBe(135);

    calc.addModifier({
        value: 2,
        type: 'absolute',
        operation: 'multiple',
        scope: 'total',
        id: 7,
    });
    expect(result).toBe(270);

    calc.addModifier({
        value: 50,
        type: 'absolute',
        operation: 'sub',
        scope: 'total',
        id: 7,
    });
    expect(result).toBe(220);

    calc.addModifier({
        value: 10,
        type: 'absolute',
        operation: 'add',
        scope: 'total',
        id: 8,
    });
    expect(result).toBe(230);

    calc.addModifier({
        value: 10,
        type: 'absolute',
        operation: 'add',
        scope: 'total',
        id: 9,
    });
    expect(result).toBe(240);
});

it('Multiple modifiers', () => {
    calc.addModifier({
        value: 5,
        type: 'absolute',
        operation: 'add',
        scope: 'price',
        id: 1,
    });

    calc.addModifier({
        value: 3,
        type: 'absolute',
        operation: 'sub',
        scope: 'price',
        id: 2,
    });

    expect(result).toBe(180);

    calc.removeModifier(1);
    expect(result).toBe(105);

    calc.removeModifier(2);
    expect(result).toBe(150);
});

it('Multiplier add test', () => {
    calc.addModifier({
        value: 5,
        type: 'absolute',
        operation: 'add',
        scope: 'price',
        id: 1,
        multiplier: 3
    });
    expect(result).toBe(375);
});

it('Multiplier sub test', () => {
    calc.addModifier({
        value: 2,
        type: 'absolute',
        operation: 'sub',
        scope: 'price',
        id: 1,
        multiplier: 3
    });
    expect(result).toBe(60);
});

it('Multiplier multi test', () => {
    calc.addModifier({
        value: 2,
        type: 'absolute',
        operation: 'multiple',
        scope: 'price',
        id: 1,
        multiplier: 3
    });
    expect(result).toBe(900);
});

it('Zero param', () => {
    calc.setParam('price', 0)
    expect(result).toBe(0);
});

it('Unsigned param', () => {
    calc.setParam('price', -5)
    expect(result).toBe(-75);
});

it('Zero add modifier', () => {
    calc.addModifier({
        value: 0,
        type: 'absolute',
        operation: 'add',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(150);
});

it('Zero sub modifier', () => {
    calc.addModifier({
        value: 0,
        type: 'absolute',
        operation: 'sub',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(150);
});

it('Zero multi modifier', () => {
    calc.addModifier({
        value: 0,
        type: 'absolute',
        operation: 'multiple',
        scope: 'price',
        id: 1,
    });
    expect(result).toBe(150);
});

it('Zero multiplier', () => {
    calc.addModifier({
        value: 2,
        type: 'absolute',
        operation: 'multiple',
        scope: 'price',
        id: 1,
        multiplier: 0
    });
    expect(result).toBe(150);
});

it('Change modifier', () => {
    calc.addModifier({
        value: 2,
        type: 'absolute',
        operation: 'multiple',
        scope: 'price',
        id: 1,
        multiplier: 3
    });
    expect(result).toBe(900);

    calc.changeModifier({
        value: 2,
        type: 'absolute',
        operation: 'multiple',
        scope: 'price',
        id: 1,
        multiplier: 2
    });
    expect(result).toBe(600);
});