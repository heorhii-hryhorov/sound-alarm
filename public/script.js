// SpeechSynth Api
    function announceTask (taskNumber) {
            const synth = window.speechSynthesis;
            // set alarm audio
            var audio = new Audio('/sound/sound.mp3');
            let taskName = $('h5').eq(taskNumber).text();
            let taskTime = $('small').eq(taskNumber).text();
            const speakText = new SpeechSynthesisUtterance(taskName);

            speakText.lang = 'en-US';
            speakText.rate = 0.8;

            let res = taskTime.split(':');
            let hours = parseInt(res[0]);
            let minutes = parseInt(res[1]);

            let essTime = new Date().setHours(hours, minutes, 0);

            var interval = setInterval(function () {
                if (Date.now() > essTime) {
                    clearInterval(interval);
                    if ($.cookie('volume') == 'true') {
                        audio.play();
                        setTimeout(() => {
                            synth.speak(speakText);
                            setTimeout(() => {
                                var name = $('.list-group-item').eq(taskNumber).find('h5').text().replace(/ /g, "-");
                                $.ajax({
                                    type: 'DELETE',
                                    url: 'http://localhost:3000/' + name,
                                    success: function () {
                                        $('a.list-group-item').eq(taskNumber).fadeOut('slow', () => {
                                            $.ajax({
                                                method: 'GET',
                                                url: 'http://localhost:3000/'
                                            });
                                        });
                                    }
                                });
                            }, 3000);
                        }, Math.ceil(audio.duration) * 1000);
                    } else {
                        var name = $('.list-group-item').eq(taskNumber).find('h5').text().replace(/ /g, "-");
                        $.ajax({
                            type: 'DELETE',
                            url: 'http://localhost:3000/' + name,
                            success: function () {
                                $('a.list-group-item').eq(taskNumber).fadeOut('slow', () => {
                                    $.ajax({
                                        method: 'GET',
                                        url: 'http://localhost:3000/'
                                    });
                                });
                            }
                        });
                    }
                }
            }, 1000);
    }

