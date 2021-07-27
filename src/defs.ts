import Ajv, { FuncKeywordDefinition } from 'ajv';

import * as ajv from 'ajv';

export interface Options extends ajv.Options {
  fastValidation?: boolean;
}

export function createAjv(options: Options = {}): Ajv {
  const ajv = new Ajv({ ...options });
  ajv.addKeyword(uniqueId);
  return ajv;
}

export const uniqueId: FuncKeywordDefinition = {
  keyword: 'uniqueId',
  type: 'array',
  schemaType: 'boolean',
  compile(schema, parentSchema, it) {
    return (data) => {
      const elements: any = [];
      Object.assign(elements, data);
      const ids = elements.map((e) => e.id.value);
      const unique = ids.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      return ids.length === unique.length;
    };
  },
};
