class User < ActiveRecord::Base
  has_secure_password
  
  has_many :requests
  has_many :user_skills
  has_many :skills, through: :user_skills
end
