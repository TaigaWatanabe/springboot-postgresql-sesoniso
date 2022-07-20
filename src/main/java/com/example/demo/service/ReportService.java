package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.entity.LimitedReportUser;
import com.example.demo.entity.Report;
import com.example.demo.entity.ReportUser;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.RepostUserRepository;

@Service
public class ReportService {
	@Autowired
	ReportRepository reportRepository;

	@Autowired
	RepostUserRepository reportUserRepository;

//	// get all post order by date
//	public List<Report> findAllReport() {
//		return reportRepository.findAll(Sort.by(Sort.Direction.DESC, "updatedDate"));
//	}

	//get all post from merge combineDB which is userDB with reportDB
	public List<ReportUser> findAllUsersReport () {
		return reportUserRepository.findAll(Sort.by(Sort.Direction.DESC, "updatedDate"));
	}

	// Add report
	public void saveReport(Report report) {
		reportRepository.save(report);
	}

	// Delete report
	public void deleteReport(Integer id) {
		reportRepository.deleteById(id);
	}

	// Get report
	public Report editReport(Integer id) {
		return reportRepository.findById(id).orElse(null);
	}

	// Get report
	public List<Report> findAllReportByUserId(Integer user_id) {
		return reportRepository.findAllByUserId(user_id);
	}

	// Get a latest report
	public List<ReportUser> findLatestUsersPost() {
		return reportUserRepository.findLatest();
	}

	// Get a latest report
	public ReportUser findPostById(Integer id) {
		return reportUserRepository.findById(id).orElse(null);
	}

	// Get post after narrow down
	public List<ReportUser> narrowDownContent(String text) {
		return reportUserRepository.narrowDownContent(text);
	}

	// Get post after narrow down by user_name
	public List<LimitedReportUser> findUserByUserName(String name) {
		return reportRepository.findPostByUserName(name);
	}

}
