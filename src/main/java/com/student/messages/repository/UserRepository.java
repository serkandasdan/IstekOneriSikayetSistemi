package com.student.messages.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.student.messages.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	User findByUsernameAndPassword(String username, String password);

	User findByUsername(String username);	
	
	User findByPassword(String password);	
}
