var Xray = require('x-ray');

var xray = new Xray();

xray('http://pickup-lines.net', 'span.loop-entry-line', 
    [
        {   
            pickUpLine: ''
        }
    ])
    .paginate('.next@href')
    .write('pickUpLines-spec.json');
