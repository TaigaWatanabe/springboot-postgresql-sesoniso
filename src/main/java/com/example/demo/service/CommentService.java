package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Comment;
import com.example.demo.entity.CommentUser;
import com.example.demo.entity.CommentUserReport;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.CommentUserReportRepository;

@Service
public class CommentService {

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	CommentUserReportRepository commentUserReportRepository;

//	add comment
	public void addComment(Comment comment) {
		commentRepository.save(comment);
	}

//	get latest comment
	public CommentUserReport getLatesComment() {
		return commentUserReportRepository.findLatest();
	}
//	get comment and user info
	public List<CommentUserReport> findAllUserComment() {
		return commentUserReportRepository.findAll(Sort.by(Sort.Direction.DESC, "updatedDate"));
	}

	// Delete report
	public void deleteComment(Integer id) {
		commentRepository.deleteByContent_id(id);
	}

	// Delete report
	public void deleteCommentById(Integer id) {
		commentRepository.deleteById(id);
	}

	// Get comment
	public Comment getComment(Integer id) {
		return commentRepository.findById(id).orElse(null);
	}

	// Get comment
	public CommentUserReport getCommentUserReport(Integer id) {
		return commentUserReportRepository.findById(id).orElse(null);
	}

	// Get comment after narrow down
	public List<CommentUserReport> narrowDownComment(String comment) {
		return commentUserReportRepository.narrowDownComment(comment);
	}

	// Get comment after narrow down by user_name
	public List<CommentUser> findUserByUserName(String name) {
		return commentRepository.findUserName(name);
	}

	// Get report
	public List<Comment> findAllCommentByUserId(Integer user_id) {
		return commentRepository.findAllByUserId(user_id);
	}

}
