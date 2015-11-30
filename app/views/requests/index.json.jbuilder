json.array!(@requests) do |request|
  json.extract! request, :id, :name, :description, :skills, :skill_list, :lat, :lng
  if request.user
    json.extract! request.user, :email
  end
  json.url request_url(request, format: :json)
end
