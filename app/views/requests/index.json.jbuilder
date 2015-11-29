json.array!(@requests) do |request|
  json.extract! request, :id, :name, :description, :skills, :skill_list, :lat, :lng, :image
  json.url request_url(request, format: :json)
end
