Sproutify::Application.routes.draw do

  root :to => 'home#index'

  resources :users, :only => [:new, :create] do
    resources :supplies, :only => [:index, :create, :destroy], module: "users"
    resources :demands, only: [:index], module: "users"
  end

  resources :supplies, :only => [:index, :create, :destroy]
  resources :demands, only: [:create, :index, :destroy]


  resources :sessions, only: [:new, :create, :destroy]


  get 'fetch', to: 'home#fetch'


end
