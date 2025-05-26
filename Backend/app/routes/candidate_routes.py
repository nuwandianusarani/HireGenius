from flask import Blueprint, request, jsonify, send_from_directory
from app.models.candidate_model import Candidate
import os
import json
import joblib
import pandas as pd
# import numpy as np

# from app.services.linkedin_service import fetch_linkedin_data, calculate_score
# from app.services.github_service import assign_marks, scaler, kmeans_model
# from app.services.transcript_service import process_pdf, JOB_DICTIONARY
from werkzeug.utils import secure_filename

from app.cv_processing import (
    extract_text_from_pdf,
      extract_contact_info, 
      extract_soft_skills, 
      extract_technical_skills_from_projects, 
      generate_and_store_skills_chart,
      extract_programming_languages,
      extract_website_development_technologies,
      extract_programming_frameworks,
      extract_cloud_technologies,
      extract_devops_technologies,
      extract_version_control_technologies,
      extract_database_technologies,
      extract_project_experiences,
      extract_courses_certifications_achievements,
      extract_work_experience,
      extract_software_development_methodologies,
      generate_all_charts,
      extract_achievements
)

from collections import Counter
from app.similarity import calculate_similarity
from app.utils.chart_utils import get_and_display_chart

from app.models.job_model import Job


candidate_routes = Blueprint('candidates', __name__)

from app import db  # Import the shared db instance
candidates_collection = db["candidates"]  # Define candidates_collection

# Define folders for CV and transcripts
UPLOAD_FOLDER_CV = os.path.join(os.getcwd(), 'uploads/cv')
UPLOAD_FOLDER_TRANSCRIPTS = os.path.join(os.getcwd(), 'uploads/transcripts')
# UPLOAD_FOLDER_TRANSCRIPT_EVALUATION = os.path.join(os.getcwd(), 'uploads/transcript_evaluation')

os.makedirs(UPLOAD_FOLDER_CV, exist_ok=True)
os.makedirs(UPLOAD_FOLDER_TRANSCRIPTS, exist_ok=True)
# os.makedirs(UPLOAD_FOLDER_TRANSCRIPT_EVALUATION, exist_ok=True)

# Load the trained stacked model
model_path = os.path.join(os.getcwd(), "local_model", "stacked_model_new.joblib")
model = joblib.load(model_path)

@candidate_routes.route('/candidates', methods=['POST'])
def create_candidate():
    data = request.form.to_dict()  # Parse form data
    cv = request.files.get('resume')
    transcript = request.files.get('transcript')

    # Save the uploaded CV file
    if cv:
        cv_path = os.path.join(UPLOAD_FOLDER_CV, cv.filename)
        cv.save(cv_path)
        data['resume'] = cv.filename

        # Extract and process CV data
        cv_text = extract_text_from_pdf(cv_path)
        contact_info = extract_contact_info(cv_text)
        
        # Extract tools and technologies count
        no_devops_tools = extract_devops_technologies(cv_text)
        no_cloud_technologies = extract_cloud_technologies(cv_text)
        no_programming_frameworks = extract_programming_frameworks(cv_text)
        no_web_technologies = extract_website_development_technologies(cv_text)
        no_programming_languages = extract_programming_languages(cv_text)
        no_version_control_technologies = extract_version_control_technologies(cv_text)
        no_database_technologies = extract_database_technologies(cv_text)
        no_software_development_methodologies = extract_software_development_methodologies(cv_text)

        # Extract candidate experience details
        project_experiences = extract_project_experiences(cv_text)
        courses_certifications_achievements = extract_courses_certifications_achievements(cv_text)
        work_experience = extract_work_experience(cv_text)
        achievements = extract_achievements(cv_text)

        # Add processed data to the candidate data
        data.update({
            'extracted_email': contact_info.get('email'),
            'extractedgithub': contact_info.get('github'),
            'extractedlinkedin': contact_info.get('linkedin'),
            'extractednoofprogramminglanguages': no_programming_languages,
            'extractednoofwebtechnologies': no_web_technologies,
            'extractednoofprogrammingframeworks': no_programming_frameworks,
            'extractednoofcloudtechnologies': no_cloud_technologies,
            'extractednoofdevopstools': no_devops_tools,
            'extractednoofversioncontroltechnologies': no_version_control_technologies,
            'extractednoofdatabasetechnologies': no_database_technologies,
            'extractednoofsoftwaredevelopmentmethodologies': no_software_development_methodologies,
            'project_experiences': project_experiences,
            'courses_certifications_achievements': courses_certifications_achievements,
            'extract_achievements': achievements,
            'work_experience': work_experience,
            'cv_text': cv_text
        })

    # Save the uploaded transcript file
    if transcript:
        transcript_path = os.path.join(UPLOAD_FOLDER_TRANSCRIPTS, transcript.filename)
        transcript.save(transcript_path)
        data['transcript'] = transcript.filename

    # Save the structured data to the database
    candidate = Candidate.create(data)

    # Trigger similarity and prediction processing
    process_similarity_and_prediction(candidate['_id'])

    return jsonify(candidate), 201

