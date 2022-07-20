package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ReportUser;

@Repository
public interface RepostUserRepository extends JpaRepository<ReportUser, Integer> {

	@Query(nativeQuery = true, value = "select * from report order by id desc limit 1 ")
	public List<ReportUser> findLatest();

	@Query(nativeQuery = true,
			value = "select * from report where content like %:content% order by updated_date desc")
	public List<ReportUser> narrowDownContent(@Param("content") String content);

}
