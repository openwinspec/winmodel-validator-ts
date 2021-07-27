import { Order } from './classes/classes';
import { DefinedError } from 'ajv';

import { createAjv } from './defs';
import { schema } from './schema/schema';

export interface validateResult {
  valid: boolean;
  errors?: DefinedError[];
}

// todo: async validation

// export const validateAll = (model: any) =>
//   Promise.all<validateResult>([validateInner(model)]);

export const validate = (model: any): Promise<validateResult> => {
  return new Promise<validateResult>((resolve, reject) => {
    try {
      const valid = _validator(model);
      if (valid) resolve({ valid: true });
      else
        reject({ valid: false, errors: _validator.errors as DefinedError[] });
    } catch (error) {
      reject(error);
    }
  });
};

const _ajv = createAjv({});

var _schema = JSON.parse(JSON.stringify(schema));

_schema.definitions.Dictionaries.properties.vendors.uniqueId = true;
_schema.definitions.Dictionaries.properties.profileSystems.uniqueId = true;
_schema.definitions.Dictionaries.properties.profiles.uniqueId = true;
_schema.definitions.Dictionaries.properties.reinforcement.uniqueId = true;
_schema.definitions.Dictionaries.properties.spacer.uniqueId = true;
_schema.definitions.Dictionaries.properties.glasses.uniqueId = true;
_schema.definitions.Dictionaries.properties.glazing.uniqueId = true;
_schema.definitions.Dictionaries.properties.panel.uniqueId = true;
_schema.definitions.Dictionaries.properties.colors.uniqueId = true;

const _validator = _ajv.compile(_schema);
