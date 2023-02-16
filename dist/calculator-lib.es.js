var o = Object.defineProperty;
var n = (r, t, e) => t in r ? o(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var i = (r, t, e) => (n(r, typeof t != "symbol" ? t + "" : t, e), e);
class f {
  constructor(t, e) {
    i(this, "_modifiers", []);
    i(this, "_params");
    i(this, "_config");
    i(this, "addModifier", (t) => {
      this.modifiers = [...this.modifiers, new p(t)];
    });
    i(this, "removeModifier", (t) => {
      this.modifiers = this.modifiers.filter((e) => e.id !== t);
    });
    i(this, "setParam", (t, e) => {
      this.params = { ...this.params, [t]: e };
    });
    i(this, "calculate", () => {
      var e, a;
      const t = (e = this._config) != null && e.calculate ? this._config.calculate(this.params) : this.calculatorCallback(this.params);
      return (a = this._config) == null || a.onChange(t), t;
    });
    i(this, "calculatorCallback", (t) => !t || !t.price || !t.qty ? 0 : this.applyModifiers(
      this.applyModifiers(t.price, this.modifiers.filter((e) => e.scope === "price").sort((e, a) => e.priority - a.priority)) * t.qty,
      this.modifiers.filter((e) => e.scope === "total").sort((e, a) => e.priority - a.priority)
    ));
    i(this, "applyModifiers", (t, e) => e.reduce((a, s) => s.handle(a), t));
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
class p {
  constructor(t) {
    i(this, "id");
    i(this, "value");
    i(this, "scope");
    i(this, "priority", 10);
    i(this, "operationStrategy");
    i(this, "operationTypeStrategy");
    switch (this.id = t.id, this.value = t.value, this.scope = t.scope, this.priority = t.priority || 10, t.operation) {
      case "sub":
        this.operationStrategy = l;
        break;
      case "multiple":
        this.operationStrategy = c;
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
        this.operationTypeStrategy = u;
        break;
    }
  }
  handle(t) {
    return !this.operationStrategy || !this.operationTypeStrategy ? t : this.operationStrategy.handle(t, this.operationTypeStrategy.handle(t, this.value || 0));
  }
}
const h = {
  handle: (r, t) => r + t
}, l = {
  handle: (r, t) => r - t
}, c = {
  handle: (r, t) => r * t
}, d = {
  handle: (r, t) => r + r * t / 100
}, u = {
  handle: (r, t) => t
};
export {
  f as Calculator
};
