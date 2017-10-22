package br.com.agillitas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConversationFacade {
	@Autowired
	private Conversation conversation;
	
	@Autowired
	private Conversation2 conversation2;

	 @CrossOrigin(origins = "*")
	 @GetMapping("/conversa/{frase}")
	 public String conversar(@PathVariable String frase){
	 return conversation.conversar(frase);
	 }
	 
	 @CrossOrigin(origins = "*")
	 @GetMapping("/conversa2/{frase2}")
	 public String conversar2(@PathVariable String frase2){
	 return conversation2.conversar2(frase2);
	 }

	
}
