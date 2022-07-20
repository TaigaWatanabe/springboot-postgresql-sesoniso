package com.example.demo.repository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Comment;
import com.example.demo.entity.CommentUser;

@Transactional
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {


	@Query("select t from Comment t where t.user_id = :Id order by updated_date desc")
	List<Comment> findAllByUserId(Integer Id);

	@Modifying
	@Query("DELETE FROM Comment c where content_id = :Id ")
	void deleteByContent_id(@Param("Id") Integer Id);

	@Query("SELECT c.id,c.comment,c.updatedDate,u.user_name From Comment c "
			+ "INNER JOIN User u on c.user_id = u.id "
			+ "WHERE u.user_name like %:user_name% "
			+ "order by c.updatedDate desc")
	List<Object[]> findUserByUserName(@Param("user_name") String user_name);

	default List<CommentUser> findUserName(String user_name) {
		return findUserByUserName(user_name)
				.stream()
				.map(CommentUser::new)
				.collect(Collectors.toList());
	}

}