function MyObject(io) {
    this.io = io;
  }

  MyObject.prototype.foo = function foo(b) {
    console.log(this.io);
    console.log(b);
    let io = this.io;

    io.emit('from server', 'hello', 'coucou !')
  };


  module.exports = MyObject;