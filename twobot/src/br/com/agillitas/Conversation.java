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
public class Conversation {
	private ConversationService service;
	private Map<String, Object> context;

	public Conversation() {
		init();
	}

	public void init() {
		service = new ConversationService(ConversationService.VERSION_DATE_2016_09_20,
//				"298bf007-cba9-4337-a7b1-d111df54c1a6", "5QWIwMsYZAnL");
				"12150462-761b-4e43-a9ef-1dedbb2f7de5", "rACRSaYtGBJI");
		context = null;
	}

	// String = MessageResponse
	public String conversar(String frase) {	
		MessageRequest request = new MessageRequest.Builder().context(context).inputText(frase).build();
//		MessageResponse resp = service.message("92cca8fe-60fd-41a7-9a5a-43803116ff0b", request).execute();
		MessageResponse resp = service.message("9f682663-a4aa-4f62-a074-9fce0157fd97", request).execute();

		context = resp.getContext();
		String jsonResp = "false|" + resp.getTextConcatenated("");
		return jsonResp;
	}

//	public String conversar2(String frase2) {
//		MessageRequest request = new MessageRequest.Builder().context(context).inputText(frase).build();
//		MessageResponse resp = service.message("92cca8fe-60fd-41a7-9a5a-43803116ff0b", request).execute();
//		context = resp.getContext();
//
//		return null;
//	}

}