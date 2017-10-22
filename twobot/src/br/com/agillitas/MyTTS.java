package br.com.agillitas;


import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import com.ibm.watson.developer_cloud.text_to_speech.v1.TextToSpeech;
import com.ibm.watson.developer_cloud.text_to_speech.v1.model.AudioFormat;
import com.ibm.watson.developer_cloud.text_to_speech.v1.model.Voice;

public class MyTTS {
	private TextToSpeech tts;

	public MyTTS() {
		tts = new TextToSpeech("ec7c1bd7-1ee0-42d0-a2a9-736f193a11f8", "tGqnHXrJqaBX");
	}

	public void salvarAudios(String map) throws Exception {
		InputStream is = tts.synthesize(map, Voice.PT_ISABELA, AudioFormat.WAV).execute();
		OutputStream out = new FileOutputStream("C:\\Users\\Douglas Jandre\\Desktop\\AgillitasTeste\\audio.wav"); //PastaLocal"C:\\Users\\User\\Desktop\\Audios\\audio.wav");
		byte[] buffer = new byte[1024];				//salva na pasta do arquivo"  ..\\BancoRendimento\\WebContent\\Audios\\audio.ogg" //pastaLocalCasa "C:\\Users\\Douglas Jandre\\Desktop\\AgillitasTeste\\audio.wav"
		int length;									//C:\\Users\\Douglas Jandre\\Desktop\\AgillitasTeste\\audio.wav
		while ((length = is.read(buffer)) > 0) {	//AgillitasTeste/audio.ogg (testar no bluemix)
			out.write(buffer, 0, length);
		}
		out.close();
		is.read();
		is.close();

	}

}