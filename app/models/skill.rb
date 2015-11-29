class Skill < ActiveRecord::Base
  has_many :user_skills
  has_many :users, through: :user_skills
  has_many :request_skills
  has_many :requests, through: :request_skills
end
