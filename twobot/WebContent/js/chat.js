    $(document).ready( function(){

      //boas vindas.

      $.ajax({
//          url: 'https://sysbot.mybluemix.net/conversa/reset',
    	   url: 'http://localhost:8080/conversa/reset',
    	    method: 'get',

          beforeSend: function() {
            $('#progress').html('<img src="img/loader.gif" width="20"> SysBot esta digitando...');
          },

          success: function(data){
          var x = data.split("|");
            $('#msg').append('<li class="mar-btm">');
                $('#msg').append('<div class="media-left"><img src="img/sysbot.png" class="img-circle img-sm" alt="Profile Picture"></div>');
                $('#msg').append('<div class="media-body pad-hor"><div class="speech"><a href="#" class="media-heading"> SysBot </a><p>'+x[1]+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>09:23AM</p>');
                $('#msg').append('</div></div></li>');
                $('#progress').html('');
          }
        });


      var minhadiv = document.getElementById("chat");
      $('#btn-envia').click(function(){
        var msg = $('#pergunta').val();                 // Texto do usuário, pronto a guardar na base de dados.
        $.ajax({
//          url: 'https://sysbot.mybluemix.net/conversa/' + msg,
          url: 'http://localhost:8080/conversa/' + msg,
          method: 'get',

          beforeSend: function() {
                console.log('o que foi: ' + msg);
                $('#progress').html('<img src="img/loader.gif" width="20"> SysBot esta digitando...');
                var tt = $('#pergunta').val();
                $('#pergunta').val('');
                
                $('#msg').append('<li class="mar-btm">');
                $('#msg').append('<div class="media-right"><img src="img/user.jpg" class="img-circle img-sm" alt="Profile Picture"></div>');
                $('#msg').append('<div class="media-body pad-hor speech-right"><div class="speech"><a href="#" class="media-heading">Você</a><p>'+msg+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>09:23AM</p>');
                $('#msg').append('</div></div></li>');
               minhadiv.scrollTop = minhadiv.scrollHeight;
          },

          success: function(data){ 

                  //if (data == "ligaCam") {
                  //  console.log('Abrindo cam.');
                  //  $('btnPag').click();
                  //  return;
                  //}
                  console.log('o que veio: ' + data);
                  var x = data.split("|");
                  console.log('depois do teste: ' + x[1]);
                  //if (x[0] == "true") {
                  //  console.log('audio tocando..');
                  //  var playAudio = document.getElementById("playAudio");
                  //  playAudio.play();
                  //}     
                  console.log(data);
                  $('#progress').html('');
                  $('#msg').append('<li class="mar-btm">');
                  $('#msg').append('<div class="media-left"><img src="img/sysbot.png" class="img-circle img-sm" alt="Profile Picture"></div>');
                  $('#msg').append('<div class="media-body pad-hor"><div class="speech"><a href="#" class="media-heading">SysBot</a><p>'+x[1]+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>09:23AM</p>');
                  $('#msg').append('</div></div></li>');
                  minhadiv.scrollTop = minhadiv.scrollHeight;
                }
     
        });
      });

      $(document).keypress(function(e) {
        if(e.which == 13){ //Enviar texto com o ENTER
          if ($('#pergunta').val() != "") {
            $('#btn-envia').click();
          }
        } 
        
      });

    });