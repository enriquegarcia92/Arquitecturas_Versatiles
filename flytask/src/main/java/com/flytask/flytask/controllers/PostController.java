package com.flytask.flytask.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.flytask.flytask.repository.PostRepository;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	
	private final PostRepository repository;
	
	public PostController(PostRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/getPosts")
	public String Helloworld(){
		return "Test de contenedor";
	}
	
	
}
