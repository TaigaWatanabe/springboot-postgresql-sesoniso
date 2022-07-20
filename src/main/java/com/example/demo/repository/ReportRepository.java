package com.example.demo.repository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.LimitedReportUser;
import com.example.demo.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

	@Query("select t from Report t where t.user_id = :Id order by updated_date desc")
	List<Report> findAllByUserId(Integer Id);

	@Query("SELECT r.id,r.content,r.updatedDate,r.user_id,u.user_name From Report r "
			+ "INNER JOIN User u on r.user_id = u.id "
			+ "WHERE u.user_name like %:user_name% "
			+ "order by r.updatedDate desc")
	List<Object[]> findPost(@Param("user_name") String user_name);

	default List<LimitedReportUser> findPostByUserName(String user_name) {
		return findPost(user_name)
				.stream()
				.map(LimitedReportUser::new)
				.collect(Collectors.toList());
	}

}