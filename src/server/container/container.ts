/**
 * Minimal, type-safe dependency injection container.
 *
 * Tokens carry their resolved type as a phantom generic so `resolve` returns the
 * correct type with no casts at the call site. Instances are lazily constructed
 * and cached as singletons.
 */

export interface Token<T> {
  readonly symbol: symbol;
  /** Phantom type — never assigned at runtime. */
  readonly __type?: T;
}

export function createToken<T>(description: string): Token<T> {
  return { symbol: Symbol(description) };
}

type Factory<T> = (container: Container) => T;

export class Container {
  private readonly factories = new Map<symbol, Factory<unknown>>();
  private readonly singletons = new Map<symbol, unknown>();

  register<T>(token: Token<T>, factory: Factory<T>): this {
    this.factories.set(token.symbol, factory as Factory<unknown>);
    return this;
  }

  resolve<T>(token: Token<T>): T {
    if (this.singletons.has(token.symbol)) {
      return this.singletons.get(token.symbol) as T;
    }

    const factory = this.factories.get(token.symbol);
    if (!factory) {
      throw new Error(
        `No provider registered for token: ${token.symbol.description ?? "unknown"}`,
      );
    }

    const instance = factory(this);
    this.singletons.set(token.symbol, instance);
    return instance as T;
  }

  has<T>(token: Token<T>): boolean {
    return this.factories.has(token.symbol);
  }
}
