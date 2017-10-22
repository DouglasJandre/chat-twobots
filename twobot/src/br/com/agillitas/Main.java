package br.com.agillitas;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Main {

	@GetMapping("/hello")
	public String hello() {	
		return "Hello, projeto Agillitas";
	}
	
}
