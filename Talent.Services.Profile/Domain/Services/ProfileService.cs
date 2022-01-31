using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }

        public bool AddNewLanguage(AddLanguageViewModel language)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            // My code here.
            User user = await _userRepository.GetByIdAsync(Id);

            // Convert each of the collections into their ViewModel equivalent.
            var listOfLanguages = user.Languages.Select(x => ViewModelFromLanguage(x)).ToList();
            var listOfSkills = user.Skills.Select(x => ViewModelFromSkill(x)).ToList();
            var listOfEducation = user.Education.Select(x => ViewModelFromEducation(x)).ToList();
            var listOfCertifications = user.Certifications.Select(x => ViewModelFromCertification(x)).ToList();
            var listOfExperience = user.Experience.Select(x => ViewModelFromExperience(x)).ToList();

            var talentProfile = ViewModelFromUser(user);
            talentProfile.Languages = listOfLanguages;
            talentProfile.Skills = listOfSkills;
            talentProfile.Education = listOfEducation;
            talentProfile.Certifications = listOfCertifications;
            talentProfile.Experience = listOfExperience;

            return talentProfile;
        }

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
            // My code here.
            User updatedUser = await _userRepository.GetByIdAsync(model.Id);

            UpdateUserFromTalentProfile(model, updatedUser);

            // Convert ViewModel collections to new Model lists.
            var listOfLanguages = new List<UserLanguage>(model.Languages.Count());
            foreach(var language in model.Languages)
            {
                var userLanguage = LanguageFromViewModel(language);
                userLanguage.UserId = model.Id;
                
                if (String.IsNullOrEmpty(userLanguage.Id))
                {
                    userLanguage.Id = ObjectId.GenerateNewId().ToString();
                }

                listOfLanguages.Add(userLanguage);
            }

            var listOfSkills = new List<UserSkill>(model.Skills.Count());
            foreach (var skill in model.Skills)
            {
                var userSkill = SkillFromViewModel(skill);
                userSkill.UserId = model.Id;

                if (String.IsNullOrEmpty(userSkill.Id))
                {
                    userSkill.Id = ObjectId.GenerateNewId().ToString();
                }

                listOfSkills.Add(userSkill);
            }

            var listOfEducation = new List<UserEducation>(model.Education.Count());
            foreach (var education in model.Education)
            {
                var userEducation = EducationFromViewModel(education);
                userEducation.UserId = model.Id;

                if (String.IsNullOrEmpty(userEducation.Id))
                {
                    userEducation.Id = ObjectId.GenerateNewId().ToString();
                }

                listOfEducation.Add(userEducation);
            }

            var listOfCertifications = new List<UserCertification>(model.Certifications.Count());
            foreach (var certification in model.Certifications)
            {
                var userCertification = CertificationFromViewModel(certification);
                userCertification.UserId = model.Id;

                if (String.IsNullOrEmpty(userCertification.Id))
                {
                    userCertification.Id = ObjectId.GenerateNewId().ToString();
                }

                listOfCertifications.Add(userCertification);
            }

            var listOfExperience = new List<UserExperience>(model.Experience.Count());
            foreach (var experience in model.Experience)
            {
                var userExperience = ExperienceFromViewModel(experience);

                if (String.IsNullOrEmpty(userExperience.Id))
                {
                    userExperience.Id = ObjectId.GenerateNewId().ToString();
                }

                listOfExperience.Add(userExperience);
            }

            updatedUser.Languages = listOfLanguages;
            updatedUser.Skills = listOfSkills;
            updatedUser.Education = listOfEducation;
            updatedUser.Certifications = listOfCertifications;
            updatedUser.Experience = listOfExperience;
            updatedUser.UpdatedBy = updaterId;
            updatedUser.UpdatedOn = DateTime.Now;

            try
            {
                await _userRepository.Update(updatedUser);
            }
            catch (Exception dbEx)
            {
                return false;
            }

            return true;
        }

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {
            // My code here.
            try
            {
                User updatedUser = await _userRepository.GetByIdAsync(talentId);

                if (updatedUser == null)
                {
                    return false;
                }

                // Create a new FormFile so we can change the name before we pass it into _fileService.
                // We don't want the file to be named as the uploader called it but rather named as the talent's id and the current date as ticks.
                DateTime updatedDate = DateTime.Now;
                string name = talentId + updatedDate.Ticks.ToString();
                file = new Microsoft.AspNetCore.Http.Internal.FormFile(file.OpenReadStream(), 0, file.Length, name, name);

                string url = await _fileService.SaveFile(file, FileType.ProfilePhoto);

                if (!String.IsNullOrWhiteSpace(url))
                {
                    if (!String.IsNullOrWhiteSpace(updatedUser.ProfilePhoto))
                    {
                        await _fileService.DeleteFile(updatedUser.ProfilePhoto, FileType.ProfilePhoto);
                    }

                    // Save the profile photo name in the user document.
                    updatedUser.ProfilePhoto = file.Name;
                    updatedUser.ProfilePhotoUrl = url;
                    updatedUser.UpdatedOn = updatedDate;

                    await _userRepository.Update(updatedUser);

                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            //throw new NotImplementedException();
            // My code here.

            try
            {
                var profile = await _employerRepository.GetByIdAsync(employerOrJobId);
                var talentList = _userRepository.Collection.Skip(position).Take(increment).AsEnumerable();
                if (profile != null)
                {
                    var result = new List<TalentSnapshotViewModel>();
                    
                    foreach (var item in talentList)
                    {
                        var newItem = new TalentSnapshotViewModel();
                        var listOfSkills = item.Skills.Select(x => ViewModelFromSkill(x)).ToList();                      
                        foreach (var skill in listOfSkills)
                        {                
                            newItem.Skills.Add(skill.Name);
                        }
                        
                        var listOfExperience = item.Experience.Select(x => ViewModelFromExperience(x)).ToList();
                        DateTime lastWorkDay = new DateTime();
                        foreach (var xp in listOfExperience)
                        {
                            if (lastWorkDay < xp.End)
                            { 
                                newItem.Position = xp.Position;
                                newItem.CurrentEmployment = xp.Company;
                            }
                        }

                        newItem.Id = item.Id;
                        newItem.Name = item.FirstName + " " + item.LastName;
                        newItem.Visa = item.VisaStatus;
                        
                        result.Add(newItem);
                    }
                    return result;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateLanguageFromView(AddLanguageViewModel model, UserLanguage original)
        {
            original.Id = model.Id;
            original.UserId = model.CurrentUserId;
            original.Language = model.Name;
            original.LanguageLevel = model.Level;
        }

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        protected void UpdateEducationFromView(AddEducationViewModel model, UserEducation original)
        {
            original.Id = model.Id;
            original.Title = model.Title;
            original.Degree = model.Degree;
            original.Country = model.Country;
            original.InstituteName = model.InstituteName;
            original.YearOfGraduation = model.YearOfGraduation;
        }

        protected void UpdateCertificationFromView(AddCertificationViewModel model, UserCertification original)
        {
            original.Id = model.Id;
            original.CertificationName = model.CertificationName;
            original.CertificationFrom = model.CertificationFrom;
            original.CertificationYear = model.CertificationYear;
        }

        protected void UpdateExperienceFromView(ExperienceViewModel model, UserExperience original)
        {
            original.Id = model.Id;
            original.Company = model.Company;
            original.Position = model.Position;
            original.Responsibilities = model.Responsibilities;
            original.Start = model.Start;
            original.End = model.End;
        }

        /// <summary>
        /// Updates a User's fields based on a TalentProfileViewModel. 
        /// This doesn't update some member fields that require conversion from ViewModels to Models.
        /// You must set Languages, Skills, Education, Certifications and Experience fields yourself.
        /// Doesn't update the ProfilePhoto or ProfilePhotoUrl fields.
        /// </summary>
        /// <seealso cref="UpdateLanguageFromView(AddLanguageViewModel, UserLanguage)"/>
        /// <seealso cref="UpdateSkillFromView(AddSkillViewModel, UserSkill)"/>
        /// <seealso cref="UpdateEducationFromView(AddEducationViewModel, UserEducation)"/>
        /// <seealso cref="UpdateCertificationFromView(AddCertificationViewModel, UserCertification)"/>
        /// <seealso cref="UpdateExperienceFromView(ExperienceViewModel, UserExperience)"/>
        /// <param name="model">The ViewModel to update the User with.</param>
        /// <param name="original">This User will have its member fields updated.</param>
        protected void UpdateUserFromTalentProfile(TalentProfileViewModel model, User original)
        {
            original.Id = model.Id;
            original.FirstName = model.FirstName;
            original.MiddleName = model.MiddleName;
            original.LastName = model.LastName;
            original.Gender = model.Gender;
            original.Email = model.Email;
            original.Phone = model.Phone;
            original.MobilePhone = model.MobilePhone;
            original.IsMobilePhoneVerified = model.IsMobilePhoneVerified;
            original.Address = model.Address;
            original.Nationality = model.Nationality;
            original.VisaStatus = model.VisaStatus;
            original.VisaExpiryDate = model.VisaExpiryDate;
            // We don't want to accept changes to ProfilePhoto by default.
            // UpdateTalentPhoto() is the one you should use for changing the photo.
            //original.ProfilePhoto = model.ProfilePhoto;
            //original.ProfilePhotoUrl = model.ProfilePhotoUrl;
            original.VideoName = model.VideoName;
            original.CvName = model.CvName;
            original.Summary = model.Summary;
            original.Description = model.Description;
            original.LinkedAccounts = model.LinkedAccounts;
            original.JobSeekingStatus = model.JobSeekingStatus;
        }

        #endregion

        #region Builds new Models from Views

        /// <summary>
        /// Convert a AddLanguageViewModel into an appropriate UserLanguage.
        /// If the ViewModel doesn't have an id this new Model won't have one either.
        /// </summary>
        /// <param name="experience">ViewModel to convert into a UserLanguage.</param>
        protected UserLanguage LanguageFromViewModel(AddLanguageViewModel language)
        {
            return new UserLanguage
            {
                Id = language.Id,
                UserId = language.CurrentUserId,
                Language = language.Name,
                LanguageLevel = language.Level,
            };
        }

        /// <summary>
        /// Convert a AddSkillViewModel into an appropriate UserSkill.
        /// If the ViewModel doesn't have an id this new Model won't have one either.
        /// Also the Model doesn't have its UserId set.
        /// </summary>
        /// <param name="skill">ViewModel to convert into a UserSkill.</param>
        protected UserSkill SkillFromViewModel(AddSkillViewModel skill)
        {
            return new UserSkill
            {
                Id = skill.Id,
                ExperienceLevel = skill.Level,
                Skill = skill.Name,
            };
        }

        /// <summary>
        /// Convert a AddEducationViewModel into an appropriate UserEducation.
        /// If the ViewModel doesn't have an id this new Model won't have one either.
        /// Also the Model doesn't have its UserId set.
        /// </summary>
        /// <param name="education">ViewModel to convert into a UserEducation.</param>
        protected UserEducation EducationFromViewModel(AddEducationViewModel education)
        {
            return new UserEducation
            {
                Id = education.Id,
                Title = education.Title,
                Degree = education.Degree,
                Country = education.Country,
                InstituteName = education.InstituteName,
                YearOfGraduation = education.YearOfGraduation,
            };
        }

        /// <summary>
        /// Convert a AddCertificationViewModel into an appropriate UserCertification.
        /// If the ViewModel doesn't have an id this new Model won't have one either.
        /// Also the Model doesn't have its UserId set.
        /// </summary>
        /// <param name="certification">ViewModel to convert into a UserCertification.</param>
        protected UserCertification CertificationFromViewModel(AddCertificationViewModel certification)
        {
            return new UserCertification
            {
                Id = certification.Id,
                CertificationName = certification.CertificationName,
                CertificationFrom = certification.CertificationFrom,
                CertificationYear = certification.CertificationYear,
            };
        }

        /// <summary>
        /// Convert a ExperienceViewModel into an appropriate UserExperience.
        /// If the ViewModel doesn't have an id this new Model won't have one either.
        /// </summary>
        /// <param name="experience">ViewModel to convert into a UserExperience.</param>
        protected UserExperience ExperienceFromViewModel(ExperienceViewModel experience)
        {
            return new UserExperience
            {
                Id = experience.Id,
                Company = experience.Company,
                Position = experience.Position,
                Responsibilities = experience.Responsibilities,
                Start = experience.Start,
                End = experience.End
            };
        }

        #endregion

        #region Build Views from Model

        protected AddLanguageViewModel ViewModelFromLanguage(UserLanguage language)
        {
            return new AddLanguageViewModel
            {
                Id = language.Id,
                CurrentUserId = language.UserId,
                Name = language.Language,
                Level = language.LanguageLevel
            };
        }

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }

        protected AddEducationViewModel ViewModelFromEducation(UserEducation education)
        {
            return new AddEducationViewModel
            {
                Id = education.Id,
                Title = education.Title,
                Degree = education.Degree,
                Country = education.Country,
                InstituteName = education.InstituteName,
                YearOfGraduation = education.YearOfGraduation
            };
        }

        protected AddCertificationViewModel ViewModelFromCertification(UserCertification certification)
        {
            return new AddCertificationViewModel
            {
                Id = certification.Id,
                CertificationName = certification.CertificationName,
                CertificationFrom = certification.CertificationFrom,
                CertificationYear = certification.CertificationYear
            };
        }

        protected ExperienceViewModel ViewModelFromExperience(UserExperience experience)
        {
            return new ExperienceViewModel
            {
                Id = experience.Id,
                Company = experience.Company,
                Position = experience.Position,
                Responsibilities = experience.Responsibilities,
                Start = experience.Start,
                End = experience.End
            };
        }

        /// <summary>
        /// Takes a User and returns a ViewModel equivalent of it. However it doesn't map some member fields as they require their own ViewModels.
        /// You must set Languages, Skills, Education, Certifications and Experience fields yourself.
        /// </summary>
        /// <seealso cref="ViewModelFromLanguage(UserLanguage)"/>
        /// <seealso cref="ViewModelFromSkill(UserSkill)"/>
        /// <seealso cref="ViewModelFromEducation(UserEducation)"/>
        /// <seealso cref="ViewModelFromCertification(UserCertification)"/>
        /// <seealso cref="ViewModelFromExperience(UserExperience)"/>
        /// <returns>The TalentProfileViewModel modelled on given User.</returns>
        protected TalentProfileViewModel ViewModelFromUser(User user)
        {
            return new TalentProfileViewModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                MiddleName = user.MiddleName,
                LastName = user.LastName,
                Gender = user.Gender,
                Email = user.Email,
                Phone = user.Phone,
                MobilePhone = user.MobilePhone,
                IsMobilePhoneVerified = user.IsMobilePhoneVerified,
                Address = user.Address,
                Nationality = user.Nationality,
                VisaStatus = user.VisaStatus,
                VisaExpiryDate = user.VisaExpiryDate,
                ProfilePhoto = user.ProfilePhoto,
                ProfilePhotoUrl = user.ProfilePhotoUrl,
                VideoName = user.VideoName,
                VideoUrl = "", // Use file service to find the video using the above VideoName.
                CvName = user.CvName,
                CvUrl = "", // Use file service to find the cv using the above CvName.
                Summary = user.Summary,
                Description = user.Description,
                LinkedAccounts = user.LinkedAccounts,
                JobSeekingStatus = user.JobSeekingStatus,
            };
        }

        /*protected TalentSnapshotViewModel ViewModelFromTalent(User user)
        {

            var skills = user.Skills.Select(x => ViewModelFromSkill(x)).ToList();
            var skillName = new List<string>() ;
            foreach (var skill in skills)
            {
                skillName.Add(skill.Name);
            }

            return new TalentSnapshotViewModel
            {
                Id = user.Id,
                Name = user.FirstName + " " + user.LastName,
                Visa = user.VisaStatus,
                Skills = skillName,
        };
        }*/

        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }
         
        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}
