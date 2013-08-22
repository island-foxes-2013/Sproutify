if Rails.env == "production"
  Sidekiq.configure_client do |config|
    config.redis = { :url => 'pub-redis-15909.us-east-1-4.1.ec2.garantiadata.com:15909', :namespace => 'sproutify' }
  end
end
