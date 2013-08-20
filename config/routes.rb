Sproutify::Application.routes.draw do

  root :to => 'home#index'

  resources :users, :only => [:create] do
    resources :supplies, :only => [:index, :create, :destroy], module: "users"
    resources :demands, only: [:index], module: "users"
  end

  resources :supplies, :only => [:index, :create, :destroy]
  resources :demands, only: [:create, :index, :destroy]


  resources :sessions, only: [:index, :create]

  delete '/sessions', to: 'sessions#destroy'

  get 'fetch', to: 'home#fetch'

  get 'search', to: 'search#search'

  get 'user_data', to: 'sessions#user_data'

  get 'connect', to: 'users#email_user'
end
