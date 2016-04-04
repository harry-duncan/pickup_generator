var WordPOS = require('wordpos');
var word = new WordPOS();
var _ = require('lodash');
var pickupLines = require('../../pickupLines-spec.json');

var random = _.sample(pickupLines);
word.getPOS(random.pickUpLine, function(result){
    console.log(random.pickUpLine);
    console.log(result);
});
