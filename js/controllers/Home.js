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

            $('body').addClass('body--noscrolled')

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

                    listRepository += '<li id="'+ result[repos].name.replace(/[.]/g, "") +'" onclick="APP.Controllers.Home.renderRepositoryDetails('+ "'" + result[repos].name + "'" +')">\
                        <div class="collapsible-header"> ' + result[repos].name + '</div>\
                        <div class="collapsible-body"><p>Loading...</p></div>\
                    </li>\
                    '
                }

                $('.repository__content').html(listRepository)
            })

        });
    }

    var renderRepositoryDetails = function(nameRepo) {
        var content = $('#' + nameRepo.replace(/[.]/g, "") + ' .collapsible-body').html()
        if (content === "<p>Loading...</p>")
            APP.Services.User.getInfoRepos(nameRepo).then(function(result) {
                var listDetailsRepository = ''

                listDetailsRepository += '<ul class="details-rep" >\
                    <li class="details-rep__list">Fullname: ' + result.full_name + '</li>\
                    <li class="details-rep__list">Description: ' + result.description + '</li>\
                    <li class="details-rep__list">Forks: ' + result.forks_count + '</li>\
                    <li class="details-rep__list">Create: ' + result.created_at + '</li>\
                    <li class="details-rep__list">Default Branch: ' + result.default_branch + '</li>\
                    <li class="details-rep__list">Stargazers Count: ' + result.stargazers_count + '</li>\
                    <li class="details-rep__list">Watchers Count:' + result.watchers_count + '</li>\
                </ul>'

                $('#' + nameRepo.replace(/[.]/g, "") + ' .collapsible-body').html(listDetailsRepository)
            })
    }

    var removeClass = function() {
        $('body').removeClass('body--noscrolled')
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
        renderRepositoryDetails : renderRepositoryDetails,
        removeClass: removeClass
    }



})(APP.Services.User)
