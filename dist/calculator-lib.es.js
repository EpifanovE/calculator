var o = Object.defineProperty;
var p = (i, t, e) => t in i ? o(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var r = (i, t, e) => (p(i, typeof t != "symbol" ? t + "" : t, e), e);
class m {
  constructor(t, e) {
    r(this, "_modifiers", []);
    r(this, "_params");
    r(this, "_config");
    r(this, "addModifier", (t) => {
      this.modifiers = [...this.modifiers, new s(t)];
    });
    r(this, "removeModifier", (t) => {
      this.modifiers = this.modifiers.filter((e) => e.id !== t);
    });
    r(this, "changeModifier", (t) => {
      this.modifiers = [
        ...this.modifiers.filter((e) => e.id !== t.id),
        new s(t)
      ];
    });
    r(this, "setParam", (t, e) => {
      this.params = { ...this.params, [t]: e };
    });
    r(this, "calculate", () => {
      var e, a;
      const t = (e = this._config) != null && e.calculate ? this._config.calculate(this.params) : this.calculatorCallback(this.params);
      return (a = this._config) != null && a.onChange && this._config.onChange(t), t;
    });
    r(this, "calculatorCallback", (t) => !t || !t.price || !t.qty ? 0 : this.applyModifiers(
      this.applyModifiers(t.price, this.modifiers.filter((e) => e.scope === "price" && !!e.config.value).sort((e, a) => e.priority - a.priority)) * t.qty,
      this.modifiers.filter((e) => e.scope === "total" && !!e.config.value).sort((e, a) => e.priority - a.priority)
    ));
    r(this, "applyModifiers", (t, e) => e.reduce((a, l) => l.handle(a), t));
    this._params = t, this._config = { ...e }, this.calculate();
  }
  get modifiers() {
    return this._modifiers;
  }
  set modifiers(t) {
    this._modifiers = t, this.calculate();
  }
  get params() {
    return this._params;
  }
  set params(t) {
    this._params = t, this.calculate();
  }
}
class s {
  constructor(t) {
    r(this, "id");
    r(this, "value");
    r(this, "scope");
    r(this, "priority", 10);
    r(this, "config");
    r(this, "operationStrategy");
    r(this, "operationTypeStrategy");
    switch (this.id = t.id, this.value = t.value, this.scope = t.scope, this.priority = t.priority || 10, this.config = t, t.operation) {
      case "sub":
        this.operationStrategy = u;
        break;
      case "multiple":
        this.operationStrategy = n;
        break;
      default:
        this.operationStrategy = h;
        break;
    }
    switch (t.type) {
      case "percent":
        this.operationTypeStrategy = d;
        break;
      default:
        this.operationTypeStrategy = y;
        break;
    }
  }
  handle(t) {
    return !this.operationStrategy || !this.operationTypeStrategy ? t : this.operationStrategy.handle(t, { ...this.config, value: this.operationTypeStrategy.handle(t, this.config) });
  }
}
const h = {
  handle: (i, t) => i + t.value * ((t == null ? void 0 : t.multiplier) || 1)
}, u = {
  handle: (i, t) => i - t.value * ((t == null ? void 0 : t.multiplier) || 1)
}, n = {
  handle: (i, t) => (t == null ? void 0 : t.multiplier) === 0 ? i : i * t.value * ((t == null ? void 0 : t.multiplier) || 1)
}, d = {
  handle: (i, t) => t.operation && t.operation === "multiple" ? t.value / 100 : i * t.value / 100
}, y = {
  handle: (i, t) => t.value
};
export {
  m as Calculator
};
