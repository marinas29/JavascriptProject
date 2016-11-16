APP.Services.User = (function() {

    var getAll = function() {

        var promise = $.ajax({
        	url: "https://api.github.com/users"
        })

        console.log(promise);
    }

    var getUser = function(name) {

    }

    return {
        getAll: getAll,
        getUser: getUser
    }




})()

console.log(APP);
