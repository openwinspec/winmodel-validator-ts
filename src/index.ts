import { Order } from './classes/classes';

export const validate = (model: any) =>
  Promise.all<boolean>([validateInner(model)]);

const validateInner = (model: any): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      let order: Order = JSON.parse(model);
      resolve(true);
    } catch (error) {
      resolve(false);
    }
  });
};
