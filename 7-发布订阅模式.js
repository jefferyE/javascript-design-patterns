/*
  订阅者把自己想订阅的事件注册到调度中心，当该事件触发时候，发布者发布该事件到调度中心（顺带上下文），由调度中心统一调度订阅者注册到调度中心的处理代码
*/
var pubsub = {};
(function(myObject) {
    // Storage for topics that can be broadcast
    // or listened to
    var topics = {};
    // An topic identifier
    var subUid = -1;
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    myObject.publish = function( topic, args ) {
        if ( !topics[topic] ) {
            return false;
        }
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].func( topic, args );
        }
        return this;
    };
    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    myObject.subscribe = function( topic, func ) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function( token ) {
        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if ( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}( pubsub ));


// const event = {
//   clientList: [],
//   listen (key, fn) {
//     if (!this.clientList[key]) {
//       this.clientList[key] = []
//     }
//     this.clientList[key].push(fn)
//   },
//   trigger (...args) {
//     const key = args.shift();
//     const fns = this.clientList[key]

//     if (!key || fns.length === 0) {
//       return false;
//     }

//     for (let i = 0, len = fns.length; i < len; i++) {
//       fns[i].apply(this, args)
//     }
//   },
//   remove (key, fn) {
//     const fns = this.clientList[key];

//     if (!fns) return false;

//     if (!fn) {
//       fns && (fns.length = 0);
//     } else {
//       for (let i = fns.length - 1; i >= 0; i--) {
//         const _fn = fns[i]
//         if (_fn === fn) {
//           fns.splice(i, 1);
//         }
//       }
//     }
//   }
// }

// // 注册方法
// const salesOffices = {}
// const installEvent = (obj) => {
//   Object.keys(event).forEach(key => {
//     obj[key] = event[key];
//   })
// }

// installEvent(salesOffices);

// // 添加订阅者
// salesOffices.listen('squareMeter88', fn1 = (price) => {
//   console.log('pirce: ', price);
// })

// salesOffices.listen('squareMeter88', fn2 = (price) => {
//   console.log('pirce: ', price);
// })

// // salesOffices.remove('squareMeter88'); // 移除当前对应的所有订阅者

// salesOffices.remove('squareMeter88', fn1);

// salesOffices.trigger('squareMeter88', 20000);