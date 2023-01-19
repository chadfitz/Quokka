const _ = require('lodash');

const ObjectUtil = {
  ArrayObjectStrip (array) {
    const keys = _.keys(array[0]);
    return _.zipObject(keys, _.map(keys, key => _.map(array, key)));
  }
}

module.exports = ObjectUtil;
// export default ObjectUtil;