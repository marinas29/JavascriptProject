APP.Controllers.Home = (function(User) {

    var init = function() {
        renderUserList()
    }

    var renderUserList = function() {
        User.getAll().then(function(result) {
        	for (user in result) {
        		$('#list_users').append(' \
                    <div class="col s6 l3">\
                        <div class="card ">\
                            <div class="card-image">\
                                <img src="'+ result[user].avatar_url+'" />\
                    			<span class="card-title title-card"> ' + result[user].login + '</span> \
                            </div>\
                        </div>\
        			</div>')
        		}
        })
    }

    return {
        init: init
    }


})(APP.Services.User)
