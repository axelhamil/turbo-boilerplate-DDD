export type Hook = {
  methodName: string;
  hookFunction: any;
};

type HookHandlers = {
  before: { [key: string]: Hook[] };
  after: { [key: string]: Hook[] };
};

const beforeHooks: HookHandlers['before'] = {};
const afterHooks: HookHandlers['after'] = {};

export function addBeforeHook(methodName: string, hookFunction: any): void {
  if (!beforeHooks[methodName]) {
    beforeHooks[methodName] = [];
  }
  beforeHooks[methodName].push({ methodName, hookFunction });
}

export function addAfterHook(methodName: string, hookFunction: any): void {
  if (!afterHooks[methodName]) {
    afterHooks[methodName] = [];
  }
  afterHooks[methodName].push({ methodName, hookFunction });
}

export async function runBeforeHooks(methodName: string, ...args: any[]): Promise<void> {
  if (beforeHooks[methodName]) {
    for (const hook of beforeHooks[methodName]) {
      await hook.hookFunction(...args);
    }
  }
}

export async function runAfterHooks(methodName: string, result: any, ...args: any[]): Promise<any> {
  if (afterHooks[methodName]) {
    for (const hook of afterHooks[methodName]) {
      await hook.hookFunction(result, ...args);
    }
  }
}
