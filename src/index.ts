import { Order } from './classes/classes';

import { createAjv } from './defs';
import { schema } from './schema/schema';

export const validate = (model: any) =>
  Promise.all<boolean>([validateInner(model)]);

const validateInner = (model: any): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const valid = _validator(model);
      if (valid) resolve(true);
      else reject(_validator.errors);
    } catch (error) {
      resolve(error);
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
