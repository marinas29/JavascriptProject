APP.Controllers.Home = (function(User) {

    var init = function() {
        renderUserList()
    }

    var renderUserList = function() {
        User.getAll().then(function(result) {
        	for (user in result) {
        		$('body').append(' \
        			<div> \
        				<h2>' + result[user].login + '</h2> \
        			</div>')
        		}
        })
    }

    return {
        init: init
    }


})(APP.Services.User)
