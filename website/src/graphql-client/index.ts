const URL = "http://localhost:1337"
import axios from "axios";
import { NexusGenArgTypes, NexusGenEnums, NexusGenFieldTypeNames, NexusGenFieldTypes, NexusGenTypes } from "../../../graphql-api/nexus-typegen";

type Push<T extends readonly any[], V> = [...T, V];
type ReadonlyTuple<T> = Extract<Readonly<T>, readonly any[]>;

interface TupleBuilderAddable<U, T extends readonly any[]> {
    add<V extends U>(v: V): [U] extends [V] ?
        TupleBuilderBuildable<ReadonlyTuple<Push<T, V>>> :
        TupleBuilderAddable<Exclude<U, V>, ReadonlyTuple<Push<T, V>>>;
}
interface TupleBuilderBuildable<T extends readonly any[]> {
    build(): T;
}
function tupleBuilder<U>():
    [U] extends [never] ?
    TupleBuilderBuildable<[]> :
    TupleBuilderAddable<U, []> {
    const tuple: any[] = [];
    const ret = {
        add(v: any) {
            tuple.push(v);
            return ret;
        },
        build() {
            return tuple;
        }
    }
    return ret as any;
}


type RemoveArrayRepeats<T extends readonly any[]> = {
    [K in keyof T]: (
        T[number] extends { [P in keyof T]: P extends K ? never : T[P] }[number]
        ? never
        : T[K]
    )
}

const headers = {'Content-Type': 'application/json'}
export const instance = axios.create({
    baseURL: URL,
    headers
});

export default class APIRequest<VarsType, ReturnType> {
	constructor(private query_string:string, private method:"POST" | "GET") {};

	async execute(vars:VarsType):Promise<ReturnType> {
    const response = await instance.post("/", JSON.stringify({query: this.query_string, variables: vars}));
    const data = response.data["data"];

    // Returns the first key withotu creating an entire object.
    for (let entry in data) {
      return data[entry];
    }
	}
}



const nexusEnumBuilder = tupleBuilder<NexusGenEnums[keyof NexusGenEnums]>();
const nexusEnumNames = nexusEnumBuilder
  .add("NAME")
  .add("CODE")
  .build();
  
const isNexusEnum = (value: unknown) => nexusEnumNames.some(e => e === value);
const wrap = (target: number | string) => typeof target == "number" || isNexusEnum(target) ? target: `"${target}"`;

export async function query
<T extends keyof NexusGenFieldTypes["Query"],
  Vars extends (keyof NexusGenFieldTypes["Query"][T][number])[],
  ReturnType extends NexusGenFieldTypeNames["Query"][T]
>
(queryName: T, expectedTypeName: ReturnType, args: NexusGenArgTypes["Query"][T], vars: (Vars & RemoveArrayRepeats<Vars>) | []) {

  let stringArgs = Object.keys(args).map(key => `${key}:${wrap(args[key])}`).join(",");

  const query = `
    query {
      ${queryName}(${stringArgs}) {
        ${vars.join("\n")}
      }
    }
  `
  const response = await instance.post("/", {query});

  console.log(response.data.data);
  return response.data.data[expectedTypeName] as Pick<NexusGenFieldTypes["Query"][typeof queryName][number], (typeof vars)[number]>[];

}
