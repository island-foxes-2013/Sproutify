Sproutify::Application.routes.draw do

  root :to => 'home#index'
  resources :users, :only => [:new, :create] do
    resources :demands, only: [:index]
  end

  resources :sessions, only: [:new, :create, :destroy]

  resources :demands, only: [:create, :index, :destroy]

  # resources :demands, only: 

  get 'fetch', to: 'home#fetch'
  match 'main' => 'home#main'
  match 'supplies/create' => 'supplies#create' 

end
