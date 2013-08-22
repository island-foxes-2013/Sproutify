class UpdateSearchIndexWorker
  include Sidekiq::Worker

  def perform(geocode_id)
    Geocode.find(geocode_id).index!
  end

end