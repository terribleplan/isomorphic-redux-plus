import { isArray, isObject, entries, isFunction } from 'lodash';
import moment from 'moment';
import { Map, List, OrderedMap } from 'immutable';

global.createRandomString = (prefix) => `${prefix}-${Math.ceil(Math.random() * 10000)}`;
global.createRandomDate = () => moment(
  new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
).toISOString();

function randomizer(input, key) {
  if (isFunction(input)) {
    return input(key);
  } if (Map.isMap(input) || OrderedMap.isOrderedMap(input)) {
    return input.keySeq().reduce((map, k) =>
      map.update(k, (v) => randomizer(v, k)), input);
  } else if (List.isList(input) || isArray(input)) {
    return input.map((v) => randomizer(v, key));
  } else if (isObject(input)) {
    return entries(input).reduce((obj, [k, v]) => ({
      ...obj,
      [k]: randomizer(v, k),
    }), {});
  }

  return input;
}

global.createRandom = (creator) => randomizer(creator({
  string: createRandomString,
  number: () => Math.random(),
  date: createRandomDate,
  bool: () => Math.random() >= 0.5,
}));
