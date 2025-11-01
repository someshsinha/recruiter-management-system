-- Fast lookup for applicant's job matching:
CREATE INDEX idx_profiles_domain ON profiles(domain);
CREATE INDEX idx_job_adverts_domain ON job_adverts(domain);
CREATE INDEX idx_job_adverts_status ON job_adverts(status);

-- Fast lookup for recruiter's job/client management:
CREATE INDEX idx_job_adverts_recruiter ON job_adverts(recruiter_id);
CREATE INDEX idx_job_adverts_client ON job_adverts(client_id);
CREATE INDEX idx_applications_job ON applications(job_id);

-- Fast lookup for sorting applications by ATS score (Recruiter view):
CREATE INDEX idx_applications_ats_score ON applications(ats_score DESC);

-- Other utility indexes:
CREATE INDEX idx_applications_applicant ON applications(applicant_id);
CREATE INDEX idx_interactions_candidate ON candidate_interactions(candidate_id);
CREATE INDEX idx_ats_history_application ON ats_score_history(application_id);
CREATE INDEX idx_email_log_application ON email_log(related_application_id);
