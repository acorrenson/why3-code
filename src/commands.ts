import { spawn, spawnSync } from 'child_process';

export type Prover = "alt-ergo" | "cvc4";

export enum Status {
  Valid,
  Timeout,
  Unknown
}

interface Result {
  fname: string;
  module: string;
  declaration: string;
  status: Status;
}

export type Context = Map<string, Map<string, Status>>;

let analyse_result = (s: string): Result => {
  let tokens = s.split(' ');
  let fname = tokens[0];
  let module = tokens[1];
  let declaration = tokens[2];
  switch (tokens[3]) {
    case "Unknow":
      return { fname, module, declaration, status: Status.Unknown };
    case "Timeout":
      return { fname, module, declaration, status: Status.Timeout };
    case "Valid":
      return { fname, module, declaration, status: Status.Valid };
    default:
      return { fname, module, declaration, status: Status.Unknown };
  }
};

type sucess_call = (ctx: Context) => void;
type failure_call = (err: string) => void;

export function prove(fpath: string, prover: Prover, succ: sucess_call, err: failure_call) {
  let why3 = spawn('why3', ['prove', '-P', prover]);

  let ctx = new Map<string, Map<string, Status>>();

  why3.stdout.on('data', (data) => {
    let { module, declaration, status } = analyse_result(data);
    if (ctx.has(module)) {
      ctx.get(module)?.set(declaration, status);
    } else {
      ctx.set(module, new Map([
        [declaration, status]
      ]));
    }
  });

  why3.on('exit', (code) => {
    if (code !== null) {
      succ(ctx);
    } else {
      err(`why3 call exited with anormal exit code ${code}`);
    }
  });
}