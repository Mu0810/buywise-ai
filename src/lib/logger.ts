/**
 * Lightweight structured logger. Emits JSON in production (for log aggregators)
 * and readable output in development. Isomorphic: reads `process.env.NODE_ENV`
 * directly so it works on both server and client bundles.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const isProduction = process.env.NODE_ENV === "production";
const threshold = isProduction ? LEVEL_WEIGHT.info : LEVEL_WEIGHT.debug;

type LogContext = Record<string, unknown>;

function emit(level: LogLevel, message: string, context?: LogContext): void {
  if (LEVEL_WEIGHT[level] < threshold) return;

  const entry = {
    level,
    time: new Date().toISOString(),
    message,
    ...context,
  };

  const method =
    level === "error" ? "error" : level === "warn" ? "warn" : "log";

  if (isProduction) {
    console[method](JSON.stringify(entry));
  } else {
    console[method](
      `[${level.toUpperCase()}] ${message}`,
      context && Object.keys(context).length > 0 ? context : "",
    );
  }
}

export class Logger {
  constructor(private readonly baseContext: LogContext = {}) {}

  private merge(context?: LogContext): LogContext {
    return { ...this.baseContext, ...context };
  }

  debug(message: string, context?: LogContext): void {
    emit("debug", message, this.merge(context));
  }

  info(message: string, context?: LogContext): void {
    emit("info", message, this.merge(context));
  }

  warn(message: string, context?: LogContext): void {
    emit("warn", message, this.merge(context));
  }

  error(message: string, context?: LogContext): void {
    emit("error", message, this.merge(context));
  }

  /** Create a child logger that always includes the given context. */
  child(context: LogContext): Logger {
    return new Logger(this.merge(context));
  }
}

export const logger = new Logger();
