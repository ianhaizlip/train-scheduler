$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDsRegYPcSYrdJD4zK7weBMIWFFYAxx0A0",
        authDomain: "codingbootcamp-1.firebaseapp.com",
        databaseURL: "https://codingbootcamp-1.firebaseio.com",
        projectId: "codingbootcamp-1",
        storageBucket: "codingbootcamp-1.appspot.com",
        messagingSenderId: "776829283187"
    };

    firebase.initializeApp(config);

    const database = firebase.database();
    const ref = database.ref();

    // Initial Values
    var train = "";
    var dest = "";
    var first = 0;
    var freq = "";


    ref.on("child_added", function (snapshot) {
        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        // Change the HTML to reflect
        train = snapshot.val().train;
        dest = snapshot.val().dest;
        first = snapshot.val().first;
        freq = snapshot.val().freq;

        let firstTime = moment(first, "HH:mm");
        console.log(firstTime);
        let sinceTrain = moment().diff(moment(firstTime), 'minutes');
        let remainder = sinceTrain % freq;
        console.log(remainder);
        let next = freq - remainder;
        console.log(next);

        let print = `
        <tr>
            <td scope="row">${train}</td>
            <td>${dest}</td>
            <td>${first}</td>
            <td>${freq}</td>
            <td>${next}</td>
        </tr>`;
        $('#trainTable').append(print);
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    $('#submit').on('click', function (event) {
        event.preventDefault();

        train = $("#trainName").val().trim();
        dest = $("#destination").val().trim();
        first = $("#firstTrain").val().trim();
        freq = $("#frequency").val().trim();

        ref.push({
            train,
            dest,
            first,
            freq
        });
    });
})