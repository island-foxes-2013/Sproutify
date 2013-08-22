if Rails.env == "production"
  Sidekiq.configure_client do |config|
    config.redis = { :url => ENV['REDISCLOUD_URL'], :namespace => 'sproutify' }
  end
  Sidekiq.configure_server do |config|
    config.redis = { :url => ENV['REDISCLOUD_URL'], :namespace => 'sproutify' }
  end
end
