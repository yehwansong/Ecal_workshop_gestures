$(document).ready(function(){
    onLoadFinish()
})
function onLoadFinish() {
    console.log('onLoadFinish');
const firebaseConfig = {
  apiKey: "AIzaSyA_giWQjKIOPfXaJGkVll1hdjIFWrccIEg",
  authDomain: "ecalworkshop.firebaseapp.com",
  projectId: "ecalworkshop",
  storageBucket: "ecalworkshop.appspot.com",
  messagingSenderId: "565400744842",
  databaseURL: "https://ecalworkshop-default-rtdb.firebaseio.com/",
  appId: "1:565400744842:web:c7aadbb57c96885fa34e73",
  measurementId: "G-KVVLL9MKTC"
};
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    window.setFirebaseValues = function (values) {
        firebase.database().ref('values').update(values);
    };

    firebase.database().ref('values').on('value', function (snapshot) {
        if (typeof window.firebaseValueChangeHandler !== 'function') {
            return;
        }
        window.firebaseValueChangeHandler(snapshot.val());
    }); // ready to go

    if (typeof window.onFirebaseReady === 'function') {
        window.onFirebaseReady();
    } // empty value change queue


    window.firebaseSetValuesQueue.forEach(function (values) {
        window.setFirebaseValues(values);
    });
    window.firebaseSetValuesQueue = [];
} // start loading firebase scripts

var w = window.innerWidth
var h = window.innerHeight
var timeout
var posy = 0
var counter = 0
        $(document).bind('touchmove', function(e) {
            posx = e.originalEvent.touches[0].pageX
            posy = e.originalEvent.touches[0].pageY
        });

        function onFirebaseReady() {
                $(document).bind('touchmove mousemove', function (e) {

                       e.preventDefault();
                        var currentY = e.originalEvent.touches ?  e.originalEvent.touches[0].pageY : e.pageY;
                        var currentX = e.originalEvent.touches ?  e.originalEvent.touches[0].pageX : e.pageX;



                        // 
                        setFirebaseValues({
                            posx : currentY,
                            posy : currentX
                        });

                     
                     
                 });

        }

        // 
            function firebaseValueChangeHandler(values) {
                     $('.follower').css({
                         top: values.posy - 50,
                         left: values.posx - 50
                     });
            }