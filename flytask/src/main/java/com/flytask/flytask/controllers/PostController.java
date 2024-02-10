package com.flytask.flytask.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.flytask.flytask.model.post;
import java.util.List;
import com.flytask.flytask.repository.PostRepository;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	
	private final PostRepository repository;
	
	public PostController(PostRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping
	public String Helloworld(){
		return "Helloworld";
	}
	
	
}
