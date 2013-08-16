Sproutify::Application.routes.draw do

  root :to => 'home#index'
  resources :users, :only => [:new, :create]
  resources :sessions, only: [:new, :create, :destroy]

  match 'main' => 'home#main'
  match 'supplies/create' => 'supplies#create'
end
