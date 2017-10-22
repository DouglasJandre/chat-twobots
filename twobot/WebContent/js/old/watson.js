var conversa = [];
var minhadiv = document.getElementById("chatbody");
function sendMsg(msg){
    var mensagem = msg || $('#msg').val();
    console.log(mensagem);
    $('#msg').val("");
    addMsgToChat(mensagem, false);
    conversa.push(mensagem);
    $.get("http://diskpizza3.mybluemix.net/rest/conversa/"+mensagem, function(data){
        console.log(data.output.text);
        console.log(data);
        parseResponse(data);
        conversa.push(data.output.text[0]);
        minhadiv.scrollTop = minhadiv.scrollHeight;
    });
    
    minhadiv.scrollTop = minhadiv.scrollHeight;
}

function addMsgToChat(msg, watson){
    if(watson){
        addWatsonMsgToChat(msg);
    }else{
        addPersonMsgToChat(msg);
    }
}
function addWatsonMsgToChat(msg){
    var content = '<div class="row"><div class="col-lg-12"><div class="media"><img class="pull-left media-object img-circle" src="img/wat.png" alt=""><div class="media-body"><h4 class="media-heading">Watson</h4><p>'+msg+'</p></div></div></div></div>';
    $('#chatbody').append(content);
}

function addPersonMsgToChat(msg){
    var content = '<div class="row"><div class="col-lg-12"><div class="media"><img class="pull-left media-object img-circle" src="img/voce.jpg" alt=""><div class="media-body"><h4 class="media-heading">Você</h4><p>'+msg+'</p></div></div></div></div>';
    $('#chatbody').append(content);
}

function parseResponse(response){
    if(response.context.controle === '-1'){
         addMsgToChat('Obrigado por fazer seu pedido, seu feedback é muito importante para que eu continue aprendendo',true);
         addMsgToChat(response.output.text[0],true);
         addMsgToChat('Acertei?',true);
         askForFeedBack();
    }
    else{
        addMsgToChat(response.output.text[0],true);
    }
}

function askForFeedBack(){
    var content = '<div class="row"><div class="text-center"><a onclick="sendFeedBack(false)" class="col-md-3 col-md-offset-3 linkh" href="#contact"><i style="color:red;"  class="fa fa-thumbs-o-down fa-5x" aria-hidden="true"></i></a><a onclick="sendFeedBack(true)" class="col-md-3 linkh" href="#contact"><i style="color:green;"  class="fa fa-thumbs-o-up fa-5x" aria-hidden="true"></i></a></div></div>';
    $('#chatbody').append(content);
    (function($) {
        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $('a.linkh').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top - 50)
            }, 1250, 'easeInOutExpo');
            event.preventDefault();
        });
    })(jQuery);
}

function sendFeedBack(acertou){
    if(conversa && conversa.length > 0){
        var conversaObj = {"frases": conversa, "acertou": acertou, "data" : new Date()};

        console.log("Conversa: " + JSON.stringify(conversaObj));


        $.ajax({
          type: "POST",
         // url: "http://localhost:9080/Disk-Pizza3/rest/conversa/post/log",
          url: "http://diskpizza3.mybluemix.net/rest/conversa/post/log",
          data: JSON.stringify(conversaObj),
          success: successHandler(),
          dataType: "json"
        });

        function successHandler(){
            console.log("Log da conversa enviado com sucesso");
            resetPedido();
        }
    }else{
        console.log('Conversa vazia');
    }
}

function resetPedido(){
    console.log('Resetando o pedido');
    conversa = [];
}

