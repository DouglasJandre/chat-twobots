package br.com.agillitas;


import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;

@Component
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Conversation2 {
	private ConversationService service;
	private Map<String, Object> context;

	public Conversation2() {
		init();
	}

	public void init() {
		service = new ConversationService(ConversationService.VERSION_DATE_2016_09_20,
				"12150462-761b-4e43-a9ef-1dedbb2f7de5", "rACRSaYtGBJI");
		context = null;
	}

	// String = MessageResponse
	public String conversar2(String frase2) {	
		MessageRequest request = new MessageRequest.Builder().context(context).inputText(frase2).build();
		MessageResponse resp2 = service.message("9f682663-a4aa-4f62-a074-9fce0157fd97", request).execute();
		context = resp2.getContext();
		String jsonResp2 = "true|" + resp2.getTextConcatenated("");
		return jsonResp2;
	}
}