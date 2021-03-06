var debug = require('debug')('liftie:coerce');
var entities = require('./entities');

module.exports = coerceStatus;

var map = {
  'o': 'open',
  'y': 'open',
  'yes': 'open',
  'ok': 'open',
  'open': 'open',
  'opened': 'open',
  'green': 'open',
  'n': 'closed',
  'x': 'closed',
  'no': 'closed',
  'closed': 'closed',
  'closedfortheday': 'closed',
  'geschlossen': 'closed',
  'blank': 'closed',
  'red': 'closed',
  'h': 'hold',
  'hold': 'hold',
  'windhold': 'hold',
  'maintenancehold': 'hold',
  'safety': 'hold',
  'onhold': 'hold',
  'standby': 'hold',
  'scheduled': 'scheduled',
  'onschedule': 'scheduled',
  'expected': 'scheduled',
  'delay': 'scheduled',
  'delayed': 'scheduled',
  'blue': 'scheduled'
};


/**
 * More flexible slice. If from, or to are strings we determine their position in the string
 * and slice appropriately. In all other cases it works like normal slice
 */
function slice(str, from, to) {
  if (typeof from === 'string') {
    from = str.lastIndexOf(from) + from.length;
  }
  if (typeof to === 'string') {
    to = str.indexOf(to);
  }
  return str.slice(from, to);
}

/*
 * slice, trim, lowercase and coerce to standard liftie statuses
 * If no usuable status is found, return 'scheduled'
 */
function coerceStatus (status, start, stop) {
  var s;
  if (arguments.length > 1) {
    status = slice(status, start, stop);
  }
  status = entities(status);
  status = status.replace(/[\s_\-]+/g, '').toLowerCase();
	s = map[status];
  if (!s) {
    debug('Uknown status %s. Treated as <scheduled>', status);
    s = 'scheduled';
  }
  return s;
}