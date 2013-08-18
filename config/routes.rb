Sproutify::Application.routes.draw do

  root :to => 'home#index'

  resources :users, :only => [:new, :create] do
    resources :supplies, :only => [:index, :create, :destroy], module: "users"
    resources :demands, only: [:index], module: "users"
  end

  resources :supplies, :only => [:index, :create, :destroy]
  resources :demands, only: [:create, :index, :destroy]


  resources :sessions, only: [:index, :new, :create]

  delete '/sessions', to: 'sessions#destroy'

  get 'fetch', to: 'home#fetch'

  get 'find_users', to: 'home#find_users'

  get 'user_data', to: 'sessions#user_data'
end
