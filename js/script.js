$( function() {

  // id generator
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function Column(name) {
  var self = this;

  this.id = randomString();
  this.name = name;
  this.$element = createColumn();

  function createColumn() {
    
  }
}

});