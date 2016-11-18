APP.Controllers.Home = (function(User) {

    var init = function() {
        renderUserList()
        setupEvents()
    }

    var renderUserList = function() {


        User.getAll().then(function(result) {

        	for (user in result) {
        		$('#list_users').append(' \
                    <div class="col s6 m4 l3">\
                        <div class="card ">\
                            <div class="card-image">\
                                <a onclick="APP.Controllers.Home.renderUserDetails(' + "'" + result[user].login + "'" + ')"> \
                                <img src="'+ result[user].avatar_url+'" />\
                    			<span class="title-card"> ' + result[user].login + '</span> </a>\
                            </div>\
                        </div>\
        			</div>'
                )
        	}
        })
    }

    var renderUserDetails = function(name, e) {
        APP.Services.User.getUser(name).then(function(result) {
        //    console.log(result);
            $('#modal').addClass('modal-full--active')

            $('.modal-full__details__content').html(' \
                    <img src="'+ result.avatar_url +'" class="modal-full__details__content__avatar" /> \
                    <div class="modal-full__details__content__profile"> \
                        <h4 class="modal-full__details__content__profile modal-full__details__content__profile--title"> ' + result.name + '</h4> \
                        <p class="modal-full__details__content__profile modal-full__details__content__profile--text"> ' + result.email + '</p> \
                        <p class="modal-full__details__content__profile modal-full__details__content__profile--text"> ' + result.location +'</p> \
                    </div>\
                    <a onclick="APP.Controllers.Home.removeClass()"><i class="fa fa-times modal-full__close" ></i></a>\
            ')


            APP.Services.User.getRepos().then(function(result) {

                var listRepository = ''

                for (repos in result) {
                    listRepository += '<li>\
                        <div class="collapsible-header"> ' + result[repos].name + '</div>\
                        <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>\
                    </li>\
                    '
                }

                $('.repository__content').html(listRepository)
            })
        });
    }

    var removeClass = function() {
        $('#modal').removeClass('modal-full--active')
    }

    function setupEvents() {
        $('#modal-details').on('click', function(event) {
            event.stopPropagation()
        })
    }

    return {
        init: init,
        renderUserDetails: renderUserDetails,
        removeClass: removeClass
    }



})(APP.Services.User)
