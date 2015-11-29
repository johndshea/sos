class Request < ActiveRecord::Base
  belongs_to :user
  has_many :request_skills
  has_many :skills, through: :request_skills

  has_attached_file :image
  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png"]

  def skill_list
    self.skills.collect do |skill|
      skill.name
    end.join(", ")
  end

  def skill_list=(skills_string)
    skill_names = skills_string.split(",").collect{|s| s.strip.downcase}.uniq
    new_or_found_skills = skill_names.collect { |name| Skill.find_or_create_by(name: name) }
    self.skills = new_or_found_skills
  end

end
