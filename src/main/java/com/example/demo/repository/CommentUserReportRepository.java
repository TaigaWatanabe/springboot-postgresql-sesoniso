package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CommentUserReport;

@Repository
public interface CommentUserReportRepository extends JpaRepository<CommentUserReport, Integer> {

	@Query(nativeQuery = true, value = "select * from comments order by id desc limit 1 ")
	public CommentUserReport findLatest();

	@Query(nativeQuery = true,
			value = "SELECT * FROM comments where comment like %:comment% order by updated_date desc")
	public List<CommentUserReport> narrowDownComment(@Param("comment") String comment);

//	@Query(nativeQuery = true,
//			value = "SELECT * FROM comments where  user user_name like %:user_name% order by id desc")
//	public List<CommentUserReport> findUserByUserName(@Param("user_name") String user_name);

}
