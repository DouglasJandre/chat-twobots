    $(document).ready( function(){

      //boas vindas.

      $.ajax({
//          url: 'https://sysbot.mybluemix.net/conversa2/reset',
    	  	url: 'http://localhost:8080/conversa2/reset',
            method: 'get',

          beforeSend: function() {
            $('#progress2').html('<img src="img/loader.gif" width="20"> SysBot esta digitando 2...');
          },

          success: function(data){
          var x = data.split("|");
            $('#msg2').append('<li class="mar-btm">');
                $('#msg2').append('<div class="media-left"><img src="img/sysbot.png" class="img-circle img-sm" alt="Profile Picture"></div>');
                $('#msg2').append('<div class="media-body pad-hor"><div class="speech"><a href="#" class="media-heading"> SysBot2 </a><p>'+x[1]+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>09:23AM</p>');
                $('#msg2').append('</div></div></li>');
                $('#progress2').html('');
          }
        });


      var minhadiv = document.getElementById("chat2");
      $('#btn-envia2').click(function(){
        var msg2 = $('#pergunta2').val();                 // Texto do usuário, pronto a guardar na base de dados.
        $.ajax({
//          url: 'https://sysbot.mybluemix.net/conversa2/' + msg2,
        	url: 'http://localhost:8080/conversa2/' + msg2,
          method: 'get',

          beforeSend: function() {
                console.log('o que foi: ' + msg2);
                $('#progress2').html('<img src="img/loader.gif" width="20"> SysBot esta digitando 2...');
                var tt = $('#pergunta2').val();
                $('#pergunta2').val('');
                
                $('#msg2').append('<li class="mar-btm">');
                $('#msg2').append('<div class="media-right"><img src="img/user.jpg" class="img-circle img-sm" alt="Profile Picture"></div>');
                $('#msg2').append('<div class="media-body pad-hor speech-right"><div class="speech"><a href="#" class="media-heading">Você</a><p>'+msg2+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>09:23AM</p>');
                $('#msg2').append('</div></div></li>');
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
                  $('#progress2').html('');
                  $('#msg2').append('<li class="mar-btm">');
                  $('#msg2').append('<div class="media-left"><img src="img/sysbot.png" class="img-circle img-sm" alt="Profile Picture"></div>');
                  $('#msg2').append('<div class="media-body pad-hor"><div class="speech"><a href="#" class="media-heading">SysBot2</a><p>'+x[1]+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>09:23AM</p>');
                  $('#msg2').append('</div></div></li>');
                  minhadiv.scrollTop = minhadiv.scrollHeight;
                }
     
        });
      });

      $(document).keypress(function(e) {
        if(e.which == 13){ //Enviar texto com o ENTER
          if ($('#pergunta2').val() != "") {
            $('#btn-envia2').click();
          }
        } 
        
      });

    });