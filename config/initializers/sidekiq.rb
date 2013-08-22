p "x" * 25
if Rails.env == "production"
  p "*" * 25
  p ENV['REDISCLOUD_URL']
  Sidekiq.configure_client do |config|
    config.redis = { :url => ENV['REDISCLOUD_URL'], :namespace => 'sproutify' }
  end
end
