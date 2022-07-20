package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	@Query("select t from User t where t.user_name = :user_name")
	List<User>findByUserName(String user_name);

	@Query("select t from User t where t.name = :name and t.password = :password")
	List<User> findByAccount(String name, String password);

	@Query("select t from User t where t.user_name like %:user_name%")
	List<User>findUserByUserName(String user_name);

}
