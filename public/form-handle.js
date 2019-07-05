function openTab(evt, name) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

function defaultTaskTime () {
    var date = new Date();
    hours = date.getHours(),
    minutes = date.getMinutes();
    if(hours < 10) hours = '0' + hours;
    if(minutes < 10) minutes = '0' + minutes;
    var defaultTime = (hours + ':' + minutes);
    document.getElementById('time-input').value = defaultTime;
}

$(function() {

    defaultTaskTime();

    if (typeof $.cookie('volume') === 'undefined'){

    } else {
        $.cookie('volume');
    }


    if ($.cookie('volume') == 'true') {
        $('img.mb-5').attr('src', '/img/volume-up-solid.svg');
    } else  {
        $('img.mb-5').attr('src', '/img/volume-mute-solid.svg');
    }

    // set default volume
    $('img.mb-5').on('click', ()=> {
        if ($.cookie('volume') == 'true') {
            $('img.mb-5').attr('src', '/img/volume-mute-solid.svg');
            $.cookie('volume', false);
        } else  {
            $('img.mb-5').attr('src', '/img/volume-up-solid.svg');
            $.cookie('volume', true);
        }
    });


    $("body").ready(function () {
        let taskcount = $('.list-group-item').length;
        for (let i = 0; i < taskcount; i++) {
            announceTask(i);
        }
    });

    $('form.form-group').on('submit', function (e) {
        e.preventDefault();
        var task_body = $('#text-input').val();
        var task_time = $('#time-input').val();
        var taskCount = $('.list-group-item').length;
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/',
            dataType : "json",
            data: {name: task_body, time: task_time},
            success: function () {
                $('.list-group').append('<a href="javascript:;" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+task_body+'</h5><small>'+task_time+'</small></div></a>');
                $('.tablinks')[0].click();
                setTimeout(() => {
                    if (taskCount+1) {
                        announceTask(taskCount);
                    }
                }, 3000);
            }
        });

    });

    $('body').on('mouseover', 'a.list-group-item', function () {
        $(this).addClass('active');
    }).on("mouseout", 'a.list-group-item', function() {
        $(this).removeClass("active");
    });

    $('body').on('click', 'a.list-group-item', function () {
            var name = $(this).find('h5').text().replace(/ /g, " ");
            $(this).fadeOut('slow').remove();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/' + name,
            success: function () {
                $.ajax({
                    method: 'GET',
                    url: 'http://localhost:3000/'
                });
            }
        });
    });
});


