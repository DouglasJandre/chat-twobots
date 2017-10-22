jQuery.support.cors = true;
var conversa = [];
var Message;
var synth = window.speechSynthesis;

Message = function (arg) {
    this.text = arg.text, this.message_side = arg.message_side;
    this.draw = function (_this) {
        return function () {
            var $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);
            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
};
var getMessageText, sendMessage;
var conversationService = conversationServiceWithVoice.bind(this, document.getElementById('watsonVoice'));

function conversationServiceWithVoice(audioTag, mensagem){
    conversa.push(mensagem);
    $.get(_end_url+"rest/conversa/"+mensagem, function(data){
        var resp = data.output.text[0];
        conversa.push(resp);
        sendMessage(resp, 'left');
        resolveAudioResp(data , audioTag);
    });
}

function resolveAudioResp(resp , audioTag){
    var controle = resp.context.controle;
    if(controle && controle == -1){
        //finaliza o pedido
        $.ajax({
            type: "POST",
            url: _end_url+"rest/conversa/pedido/pedir",
            data:"oi",
            success: function(data){console.log("Sucesso");}
        });
        //play tts
        sendMessage("Acertei? Seu feedback é importante para nós", "left");
        var utterThis = new SpeechSynthesisUtterance(resp.output.text[0] + "Acertei? Seu feedback é importante para nós");

        utterThis.voice = "Google português do Brasil";

        utterThis.pitch = 1;
        utterThis.rate = 1;
        synth.speak(utterThis); 
        askForFeedBack();

    }else{
        //play by id
        console.log('playing audio: ' + resp.context.id);
        playAudio(resp.context.id ,audioTag);  
    }
}

function playAudio(id, audioTag){
    audioTag.src = 'audio/audio' + id + '.ogg';
    audioTag.play();
}

getMessageText = function () {
    var $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
};
sendMessage = function (text, side, callback) {
    var $messages, message;
    if (text.trim() === '') {
        return;
    }
    $('.message_input').val('');
    $messages = $('.messages');
    message = new Message({
        text: text,
        message_side: side
    });
    message.draw();
    if(callback) callback(text);
    return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
};
$('.send_message').click(function (e) {
    sendMessage(getMessageText(), 'right', conversationService);
    //playAudio(1,document.getElementById('watsonVoice'));
});
$('.message_input').keyup(function (e) {
    if (e.which === 13) {
        sendMessage(getMessageText(), 'right', conversationService);
    }
});

function askForFeedBack(){
    var content = '<div class="row"><div class="text-center"><a onclick="sendFeedBack(false)" class="col-md-3 col-md-offset-3 linkh" href="#contact"><i style="color:red;"  class="fa fa-thumbs-o-down fa-5x" aria-hidden="true"></i></a><a onclick="sendFeedBack(true)" class="col-md-3 linkh" href="#contact"><i style="color:green;"  class="fa fa-thumbs-o-up fa-5x" aria-hidden="true"></i></a></div></div>';
    $('.messages').append(content);
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

window.sendMessage = sendMessage;


function sendFeedBack(acertou){
    if(conversa && conversa.length > 0){
        var conversaObj = {"frases": conversa, "acertou": acertou, "data" : new Date()};

        console.log("Conversa: " + JSON.stringify(conversaObj));


        $.ajax({
            type: "POST",
            url: _end_url+"rest/conversa/post/log",
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
