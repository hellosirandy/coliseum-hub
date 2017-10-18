var firebase = require('firebase')

var config = {
  apiKey: "AIzaSyDJbA4eaykWY9PRINAoHocmnAhvLgsXD5Y",
  authDomain: "coliseum-hub.firebaseapp.com",
  databaseURL: "https://coliseum-hub.firebaseio.com",
  projectId: "coliseum-hub",
  storageBucket: "coliseum-hub.appspot.com",
  messagingSenderId: "783733786010"
}

firebase.initializeApp(config)

var databaseRef = firebase.database().ref()
var stadiumRef = databaseRef.child('/stadiums')

stadiumRef.on('child_added', function(snapshot) {
  // snapshot.ref.update()
  var value = snapshot.val()
  var capacity = Number(value.capacity)
  var ref = snapshot.ref
  ref.update({ capacity }).then(() => {
    console.log(value.name, 'updated')
  }).catch(err => {
    console.log(value.name, err)
  })
})