def process_similarity_and_prediction(candidate_id):
    candidate = Candidate.get_by_id(candidate_id)
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404

    # Extract textual data for similarity calculation
    extract_courses_certifications_text = " ".join(
        item.get("content", "") if isinstance(item, dict) else item
        for item in candidate.get("courses_certifications_achievements", [])
    )
    extract_work_experience_text = " ".join(candidate.get("work_experience", []))
    extract_projects_text = " ".join(candidate.get("project_experiences", []))
    extract_achievements_text = " ".join(candidate.get("extract_achievements", []))

    # Handle missing job data
    job_id = candidate.get("jobID")
    if not job_id:
        return jsonify({"error": "Job ID missing"}), 400

    job = Job.get_by_id(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404

    required_skills = job.get("skills", "")
    experience = job.get("experience", "")
    qualifications = job.get("qualifications", "")
    achievements = job.get("duties", "")

    combined_job_text = " ".join([required_skills, experience, qualifications, achievements])
    cv_text = candidate.get("cv_text", "")

    if not any([qualifications.strip(), required_skills.strip(), experience.strip(), achievements.strip()]):
        return jsonify({"error": "Job details missing"}), 400
    


    # Count number of tools & technologies
    num_of_tools_technologies = sum([
        candidate.get("extractednoofprogramminglanguages", 0),
        candidate.get("extractednoofwebtechnologies", 0),
        candidate.get("extractednoofprogrammingframeworks", 0),
        candidate.get("extractednoofcloudtechnologies", 0),
        candidate.get("extractednoofdevopstools", 0),
        candidate.get("extractednoofversioncontroltechnologies", 0),
        candidate.get("extractednoofdatabasetechnologies", 0),
        candidate.get("extractednoofsoftwaredevelopmentmethodologies", 0)
    ])

    # ─────────────── Additional Field Extraction as Paragraphs ────────────────
    entered_employer_choice = candidate.get("employerChoice", "")
    entered_employer_expectations = candidate.get("employerExpectations", "")
    entered_message = candidate.get("message", "")

    education_raw = candidate.get("education", [])
    if isinstance(education_raw, str):
        try:
            import json
            education_list = json.loads(education_raw)
        except:
            education_list = []
    else:
        education_list = education_raw

    entered_education_paragraph = "\n".join(
        f"{edu.get('degree', '')} at {edu.get('institute', '')} ({edu.get('year', '')})"
        for edu in education_list
    )

    experience_raw = candidate.get("experience", [])
    if isinstance(experience_raw, str):
        try:
            import json
            experience_list = json.loads(experience_raw)
        except:
            experience_list = []
    else:
        experience_list = experience_raw

    entered_experience_paragraph = "\n".join(
        f"{exp.get('title', '')} at {exp.get('company', '')}, from {exp.get('from', '')} to {exp.get('to', '')} in {exp.get('officeLocation', '')}. Description: {exp.get('description', '')}"
        for exp in experience_list
    )

    
    entered_courses_certifications_paragraph = candidate.get("coursesCertifications", "")
    entered_project_experiences_paragraph = "\n".join(candidate.get("project_experiences", []))

    
    # Calculate similarity scores (converted to percentages)
    extract_courses_similarity = round(calculate_similarity(extract_courses_certifications_text, qualifications) * 100, 2)
    extract_work_experience_similarity = round(calculate_similarity(extract_work_experience_text, experience) * 100, 2)
    extract_projects_similarity = round(calculate_similarity(extract_projects_text, required_skills) * 100, 2)
    extract_achievements_similarity = round(calculate_similarity(extract_achievements_text, achievements) * 100, 2)

    extract_cv_similarity = round(calculate_similarity(cv_text, combined_job_text) * 100, 2)

    entered_employer_choice_similarity = round(calculate_similarity(entered_employer_choice, combined_job_text) * 100, 2)
    entered_employer_expectations_similarity = round(calculate_similarity(entered_employer_expectations, combined_job_text) * 100, 2)
    entered_message_similarity = round(calculate_similarity(entered_message, combined_job_text) * 100, 2)

   
    entered_courses_certifications_similarity = round(calculate_similarity(entered_courses_certifications_paragraph,  achievements ) * 100, 2)
    entered_project_experiences_similarity = round(calculate_similarity(entered_project_experiences_paragraph, experience) * 100, 2)
    entered_education_similarity = round(calculate_similarity(entered_education_paragraph, qualifications) * 100, 2)
    entered_experience_similarity = round(calculate_similarity(entered_experience_paragraph, experience) * 100, 2)


    # Update candidate record with similarity scores
    Candidate.update(candidate_id, {
        "extract_coursesAndCertificationMatchingSimilarity": extract_courses_similarity,
        "extract_workExperienceMatchingSimilarity": extract_work_experience_similarity,
        "extract_projectsMatchingSimilarity": extract_projects_similarity,
        "extract_achievements_similarity": extract_achievements_similarity,
        "extract_num_of_tools_technologies": num_of_tools_technologies,

        "extract_cv_similarity": extract_cv_similarity,

        "entered_employer_choice_similarity": entered_employer_choice_similarity,
        "entered_employer_expectations_similarity": entered_employer_expectations_similarity,
        "entered_message_similarity": entered_message_similarity,


        # "entered_achievements_similarity": entered_achievements_similarity,
        "entered_courses_certifications_similarity": entered_courses_certifications_similarity,
        "entered_project_experiences_similarity": entered_project_experiences_similarity,
        "entered_education_similarity": entered_education_similarity,
        "entered_experience_similarity": entered_experience_similarity,

    })

    return jsonify({"message": "Candidate similarity updated"}), 200

@candidate_routes.route('/candidates/predict/<candidate_id>', methods=['GET'])
def predict_matching_percentage(candidate_id):
    """Predicts the candidate's matching percentage using an ML model."""
    candidate = Candidate.get_by_id(candidate_id)
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404

    input_data = {
        "No of Tools and Technologies": candidate.get("extract_num_of_tools_technologies", 0),
        "Courses & Certifications Matching": candidate.get("extract_coursesAndCertificationMatchingSimilarity", 0),
        "Achievements Matching": candidate.get("extract_achievements_similarity",0),  # Assuming static value for achievements
        "Work Experience Matching": candidate.get("extract_workExperienceMatchingSimilarity", 0),
        "Projects Matching": candidate.get("extract_projectsMatchingSimilarity", 0),

    }

    input_df = pd.DataFrame([input_data])

    try:
        extract_predicted_matching_percentage = model.predict(input_df)[0]
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

    # Update candidate record with prediction
    Candidate.update(candidate_id, {
        "extract_predicted_matching_percentage": round(extract_predicted_matching_percentage, 2)
    })

    return jsonify({
        "extract_predicted_matching_percentage": round(extract_predicted_matching_percentage, 2)
    }), 200



@candidate_routes.route('/candidates/predicted_percentage/<candidate_id>', methods=['GET'])
def get_predicted_percentage(candidate_id):
    candidate = candidates_collection.find_one({"_id": candidate_id}, {"extract_predicted_matching_percentage": 1})
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404
    return jsonify({"extract_predicted_matching_percentage": candidate.get("extract_predicted_matching_percentage", "N/A")}), 200


@candidate_routes.route('/candidates/entered/predict/<candidate_id>', methods=['GET'])
def entered_predict_matching_percentage(candidate_id):
    """Predicts the candidate's matching percentage using an ML model."""
    candidate = Candidate.get_by_id(candidate_id)
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404

    input_data = {
        "No of Tools and Technologies": candidate.get("extract_num_of_tools_technologies", 0),
        "Courses & Certifications Matching": candidate.get("entered_courses_certifications_similarity", 0),
        "Achievements Matching": candidate.get("entered_education_similarity",0),  # Assuming static value for achievements
        "Work Experience Matching": candidate.get("entered_experience_similarity", 0),
        "Projects Matching": candidate.get("extract_projectsMatchingSimilarity", 0),

    }

    input_df = pd.DataFrame([input_data])

    try:
        entered_predicted_matching_percentage = model.predict(input_df)[0]
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

    # Update candidate record with prediction
    Candidate.update(candidate_id, {
        "entered_predicted_matching_percentage": round(entered_predicted_matching_percentage, 2)
    })

    return jsonify({
        "entered_predicted_matching_percentage": round(entered_predicted_matching_percentage, 2)
    }), 200



@candidate_routes.route('/candidates/entered/predicted_percentage/<candidate_id>', methods=['GET'])
def get_entered_predicted_percentage(candidate_id):
    candidate = candidates_collection.find_one({"_id": candidate_id}, {"entered_predicted_matching_percentage": 1})
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404
    return jsonify({"entered_predicted_matching_percentage": candidate.get("entered_predicted_matching_percentage", "N/A")}), 200




def process_candidate_data(candidate_id):
    # Fetch the candidate data from the database
    candidate = Candidate.get_by_id(candidate_id)
    if not candidate:
        return

    cv_text = candidate.get('cv_text', '')
    if not cv_text:
        return

    # Perform soft skills extraction and similarity calculation
    soft_skills = extract_soft_skills(cv_text)
    soft_skills_text = " ".join(skill[0] for skill in soft_skills)
    similarity_score = calculate_similarity(soft_skills_text, cv_text)

    # Perform technical skills extraction
    technical_skills = extract_technical_skills_from_projects(cv_text)
    skill_counts = Counter(technical_skills)

    # Generate and store the technical skills bar chart as an image
    chart_image_base64 = generate_and_store_skills_chart(skill_counts)

    # Update the candidate record in the database
    update_data = {
        'soft_skills': [{"skill": skill[0], "count": skill[1]} for skill in soft_skills],
        'similarity_score': float(similarity_score),
         'technical_skills': [{"skill": skill, "count": count} for skill, count in skill_counts.items()],
        'skills_chart_image': chart_image_base64  # Store the base64-encoded image
    }
    Candidate.update(candidate_id, update_data)
    
@candidate_routes.route('/candidates/<candidateID>/process', methods=['POST'])
def process_candidate(candidateID):
    process_candidate_data(candidateID)
    return jsonify({"message": "Candidate processing triggered successfully"}), 200


    

@candidate_routes.route('/candidates', methods=['GET'])
def get_candidates():
    candidates = Candidate.get_all()
    return jsonify(candidates), 200

@candidate_routes.route('/candidates/<candidateID>', methods=['DELETE'])
def delete_candidate(candidateID):
    Candidate.delete(candidateID)
    return jsonify({"message": "Candidate deleted"}), 200

@candidate_routes.route('/candidates/<candidateID>', methods=['GET'])
def get_candidate(candidateID):
    candidate = Candidate.get_by_id(candidateID)
    if candidate:
        return jsonify(candidate), 200
    else:
        return jsonify({"error": "Candidate not found"}), 404
    
@candidate_routes.route('/candidates/candidatesByGeneratedId/<generatedCandidateID>', methods=['GET'])
def get_candidate_by_generated_id(generatedCandidateID):
    
        # Find the candidate using the generated candidate ID
        genCandidate = candidates_collection.find_one({"candidateId": generatedCandidateID})

        if not genCandidate:
            return jsonify({"error": "Candidate not found"}), 404

        # Extract the MongoDB ObjectId
        candidateID = genCandidate.get('_id')

        # Fetch the full candidate details using the ObjectId
        candidate = Candidate.get_by_id(candidateID)

        if candidate:
          
            return jsonify(candidate), 200
        else:
            return jsonify({"error": "Candidate not found"}), 404
        
@candidate_routes.route('/candidates/job/<jobId>', methods=['GET'])
def get_candidates_by_job(jobId):
    try:
        # Find candidates using jobId (make sure jobId is stored as a string in MongoDB)
        candidates = list(candidates_collection.find({"jobID": jobId}))

        if not candidates:
            return jsonify({"error": "No candidates found for this job"}), 404

        # Convert ObjectId to string before returning the response
        for candidate in candidates:
            candidate['_id'] = str(candidate['_id'])  # Convert ObjectId to string

        return jsonify(candidates), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


  

        
      

@candidate_routes.route('/uploads/cv/<filename>', methods=['GET'])
def serve_cv(filename):
    return send_from_directory(UPLOAD_FOLDER_CV, filename)

@candidate_routes.route('/uploads/transcripts/<filename>', methods=['GET'])
def serve_transcript(filename):
    return send_from_directory(UPLOAD_FOLDER_TRANSCRIPTS, filename)

@candidate_routes.route('/candidates/<candidateID>/chart', methods=['GET'])
def display_candidate_chart(candidateID):
    get_and_display_chart(candidateID)
    return jsonify({"message": "Chart displayed successfully"}), 200

@candidate_routes.route('/candidates/generate_charts/<candidateID>', methods=['POST'])
def create_all_charts(candidateID):
    candidate = Candidate.get_by_id(candidateID)
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404

    cv_text = candidate.get('cv_text', '')
    if not cv_text:
        return jsonify({"error": "CV text not available"}), 400

    charts = generate_all_charts(cv_text)
    Candidate.update(candidateID, {"charts": charts})
    
    return jsonify({"message": "Charts generated successfully", "charts": charts}), 200

@candidate_routes.route('/candidates/charts/<candidateID>', methods=['GET'])
def get_all_charts(candidateID):
    candidate = Candidate.get_by_id(candidateID)
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404

    charts = candidate.get('charts', {})
    return jsonify({"charts": charts}), 200

# @candidate_routes.route('/candidates/finalized_score/<candidate_id>', methods=['POST'])
# def calculate_finalized_score(candidate_id):
#     """Calculates and updates the candidate's finalized score."""
    
#     # Fetch the candidate from the database
#     candidate = Candidate.get_by_id(candidate_id)
#     if not candidate:
#         return jsonify({"error": "Candidate not found"}), 404

#     # Extract necessary fields
#     predicted_matching_percentage = candidate.get("predicted_matching_percentage", 0)
#     github_marks = candidate.get("github_marks", 0)
#     linkedin_marks = candidate.get("linkedin_marks", 0)
#     transcript_marks = candidate.get("transcript_marks", 0)

#     # Calculate the average of github, linkedin, and transcript marks
#     non_empty_marks = [github_marks, linkedin_marks, transcript_marks]
#     avg_marks = sum(non_empty_marks) / len(non_empty_marks) if len(non_empty_marks) > 0 else 0

#     # Calculate finalized score
#     finalized_score = round((0.6 * predicted_matching_percentage) + (0.4 * avg_marks), 2)

#     # Update candidate record with the finalized score
#     Candidate.update(candidate_id, {"finalized_score": finalized_score})

#     return jsonify({
#         "message": "Finalized score calculated and updated successfully",
#         "finalized_score": finalized_score
#     }), 200

@candidate_routes.route('/candidates/finalized_score/<candidate_id>', methods=['POST'])
def calculate_finalized_score(candidate_id):
    """Calculates and updates the candidate's finalized score."""
    
    # Fetch the candidate from the database
    candidate = Candidate.get_by_id(candidate_id)
    if not candidate:
        return jsonify({"error": "Candidate not found"}), 404

    # Extract necessary fields
    predicted_matching_percentage = candidate.get("predicted_matching_percentage", 0)
    github_marks = candidate.get("github_marks", 0)
    linkedin_marks = candidate.get("linkedin_marks", 0)
    transcript_marks = candidate.get("transcript_marks", 0)
    cvtext_maks = candidate.get("extract_cv_similarity", 0)
    expectations_marks = candidate.get("entered_employer_expectations_similarity", 0)
    employer_choice_marks = candidate.get(" entered_employer_choice_similarity", 0)
    message_marks = candidate.get("entered_message_similarity", 0)
    entered_predict_matching_percentage = candidate.get("entered_predicted_matching_percentage", 0)

    # Calculate the average of github, linkedin, and transcript marks
    non_empty_marks = [github_marks, linkedin_marks, transcript_marks]
    avg_marks = sum(non_empty_marks) / len(non_empty_marks) if len(non_empty_marks) > 0 else 0

    non_empty_insight_marks = [expectations_marks, employer_choice_marks, message_marks]
    insight_avg_marks = sum(non_empty_insight_marks) / len(non_empty_insight_marks) if len(non_empty_insight_marks) > 0 else 0


    # Calculate finalized score
    finalized_score = round((0.3 * predicted_matching_percentage) + (0.3 * entered_predict_matching_percentage) + (0.2 * avg_marks) + (0.1 * cvtext_maks) + (0.1 * insight_avg_marks), 2)

    # Update candidate record with the finalized score
    Candidate.update(candidate_id, {"finalized_score": finalized_score})

    return jsonify({
        "message": "Finalized score calculated and updated successfully",
        "finalized_score": finalized_score
    }), 200


@candidate_routes.route('/candidates/by-email', methods=['GET'])
def get_candidate_by_email():
    email = request.args.get('email')

    if not email:
        return jsonify({"error": "Email query parameter is required"}), 400

    try:
        candidate = candidates_collection.find_one({"confirmEmail": email})
        if not candidate:
            return jsonify({"error": "Candidate not found"}), 404

        # Prepare customized response
        filtered_response = {
            "_id": str(candidate.get("_id")),
            "confirmEmail": candidate.get("confirmEmail"),
            "extractednoofprogramminglanguages": candidate.get("extractednoofprogramminglanguages", 0),
            "extractednoofprogrammingframeworks": candidate.get("extractednoofprogrammingframeworks", 0),
            "extractednoofwebtechnologies": candidate.get("extractednoofwebtechnologies", 0),
            "extractednoofdatabasetechnologies": candidate.get("extractednoofdatabasetechnologies", 0),
            "extractednoofsoftwaredevelopmentmethodologies": candidate.get("extractednoofsoftwaredevelopmentmethodologies", 0),
            "extractednoofversioncontroltechnologies": candidate.get("extractednoofversioncontroltechnologies", 0),
            "extractednoofdevopstools": candidate.get("extractednoofdevopstools", 0),
            "extractednoofcloudtechnologies": candidate.get("extractednoofcloudtechnologies", 0),
            "lastName": candidate.get("lastName"),
            "firstName": candidate.get("firstName"),
            "noofyearsofexperience": candidate.get("noofyearsofexperience"),
            "jobPosition": candidate.get("jobPosition"),
            "jobID": candidate.get("jobID"),
            "jobTitle": candidate.get("jobTitle"),
            "salaryRange": candidate.get("salaryRange"),
        }

        return jsonify(filtered_response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

###################
# Github Analysis
###################
# @candidate_routes.route('/candidates/getCandidateGithubScore', methods=['POST'])
# def get_candidate_github_score():
#     try:
#         # Parse input JSON data
#         data = request.json
#         if not data:
#             return jsonify({"error": "No input data provided"}), 400

#         #Extract MArks from the request
#         allocatedMarks = data.get('marks')
        
#         # Extract features from the request
#         features = data.get('features')  # Expecting a list of features
#         if not features:
#             return jsonify({"error": "Features missing in request"}), 400


#         if(features[0]==0):
#             response = {
#                 "prediction": 0,   
#                 "marks": 0
#             }
#             return jsonify(response), 200

#         # Convert features to numpy array
#         features = np.array(features).reshape(1, -1)  # Adjust shape if needed

#         # Normalize the features
#         features_normalized = scaler.transform(features)

#         # Verify the normalized data (optional for debugging)
#         print("Normalized Features:", features_normalized)

#         # Make prediction
#         prediction = kmeans_model.predict(features_normalized)  # Use the model's predict method
#         print("Prediction:", prediction)

#         # Convert the prediction to a native Python type (float)
#         prediction = prediction[0] if isinstance(prediction, np.ndarray) else prediction

#         # Assign marks based on the prediction (assuming it's a scalar output)
#         marks = assign_marks(prediction, allocatedMarks)

#         # Prepare response
#         response = {
#             "prediction": float(prediction),  # Ensure it's a native float
#             "marks": marks
#         }

#         return jsonify(response), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500



# ###################
# # LinkedIn Profile Processing
# ###################
# @candidate_routes.route('/candidates/getCandidateLinkedinScore', methods=['POST'])
# def get_candidate_linkedin_score():
#     data = request.get_json()
#     username = data.get('username')
#     job_data = data.get('job_data')
     
#     try:
#         linkedin_profile = fetch_linkedin_data(username)
         
#         score = calculate_score(linkedin_profile, job_data)
         
#         return jsonify({"candidate_score": score, "linkedin_profile": linkedin_profile})
#     except Exception as e:
       
#         return jsonify({"error": str(e)}), 500

# ####################
# # Transcript Processing
# ####################
# @candidate_routes.route('/candidates/getCandidateTranscriptScore', methods=['POST'])
# def get_candidate_transcript_score():

#     if 'file' not in request.files:
#         return jsonify({"success": False, "message": "No file provided"}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"success": False, "message": "No file selected!"}), 400

#     job_role = request.form.get('job_role')
#     if not job_role:
#         return jsonify({"success": False, "message": "No job role"}), 400

    
#     if job_role not in JOB_DICTIONARY:
#         return jsonify({"success": False, "message": "Invalid job role"}), 400
    
#     filename = secure_filename(file.filename)
#     file_path = os.path.join(UPLOAD_FOLDER_TRANSCRIPT_EVALUATION, filename)
#     file.save(file_path)
     
#     score = process_pdf(file_path, job_role)
#     return jsonify({"success": True, "score": score})





# ###################
# # Update Candidate Table Marks After Github, LinkedIn, and Transcript Processing
# ###################

# # Update candidate with GitHub marks
# @candidate_routes.route('/candidates/<candidate_id>/github', methods=['PUT'])
# def update_candidate_with_github_marks(candidate_id):
#     data = request.json
#     github_mark = data.get("githubMark")
#     if github_mark is None:
#         return jsonify({"error": "githubMark is required"}), 400
    
#     try:
#         object_id = ObjectId(candidate_id)
#     except Exception as e:
#         print("Invalid ObjectId:", e)
#         return jsonify({"error": "Invalid candidate ID"}), 400

#     result = candidates_collection.update_one({"_id": object_id}, {"$set": {"github_marks": github_mark}})

#     if result.matched_count == 0:
#         return jsonify({"error": "Candidate not found"}), 404

#     return jsonify({"message": "GitHub marks updated successfully"})

# # Update candidate with LinkedIn marks
# @candidate_routes.route('/candidates/<candidate_id>/linkedin', methods=['PUT'])
# def update_candidate_with_linkedin_marks(candidate_id):
#     data = request.json
#     linkedin_mark = data.get("linkedinMark")
#     if linkedin_mark is None:
#         return jsonify({"error": "linkedinMark is required"}), 400

#     try:
#         object_id = ObjectId(candidate_id)
#     except Exception as e:
#         print("Invalid ObjectId:", e)
#         return jsonify({"error": "Invalid candidate ID"}), 400

#     result = candidates_collection.update_one({"_id": object_id}, {"$set": {"linkedin_marks": linkedin_mark}})
    
#     if result.matched_count == 0:
#         return jsonify({"error": "Candidate not found"}), 404
    
#     return jsonify({"message": "LinkedIn marks updated successfully"})

# # Update candidate with Transcript marks
# @candidate_routes.route('/candidates/<candidate_id>/transcript', methods=['PUT'])
# def update_candidate_with_transcript_marks(candidate_id):
#     data = request.json
#     transcript_mark = data.get("transcriptMark")
#     if transcript_mark is None:
#         return jsonify({"error": "transcriptMark is required"}), 400
    
#     try:
#         object_id = ObjectId(candidate_id)
#     except Exception as e:
#         print("Invalid ObjectId:", e)
#         return jsonify({"error": "Invalid candidate ID"}), 400  

#     result = candidates_collection.update_one({"_id": object_id}, {"$set": {"transcript_marks": transcript_mark}})
    
#     if result.matched_count == 0:
#         return jsonify({"error": "Candidate not found"}), 404

#     return jsonify({"message": "Transcript marks updated successfully"})